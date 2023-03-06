require('dotenv').config()
const helper = require('./helper')
const db = require('./db')
const src = require('./src')
const TelegramBot = require('node-telegram-bot-api')
const bot = new TelegramBot(process.env.TOKEN, { polling: true })
process.env["NTBA_FIX_350"] = 1;

onStart()

bot.on("polling_error", console.log);

bot.onText(/\/start/, async (msg) => {
    await bot.sendPhoto(msg.chat.id, './messimania.jpg')
    const user_lang = (src.languages.includes(msg.from.language_code)) ?
        msg.from.language_code : 'en'
    bot.sendMessage(msg.chat.id, `${src.welcomeMsg[user_lang]}\n${src.helpMsg[user_lang]}`)
    db.addUser(msg.chat.id, user_lang)
})

bot.onText(/\/help/, (msg) => {
    const user = db.getUser(msg.chat.id)
    bot.sendMessage(msg.chat.id, src.helpMsg[user.lang])
})

bot.onText(/\/goals/, async (msg) => {
    const userId = msg.chat.id
    const user = await db.getUser(userId)
    if (user.goalNotif){
        bot.sendMessage(userId, src.goalUnsubscribeMsg[user.lang])
        db.updateUser(userId, 'goalNotif', 0)
    }
    else {
        bot.sendMessage(userId, src.goalSubscribeMsg[user.lang])
        db.updateUser(userId, 'goalNotif', 1)
    }
})

bot.onText(/\/assists/, async (msg) => {
    const userId = msg.chat.id
    const user = await db.getUser(userId)
    if (user.assistNotif){
        bot.sendMessage(userId, src.assistUnsubscribeMsg[user.lang])
        db.updateUser(userId, 'assistNotif', 0)
    }
    else {
        bot.sendMessage(userId, src.assistSubscribeMsg[user.lang])
        db.updateUser(userId, 'assistNotif', 1)
    }
})

bot.onText(/\/stats/, async (msg) => {
    const user = await db.getUser(msg.chat.id)
	bot.sendMessage(msg.chat.id,
        `${src.totalGoalsMsg[user.lang]}: ${goals},\n` +
        `${src.totalAssistsMsg[user.lang]}: ${assists}.`)
})

async function onStart(){
    console.log(`\nThe bot is running`)
    bot.setMyCommands(src.myCommands)
    try {
        await helper.setup()
        setInterval(() => {helper.checkStats(bot)}, 60 * 1000)
    }
    catch (err){
        console.log(`${err.name}: ${err.message}.`)
    }
}