// const TELEGRAM_BOT_TOKEN = "6140449523:AAFtb3y1PR1WnihdP6_c6ExWUBTLlhxWhVk";

const fs = require("fs");

const TeleBot = require("telebot");
require("dotenv").config();
// const TELEGRAM_BOT_TOKEN = process.env.TOKEN
const TELEGRAM_BOT_TOKEN = "6140449523:AAFtb3y1PR1WnihdP6_c6ExWUBTLlhxWhVk";

const bot = new TeleBot(TELEGRAM_BOT_TOKEN);

const founderId = "1423191247";

bot.on(["/start"], (msg) => {
  console.log(msg);
  msg.reply.text(
    `<b>Assalomu alaykum @${msg.from.username}.</b> \n\n<a href="htpps://t.me/Valisher_Botirov"><b>Valisher Botirovning</b></a> murojat botiga xush kelibsiz!\n\nXabaringizni yozib qoldiring va tez orada sizga javob qaytaramiz!\n\n<b>Ko'proq malumot uchun:</b> \n\n🔔 @Valisher_Botirov
    `,
    { parseMode: "html" }
  );

  const allUsers = JSON.parse(fs.readFileSync("users.json", "utf-8"));

  const user = {
    userId: msg.chat.id,
    userName: msg.chat.username,
    user: msg.chat.first_name + " " + msg.chat.last_name,
  };

  const checkUser = allUsers.findIndex((el) => {
    return el.userId == user.userId;
  });

  if (checkUser == -1) {
    allUsers.push(user);
    const jsonData = JSON.stringify(allUsers, null, 2);
    fs.writeFileSync("users.json", jsonData);
  } else console.log("bunday user avvaldan mavjud");

  // send notification admin

  const sendFounderText = `<b>Yangi obunachi qo'shildi ✨</b>\n\n<b>Username:</b> @${
    msg.chat.username
  }\n<b>Ismi:</b> ${msg.chat.first_name}  ${
    msg.chat.last_name ? msg.chat.last_name : ""
  }\n\n<b>Obunachilar soni :</b> ${allUsers.length}`;

  bot
    .sendMessage(founderId, sendFounderText, { parseMode: "html" })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
});

bot.on(["text", "photo", "audio", "document", "video"], (msg) => {
  if (msg.text != "/start") {
    if (msg.chat.id == founderId) {
      adminPanel(msg);
    } else {
      userPanel(msg);
    }
  }
});

function adminPanel(msg) {
  console.log(msg);

  const users = JSON.parse(fs.readFileSync("users.json"));

  const replyToMessage = msg.reply_to_message;
  const replyToMessageId = replyToMessage ? replyToMessage.message_id : null;

  if (replyToMessageId) {
    let userId = msg?.reply_to_message?.caption
      ? msg.reply_to_message?.caption?.slice(4, 15)
      : msg.reply_to_message?.text?.slice(4, 15);
    let messageId = msg?.reply_to_message?.caption
      ? msg.reply_to_message?.caption?.slice(26, 30)
      : msg.reply_to_message?.text?.slice(26, 30);

    if (msg?.photo?.length) {
      const photo = msg.photo;
      const caption = msg.caption;
      bot
        .sendPhoto(userId, photo[photo.length - 1].file_id, {
          caption: caption,
          replyToMessage: messageId,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const sendMessage = `${msg.text}\n\n🎙 <b> Valisher Botirov</b>`;
      bot
        .sendMessage(userId, sendMessage, {
          parseMode: "html",
          replyToMessage: messageId,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  // hamma userga birder xabar jo'natish uchun cod

  if (!msg.reply_to_message?.message_id) {
    users.forEach((user) => {
      if (msg?.photo?.length) {
        const caption = msg.caption;
        const photo = msg.photo;
        bot
          .sendPhoto(user.userId, photo[photo.length - 1].file_id, {
            caption: caption,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        bot
          .sendMessage(user.userId, msg.text, {
            parseMode: "html",
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }
}

function userPanel(msg) {
  console.log(msg);

  if (msg?.photo?.length) {
    const photo = msg.photo;
    const caption = msg.caption ? msg.caption : "";
    const captionId = `<b>Id:</b> ${msg.chat.id}\n<b>MessageId:</b> ${msg.message_id}\n\n${caption}`;
    bot.sendPhoto(founderId, photo[photo.length - 1].file_id, {
      caption: captionId,
      parseMode: "html",
    });
  } else {
    let text = `<b>Id:</b> ${msg.chat.id}\n<b>MessageId:</b> ${
      msg.message_id
    }\n<b>Username:</b> @${msg.chat.username}\n<b>Ismi:</b> ${
      msg.chat.first_name
    }  ${
      msg.chat.last_name ? msg.chat.last_name : ""
    } \n\n <i>Yuborgan xabari:</i>\n\n ${msg.text}`;
    bot.sendMessage(founderId, text, { parseMode: "html" });
  }

  msg.reply.text(
    "So'rovingiz uchun rahmat! Tez orada siz bilan bog'lanamiz\n\n🎤 <b>MurojatBot</b>",
    { parseMode: "html" }
  );
}

bot.start();

// fid 5171082791
