## AI Crop Diagnosis Integration

This guide explains how to connect the app to the FastRouter AI Crop Diagnosis API and Supabase Storage.

### 1) Prerequisites

- Supabase project created and configured (see `SUPABASE_SETUP.md`). Ensure you have a public Storage bucket named `crop-photos` or adjust the code accordingly.
- Expo/React Native environment working (`npm run dev`).
- FastRouter API access token (if required).

### 2) Environment Variables

Add the following to your environment. For Expo, you can use app config or `.env` injected at build-time:

```
EXPO_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY

# AI service
FASTROUTER_CROP_DIAGNOSIS_URL=https://api.fastrouter.ai/crop-diagnosis
FASTROUTER_API_KEY=YOUR_FASTROUTER_API_KEY
```

Notes:
- `FASTROUTER_API_KEY` is optional in code. If provided, it will be sent as `Authorization: Bearer <KEY>`.
- If the `crop-photos` bucket is private, switch to generating signed URLs instead of public URLs.

### 3) Backend Service

The backend service is implemented at `backend/ai/diagnosisService.js` with three functions:

- `uploadCropPhoto(photo)`
  - Uploads a local photo (from camera or gallery) to Supabase Storage bucket `crop-photos` under `diagnosis/<userId>/<timestamp>.<ext>`.
  - Returns the public URL (requires public bucket) or you can adapt to return a signed URL.

- `analyzeCropImage(imageUrl)`
  - POSTs `{ image_url }` to `FASTROUTER_CROP_DIAGNOSIS_URL`.
  - Adds `Authorization: Bearer <FASTROUTER_API_KEY>` header if provided.
  - Expects a JSON response similar to:

    ```json
    {
      "disease": "Leaf Blight",
      "confidence": 0.92,
      "severity": "Moderate",
      "recommendations": [
        "Remove affected leaves",
        "Apply copper-based fungicide spray"
      ]
    }
    ```

  - Returns a normalized object:

    ```json
    {
      "disease": "Leaf Blight",
      "confidence": 0.92,
      "severity": "Moderate",
      "recommendations": ["..."]
    }
    ```

- `getDiagnosis(photo)`
  - Convenience method: uploads the photo then calls the analyzer and returns `{ imageUrl, diagnosis }`.

### 4) FastRouter API Contract

- Request
  - Method: `POST`
  - URL: `FASTROUTER_CROP_DIAGNOSIS_URL` (default `https://api.fastrouter.ai/crop-diagnosis`)
  - Headers:
    - `Content-Type: application/json`
    - `Authorization: Bearer <FASTROUTER_API_KEY>` (if required)
  - Body:
    ```json
    { "image_url": "https://public.supabase.co/storage/v1/object/public/crop-photos/..." }
    ```

- Response
  - 200 OK JSON body including fields: `disease` (string), `confidence` (number 0-1), `severity` (string), `recommendations` (string[])

### 5) Storing Diagnosis Results in Supabase

Create a table, for example `diagnoses`:

```sql
create table if not exists public.diagnoses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  image_url text not null,
  disease text not null,
  confidence numeric not null,
  severity text not null,
  recommendations jsonb not null,
  created_at timestamp with time zone default now()
);
```

Insert records from the app after receiving the diagnosis:

```ts
import supabase from "./lib/supabaseClient";

await supabase.from("diagnoses").insert({
  user_id: (await supabase.auth.getUser()).data?.user?.id ?? null,
  image_url,
  disease: diagnosis.disease,
  confidence: diagnosis.confidence,
  severity: diagnosis.severity,
  recommendations: diagnosis.recommendations,
});
```

### 6) Frontend Integration (React Native)

1. Install image picker to capture/select photos:

```bash
npm i expo-image-picker
```

2. Request permissions and pick an image or launch camera:

```ts
import * as ImagePicker from "expo-image-picker";
import { getDiagnosis } from "../backend/ai/diagnosisService";

// pick from library
const result = await ImagePicker.launchImageLibraryAsync({
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  quality: 0.9,
});
if (!result.canceled) {
  const photo = result.assets[0]; // has uri, fileName, mimeType
  const { imageUrl, diagnosis } = await getDiagnosis(photo);
  // display diagnosis on the screen
}
```

3. For camera capture, use `ImagePicker.launchCameraAsync` similarly.

4. Wire to `app/(tabs)/(screens)/ai-diagnosis.tsx` by replacing the mock handlers to call `getDiagnosis` and set the state with the returned `diagnosis`.

### 7) Security Notes

- For public buckets, images are accessible via public URLs. If privacy is needed, make the bucket private and generate short-lived signed URLs for the FastRouter request.
- Keep `FASTROUTER_API_KEY` secure. In a pure client app, consider proxying via a Supabase Edge Function to avoid exposing secrets.

### 8) Troubleshooting

- Upload errors: verify bucket `crop-photos` exists and Storage is enabled. Check `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY`.
- 401 from FastRouter: ensure `FASTROUTER_API_KEY` is valid and header is attached.
- 400 from FastRouter: confirm the image URL is publicly reachable or a valid signed URL.

