## Fix: Image Picker crash and AI upload issues

You're seeing errors like:

```
Call to function 'ExponentImagePicker.launchCameraAsync' has been rejected.
Cannot cast 'String' for field 'mediaTypes' ... Value for mediaTypes cannot be cast from String to ReadableArray
```

Follow these steps:

### 1) Update picker calls (already done in code)

- We removed the problematic `mediaTypes` option and now rely on the default (Images).
- Files changed:
  - `app/(tabs)/(screens)/ai-diagnosis.tsx` now calls:
    - `ImagePicker.launchCameraAsync({ quality: 0.9 })`
    - `ImagePicker.launchImageLibraryAsync({ quality: 0.9 })`

If you still pass `mediaTypes` elsewhere, remove it or use the enum: `ImagePicker.MediaTypeOptions.Images`.

### 2) Ensure correct imports

Use namespace import:

```ts
import * as ImagePicker from 'expo-image-picker';
```

Do NOT import `MediaTypeOptions` directly or pass strings.

### 3) Configure app.json and rebuild native

We added the plugin to `app.json`:

```json
"plugins": [
  "expo-router",
  "expo-font",
  "expo-web-browser",
  ["expo-image-picker", { "photosPermission": "Allow $(PRODUCT_NAME) to access your photos" }]
]
```

Actions:
- For Expo Go: close and restart the project (this is usually enough).
- For development builds (EAS or bare): rebuild the app after this change.

### 4) Permissions

On first use, the app will request camera or media library permissions. If you previously denied, go to device settings and grant permissions for the app.

### 5) Supabase Storage prerequisites

- Create a Storage bucket named `crop-photos` in your Supabase project.
- Make it public (or use signed URLs and adjust code).
- Ensure environment variables are set via Expo env config:

```
EXPO_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
FASTROUTER_CROP_DIAGNOSIS_URL=https://api.fastrouter.ai/crop-diagnosis
FASTROUTER_API_KEY=YOUR_FASTROUTER_API_KEY
```

### 6) FastRouter connectivity

- The service posts `{ image_url }` to `FASTROUTER_CROP_DIAGNOSIS_URL`.
- If your bucket is private, generate a signed URL before sending.
- Confirm the endpoint is reachable and API key is valid.

### 7) Verify flow end-to-end

1. Run the app.
2. Open AI Crop Diagnosis screen.
3. Tap Take Photo or Upload from Gallery.
4. Grant permissions when prompted.
5. Wait for upload and analysis. You should see a diagnosis with confidence, severity, and recommendations.

### 8) Still broken?

- Clear Metro cache and restart:

```bash
rm -rf .expo .expo-shared
expo start -c
```

- If on Android device: uninstall the app, reinstall, and try again.
- Check device logs for errors related to ImagePicker or network.
- Validate your env values are actually loaded at runtime.

### 9) Optional: Private bucket using signed URLs

If you want a private bucket, modify `uploadCropPhoto` to create a signed URL and send that to FastRouter, or proxy the request through a backend/edge function.

