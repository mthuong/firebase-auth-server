const path = require('path');
const fs = require('fs');
const { google } = require('googleapis');

try {
  require('dotenv').config();
} catch (_) {
  // dotenv is optional; env vars can be set in the shell instead
}

const PROJECT_ID = process.env.PROJECT_ID;
const KEY_PATH = process.env.GOOGLE_APPLICATION_CREDENTIALS;

const MESSAGING_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging';
const SCOPES = [MESSAGING_SCOPE];

function fail(message) {
  console.error(`Error: ${message}`);
  console.error('See README.md for setup instructions.');
  process.exit(1);
}

if (!PROJECT_ID) {
  fail('PROJECT_ID is not set. Add it to .env or export it in your shell.');
}
if (!KEY_PATH) {
  fail('GOOGLE_APPLICATION_CREDENTIALS is not set. Point it at your service-account JSON file.');
}

const resolvedKeyPath = path.resolve(KEY_PATH);
if (!fs.existsSync(resolvedKeyPath)) {
  fail(`Service account key not found at ${resolvedKeyPath}`);
}

const key = require(resolvedKeyPath);

async function getAccessToken() {
  const jwtClient = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    SCOPES,
    null,
  );
  const tokens = await jwtClient.authorize();
  return tokens.access_token;
}

(async () => {
  try {
    const accessToken = await getAccessToken();
    console.log(`Firebase Cloud Messaging - Access token for project: ${PROJECT_ID}\n`);
    console.log(accessToken);
    console.log('');
  } catch (err) {
    fail(`Failed to obtain access token: ${err.message}`);
  }
})();
