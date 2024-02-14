const { google } = require('googleapis');
const path = require('path');

// Set the path to your service account key file
const serviceAccountKeyPath = path.join(__dirname, 'ethereal-link-2.json');

// Set your Google Chat API key
const googleChatApiKey = 'AIzaSyDW6MrLrdJS0M8-JGP36jG45EJKnHQIv7Q';

const auth = new google.auth.GoogleAuth({
  keyFile: serviceAccountKeyPath,
  scopes: ['https://www.googleapis.com/auth/chat.bot'],
});

const chat = google.chat({
  version: 'v1',
  auth: auth,
});

// Specify the correct space ID format ('spaces/YOUR_SPACE_ID')
const spaceId = 'AAAA98pIu6Y';

// Now you can use the 'chat' object to interact with the Google Chat API
// For example, to list messages in a space:
chat.spaces.messages.list({
  parent: `spaces/${spaceId}`,
})
  .then(response => {
    const messages = response.data.messages;
    console.log('Messages:', messages);
  })
  .catch(error => {
    console.error('Error:', error.message);
    if (error.response && error.response.data) {
      console.error('Error Details:', error.response.data);
    }
  });
