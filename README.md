# firebase-auth-server

Get an OAuth2 access token for the Firebase Cloud Messaging HTTP v1 API.

## Install

This project uses [pnpm](https://pnpm.io/). Install it once if you don't have it:

```bash
npm install -g pnpm
# or: brew install pnpm
```

Then install dependencies:

```bash
pnpm install
```

## Configure

1. Copy the example env file:

   ```bash
   cp .env.example .env
   ```

2. Fill in the two values in `.env` — see the guides below.

### Finding your `PROJECT_ID`

1. Open the [Firebase console](https://console.firebase.google.com/).
2. Select your project (or create one).
3. Click the gear icon next to **Project Overview** → **Project settings**.
4. On the **General** tab, look for **Project ID** under "Your project".
   - Direct link: `https://console.firebase.google.com/project/_/settings/general`
   - The ID is usually a lowercase slug like `my-app-12345`, not the human-readable display name.
5. Paste it into `.env` as `PROJECT_ID=my-app-12345`.

### Getting the service-account key

1. In the Firebase console, go to **Project settings** → **Service accounts**.
   - Direct link: `https://console.firebase.google.com/project/_/settings/serviceaccounts/adminsdk`
2. Click **Generate new private key**, then **Generate key**.
3. Save the downloaded JSON file somewhere safe (e.g. `./service-account.json` in this folder).
4. Set `GOOGLE_APPLICATION_CREDENTIALS` in `.env` to the path of that file.

> **Security:** the service-account JSON grants admin access to your Firebase project. Never commit it to git. Add it to `.gitignore` and rotate the key in the Firebase console if it has been exposed.

## Run

```bash
pnpm start
# or: node firebase-auth-server.js
```

The script prints the access token to stdout. Use it as a Bearer token when calling the FCM HTTP v1 send endpoint:

```
POST https://fcm.googleapis.com/v1/projects/<PROJECT_ID>/messages:send
Authorization: Bearer <access_token>
```

Access tokens expire after 1 hour — rerun the script to get a fresh one.
