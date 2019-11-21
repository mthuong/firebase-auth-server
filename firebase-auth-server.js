/*
README
  npm install googleapis
  PROJECT_ID get at https://console.firebase.google.com/u/0/project/_/settings/general
  key.json get at 
      + To generate a private key file for your service account:
      + In the Firebase console, open Settings > Service Accounts - https://console.firebase.google.com/u/0/project/_/settings/serviceaccounts/adminsdk
      + Click Generate New Private Key, then confirm by clicking Generate Key.
      + Securely store the JSON file containing the key.
  node firebase-auth-server.js
  Copy the token and using to send firebase.messaging v1 HTTP
*/


const https = require('https');
var fs = require('fs');
var {google} = require('googleapis');

var PROJECT_ID = '[PROJECT_ID]';
var key = require('./firebase-adminsdk.json');

var HOST = 'fcm.googleapis.com';
var PATH = '/v1/projects/' + PROJECT_ID + '/messages:send';
var MESSAGING_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging';
var SCOPES = [MESSAGING_SCOPE];


function getAccessToken() {
  return new Promise(function(resolve, reject) {
    var jwtClient = new google.auth.JWT(
      key.client_email,
      null,
      key.private_key,
      SCOPES,
      null
    );
    jwtClient.authorize(function(err, tokens) {
      if (err) {
        reject(err);
        return;
      }
      resolve(tokens.access_token);
    });
  });
}

getAccessToken().then((access_token) => {
  console.log("Firebase Cloud Messaging - Authenticate token\n");
  console.log(access_token);
  console.log('\n');
})
