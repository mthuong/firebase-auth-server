# firebase-auth-server
Get access token for firebase.messaging HTTP v1

* npm install googleapis
  
* PROJECT_ID get at https://console.firebase.google.com/u/1/project/_/settings/general

* key.json get at 
  * To generate a private key file for your service account:
  * In the Firebase console, open Settings > Service Accounts. - https://console.firebase.google.com/u/0/project/_/settings/serviceaccounts/adminsdk
  * Click Generate New Private Key, then confirm by clicking Generate Key.
  * Securely store the JSON file containing the key.
      
* node firebase-auth-server.js

* Copy the token and using to send firebase.messaging v1 HTTP
