const TELEGRAM_BOT_TOKEN = "6140449523:AAFtb3y1PR1WnihdP6_c6ExWUBTLlhxWhVk";

const TeleBot = require("telebot");
const bot = new TeleBot(TELEGRAM_BOT_TOKEN);

// bot.on("text", (msg) => {
//   msg.reply.text(
//     "Assalomu alaykum Valisher Botirovning sahifasiga xush kelibsiz " + msg.text
//   );
// });

let users = [];
const founderId = '1423191247'

let clientId = null

bot.on( ['/start'],(msg) => {
  console.log(msg)
  clientId = msg.chat.id
  msg.reply.text(
      `Salom @${msg.from.username}. Valisher Botirovning murojat botiga xush kelibsiz!`
  );
});

bot.on( 'text' ,(msg) => {
  if(msg.text !== '/start' && msg.chat.id !== founderId){
    msg.reply.text(
        `Murojatingiz qabul qilindi!`
    );
  let text = `Sizga username @${msg.from.username}, ismi ${msg.chat.first_name} bo'lgan foydalanuvchi xabar yo'lladi.  \n \n \n ${msg.text}`
  bot.sendMessage(founderId,text)

  }
  else if(msg.chat.id === founderId){
    console.log("run is founder id")
    bot.on('callbackQuery', (query) => {
      console.log(query,"query")
      const queryId = query.id;
      const queryData = query.data;
      // Queryga javob berish
      const answerText = 'Sizning javobingiz: ' + queryData;

    });
  }
});

bot.on('callbackQuery', (query) => {
  console.log(query,"query")
  const queryId = query.id;
  const queryData = query.data;
  // Queryga javob berish
  const answerText = 'Sizning javobingiz: ' + queryData;

});

// bot.on(["/stop"], (msg) => {
//   let userId = msg.chat.id;
//   users = users.filter((id) => id !== userId);
//   // sendUserMessage();
// });
// console.log(users, "users");


// bot.on(['/hello'],(msg)=>{
//   let from = msg.from
//   let user_id = from.id
//   let name = from.first_name
//   msg.reply.photo("https://t.me/Husayn_Buxoriy/748")
//   let message = `Foydalanuvchi ${user_id} name = ${name}`
//   msg.reply.text(message)
//
// })


bot.start();
