const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');
const destroyer = require('server-destroy');

const chat = require('@googleapis/chat');

// Application OAuth credentials.
const keys = require('./client_secret_1.json').web;


// Define your app's authorization scopes.
// When modifying these scopes, delete the file token.json, if it exists.
const scopes = ["https://www.googleapis.com/auth/chat.spaces.create"];

// Create a new OAuth2 client with the configured keys.
const oauth2Client = new chat.auth.OAuth2(
  keys.client_id,
  keys.client_secret,
  'http://localhost:3000'
);

/**
 * Opens an HTTP server to accept the OAuth callback.
 * In this simple example, the only request to our webserver is to /?code=<code>.
 */
async function authenticate(scopes) {
  const opn = (await import('open')).default;

  return new Promise((resolve, reject) => {
    // Generate the URL for authorization.
    const authorizeUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes.join(' '),
    });
    // Start the HTTP server to listen for the callback.
    const server = http
      .createServer(async (req, res) => {
        try {
          const qs = new url.URL(req.url, 'http://localhost:3000').searchParams;
          res.end('Authentication successful! Please return to the console.');
          server.destroy();
          const { tokens } = await oauth2Client.getToken(qs.get('code'));
          oauth2Client.credentials = tokens;
          resolve(oauth2Client);
        } catch (e) {
          reject(e);
        }
      })
      .listen(3000, () => {
        // Open the browser to the authorize URL to start the workflow.
        opn(authorizeUrl, { wait: false }).then(cp => cp.unref());
      });
    destroyer(server);
  });
}

/**
 * Authenticates with Chat API via user credentials, then creates a Chat space.
 */
async function createSpace() {
  // Create the Chat API client and authenticate with the authorized user.
  const chatClient = await chat.chat({
    version: 'v1',
    auth: oauth2Client
  });

  // Call the Chat API to create a space.
  const result = await chatClient.spaces.create({

    // Details about the space to create.
    requestBody: {

      // To create a named space, set spaceType to SPACE.
      'spaceType': 'SPACE',

      // The user-visible name of the space.
      'displayName': 'API-made'

    }

  });
  return result;
}

// Authenticate the user, execute the function,
// then print details about the created space.
authenticate(scopes)
  .then(createSpace)
  .then(console.log);