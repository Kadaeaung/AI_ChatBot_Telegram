const axios = require('axios');
const { Telegraf } = require('telegraf');

// Set your Goose AI API key
const gooseApiKey = 'sk-qdKWoDhVXsdMkSgd0gyRB2AgsX3j5ql1nJN0W8rIbKxYxvw6';

// Set your Telegram bot token
const telegramBotToken = '6901080042:AAHyMl4D3njsdI0C0lzFFdhC95UgIysTn0k';

// Create a new Telegram bot instance
const bot = new Telegraf(telegramBotToken);

// // Handle incoming text messages
// bot.on('text', async (ctx) => {
//   try {
//     const userMessage = ctx.message.text;

//     // Use Goose AI API to generate a response
//     const response = await axios.post('https://api.goose.ai/v1/engines/gpt-j-6b/completions', {
//       prompt: userMessage,
//       max_tokens: 25,
//     }, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${gooseApiKey}`,
//       },
//     });

//     const botResponse = response.data.choices[0].text;

//     // Send the response back to the user
//     ctx.reply(botResponse);
//   } catch (error) {
//     console.error('Error:', error.message);
//     ctx.reply('An error occurred while processing your request.');
//   }
// });
// Handle incoming stickers
bot.on('sticker', async (ctx) => {
  try {
    // Extract sticker information
    const sticker = ctx.message.sticker;

    // Access sticker details
    const fileId = sticker.file_id;

    // Reply with the same sticker
    await ctx.telegram.sendSticker(ctx.message.chat.id, fileId);

    // Alternatively, you can reply with a custom message
    // await ctx.reply(`Received a sticker! File ID: ${fileId}`);
  } catch (error) {
    console.error('Error:', error.message);
    ctx.reply('An error occurred while processing your request.');
  }
});
// Start the bot
bot.launch();
