const axios = require('axios');

const gooseApiKey = '';

// Set the API endpoint URL
const apiUrl = 'https://api.goose.ai/v1/engines/gpt-j-6b/completions';

// Create a sample prompt
const prompt = 'Roses are red';

// Make the API request
axios.post(apiUrl, { prompt, max_tokens: 25 }, {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${gooseApiKey}`,
  },
})
  .then(response => {
    console.log(response.data.choices[0].text);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
