## Supabase integration

This app uses Supabase for Auth (email/password), Database (Postgres), and Storage.

### 1) Create a Supabase project
- Go to `https://app.supabase.com`
- Create a new project and note your Project URL and anon public key (Settings → API)

### 2) Environment variables
In Expo, public envs must be prefixed with `EXPO_PUBLIC_`.

Create a `.env` file or set in your `app.json` → `expo.extra` or via `eas secret`:

```bash
EXPO_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

If using `app.json`, you can add:

```json
{
  "expo": {
    "extra": {
      "EXPO_PUBLIC_SUPABASE_URL": "https://YOUR-PROJECT-REF.supabase.co",
      "EXPO_PUBLIC_SUPABASE_ANON_KEY": "YOUR_ANON_KEY"
    }
  }
}
```

This project reads envs via `process.env.EXPO_PUBLIC_SUPABASE_URL` and `process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY`.

### 3) Dependencies already installed
- `@supabase/supabase-js`
- `@react-native-async-storage/async-storage`
- `react-native-url-polyfill` (via auto import in client)

### 4) Supabase client
`lib/supabaseClient.js` is configured for Expo + RN persistence using AsyncStorage.

```js
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { storage: AsyncStorage, autoRefreshToken: true, persistSession: true, detectSessionInUrl: false }
});
```

### 5) Auth flows
- Email/password login is in `app/(onboarding)/login.tsx` using `signInWithPassword({ email, password })`.
- Email/password signup is in `app/(onboarding)/signup.tsx` using `signUp({ email, password })`.

On success, users are redirected to `/(tabs)`. If your project requires email confirmation, users will receive a confirmation email after sign up; they must confirm before logging in.

### 6) Routing and gating
- Initial route check in `app/index.tsx` uses `supabase.auth.getSession()` and redirects to `/(tabs)` when a session exists, otherwise to the onboarding splash.
- Auth state changes auto-redirect to `/(tabs)` after login.

### 7) Enable Auth providers in Supabase
In the Supabase dashboard:
- Auth → Providers → enable Email (Password)

### 8) Database & Storage usage
After auth, you can access the user via:

```ts
const { data: { user } } = await supabase.auth.getUser();
```

Use `supabase.from('table').select('*')` for Postgres and `supabase.storage.from('bucket')` for Storage.

### 9) Common gotchas
- Make sure `EXPO_PUBLIC_...` vars are present in the environment of the Expo process (web, iOS, Android). Restart the dev server after adding envs.
- For iOS/Android builds, ensure AsyncStorage is properly autolinked; with Expo, this happens automatically.

### 10) Development
Run the app:

```bash
npm run dev
```

Then create an account via the signup screen and log in with email/password.

