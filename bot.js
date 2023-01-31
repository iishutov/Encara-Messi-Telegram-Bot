const TelegramBot = require('node-telegram-bot-api')
const db          = require('./db')
const parser      = require('./parser')
require('dotenv').config()

const bot = new TelegramBot(process.env.TOKEN, { polling: true })
process.env["NTBA_FIX_350"] = 1;

onStart()

bot.onText(/\/start/, async (msg) => {
	await bot.sendPhoto(msg.chat.id, './Messimania.jpg')
	bot.sendMessage(msg.chat.id, "Waiting for new goals 🐐")
    bot.setMyCommands([
        { command: "/start", description: "Subscribe for new goals" },
        { command: "/goals_count", description: "Total goals scored by Messi" }
    ])
    db.addUser(msg.chat.id)
})

bot.onText(/\/goals_count/, (msg) => {
	bot.sendMessage(msg.chat.id, `Total goals scored by Messi: ${goals}`)
})

async function onStart(){
    try {
        await db.createTables()
        globalThis.goals = await db.getGoals()

        globalThis.goalStrList = [
            'GOAL!', 'GOOAAL!!', 'GOAAL!!!',
            'Goal!!!', 'GOLASSO!!', 'Goal Goal Goal!',
            'Encara Messi! GOOOOAL!', 'Encara Messi Encara Messi! Golasso!'
        ]
        globalThis.emojiList = [
            '⚽️', '😍', '😍','🥳','👽','👏','👑','🔥','💥',,'❤️','🔝'
        ]
        shuffle(goalStrList), shuffle(emojiList)
        
        globalThis.requestNum = 1
        setInterval(checkForGoal, 60 * 1000)
    }
    catch (err){
        console.log(`${err.name}: ${err.message}.`)
    }
}

async function checkForGoal(){
    console.log(`Starting page request №${requestNum++}...`)
    currGoals = await parser.getGoals()
    if (goals != currGoals){
        console.log(`GOAL! (${currGoals})`)
        let goalAlarm = goalStrList[Math.floor(Math.random() * goalStrList.length)] +
                        emojiList[Math.floor(Math.random() * emojiList.length)]

        const users = await db.getUsers()
        users.forEach(user => bot.sendMessage(user.id, goalAlarm))

        db.updateGoals(currGoals)
        goals = currGoals
        shuffle(goalStrList), shuffle(emojiList)
    }
}

function shuffle(arr){
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1))
        [arr[i], arr[j]] = [arr[j], arr[i]]
    }
}