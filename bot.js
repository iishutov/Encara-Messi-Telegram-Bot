require('dotenv').config()
const helper = require('./helper')
const db = require('./db')
const src = require('./src')
const TelegramBot = require('node-telegram-bot-api')
const bot = new TelegramBot(process.env.TOKEN, { polling: true })
process.env["NTBA_FIX_350"] = 1;

onStart()

bot.onText(/\/start/, async (msg) => {
    await bot.sendPhoto(msg.chat.id, './Messimania.jpg')
    bot.sendMessage(msg.chat.id, `Welcome to Encara Messi Telegram Bot ⚽️\n` + src.helpMessage)
    db.addUser(msg.chat.id)
})

bot.onText(/\/help/, (msg) => {
    bot.sendMessage(msg.chat.id, src.helpMessage)
})

bot.onText(/\/goals/, async (msg) => {
    let userId = msg.chat.id
    let user = await db.getUser(userId)
    if (user.goalNotif){
        bot.sendMessage(userId, "You have unsubscribed from goal messages.")
        db.setUser(userId, 'goalNotif', 0)
    }
    else {
        bot.sendMessage(userId, "You have subscribed for goal messages 🐐")
        db.setUser(userId, 'goalNotif', 1)
    }
})

bot.onText(/\/assists/, async (msg) => {
    let userId = msg.chat.id
    let user = await db.getUser(userId)
    if (user.assistNotif){
        bot.sendMessage(userId, "You have unsubscribed from assist messages.")
        db.setUser(userId, 'assistNotif', 0)
    }
    else {
        bot.sendMessage(userId, "You have subscribed for assist messages 🐐")
        db.setUser(userId, 'assistNotif', 1)
    }
})

bot.onText(/\/stats/, (msg) => {
	bot.sendMessage(msg.chat.id,
        `Total goals scored by Messi: ${goals},\n` +
        `Total assists: ${assists}.`)
})

async function onStart(){
    console.log(`\nThe bot is running`)
    bot.setMyCommands(src.myCommands)
    try {
        await helper.setup()
        setInterval(helper.checkStats, 60 * 1000)
    }
    catch (err){
        console.log(`${err.name}: ${err.message}.`)
    }
}