// const TELEGRAM_BOT_TOKEN = "6140449523:AAFtb3y1PR1WnihdP6_c6ExWUBTLlhxWhVk";

const { log } = require("console");
const fs = require("fs");

const TeleBot = require("telebot");
require("dotenv").config();
// const TELEGRAM_BOT_TOKEN = process.env.TOKEN
const TELEGRAM_BOT_TOKEN = "6140449523:AAFtb3y1PR1WnihdP6_c6ExWUBTLlhxWhVk";

const bot = new TeleBot(TELEGRAM_BOT_TOKEN);

const founderId = "1423191247";

bot.on(["/start"], (msg) => {
  console.log(msg);
  clientId = msg.chat.id;
  msg.reply.text(
    `Assalomu alaykum @${msg.from.username}. Valisher Botirovning murojat botiga xush kelibsiz!`
  );

  const allData = JSON.parse(fs.readFileSync("data.json", "utf-8"));
  console.log(allData, "all user");

  const user = {
    userId: msg.chat.id,
    messageId: msg.message_id,
    userName: msg.chat.username,
    user: msg.chat.first_name,
  };

  allData.push(user);

  const jsonData = JSON.stringify(allData, null, 2); // Ob'ektni JSON ko'rinishiga o'girish
  fs.writeFileSync("data.json", jsonData); // JSON faylga yozish
});

bot.on("text", (msg) => {
  console.log(msg.chat.id);

  if (msg.chat.id == founderId) {
    adminPanel(msg);
  } else {
    userPanel(msg);
  }
});

function adminPanel(msg) {
  console.log(msg);

  const users = JSON.parse(fs.readFileSync("data.json", "utf-8"));
  // console.log(msg.reply_to_message.message_id);

  users.forEach((user) => {
    bot
      .sendMessage(user.userId, msg.text)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  // bot.sendMessage(
  //   5844994207,
  //   "Server bilan muommo yuz berdi. Eror | status code 500"
  // );
}

function userPanel(msg) {
  console.log("run is users");
  console.log(msg);
  let text = `Sizga username @${msg.from.username}, ismi ${msg.chat.first_name} bo'lgan foydalanuvchi xabar yo'lladi.  \n \n \n ${msg.text}`;
  bot.sendMessage(founderId, text);

  msg.reply.text("So'rovingiz uchun rahmat! Tez orada siz bilan bog'lanamiz");
}

bot.start();
