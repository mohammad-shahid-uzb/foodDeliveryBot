const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const bodyParser = require("body-parser");

const token = "6711491346:AAEyAlM9m4bdOa4LQUdkRUczBNOEBfHXj88";
const bot = new TelegramBot(token, { polling: true });

const app = express();
app.use(bodyParser.json());

// Language support, menu, and other logic goes here.
const i18n = require("i18n");

// Configure i18n (same as before)
i18n.configure({
  locales: ["en", "es"], // Add more locales as needed
  directory: __dirname + "/locales",
  defaultLocale: "es",
  objectNotation: true,
  register: global,
});

// Handle incoming messages
bot.on("message", (msg) => {
  const languageCode = msg.from.language_code || "en";
  i18n.setLocale(languageCode);

  const greetingMessage = i18n.__("greeting");
  bot.sendMessage(msg.chat.id, greetingMessage);

  // Handle other message logic here based on the user's language preference
});

// Handle polling errors
bot.on("polling_error", (error) => {
  console.error("Polling error:", error);
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
