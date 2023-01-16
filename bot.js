const TelegramBot = require('node-telegram-bot-api')
const axios       = require('axios')
const { JSDOM }   = require("jsdom")
const sqlite3     = require('sqlite3')

const token = '**********************************************'
const bot = new TelegramBot(token, { polling: true })
process.env["NTBA_FIX_350"] = 1

/*const db = new sqlite3.Database('./sql.db', () => {
    db.run(`CREATE TABLE IF NOT EXISTS goals_count (goals INTEGER NOT NULL)`, () => {
        db.run(`INSERT INTO goals_count (goals) VALUES (?)`, [741])
    })
})*/

const link = 'https://www.sports.ru/messi/career/'
let loggedInUsers = new Set()
let goals
const db = new sqlite3.Database('./sql.db', () => {
	db.get(`SELECT goals FROM goals_count`, (err, row) => {
		goals = row.goals
	})
})
shuffle(goalStrList)
shuffle(emojiList)

let requestNum = 1
setInterval(checkForGoal, 60 * 1000)


bot.onText(/\/start/, async (msg) => {
	await bot.sendPhoto(msg.chat.id, './Messimania.jpg')
	await bot.sendMessage(msg.chat.id, "Waiting for new goals 🐐")
	loggedInUsers.add(msg.chat.id)
	await bot.setMyCommands(commandList)
})

bot.onText(/\/goals_count/, async (msg) => {
	await bot.sendMessage(msg.chat.id, `Total goals scored by Messi: ${goals}`)
})

async function checkForGoal(){
    console.log(`Started page request №${requestNum++}...`)
    try {
        await axios.get(link).then(async (resp) => {
            const doc = new JSDOM(resp.data)
            doc.window.onload = async () =>
            {
                let currGoals = doc.window.document.getElementsByClassName('stat-table career')[4].
                                                    getElementsByTagName('tfoot')[0].
                                                    getElementsByClassName('bordR')[2].
                                                    innerHTML.replace(/\n/g, '')
                if (goals != currGoals){
                    console.log(`GOAL!\ngoals in db: ${goals},\ngoals count: ${currGoals}`)
                    let goalAlarm = goalStrList[Math.floor(Math.random() * goalStrList.length)] +
                                    emojiList[Math.floor(Math.random() * emojiList.length)]
                    loggedInUsers.forEach(userId => {
                        bot.sendMessage(userId, goalAlarm)
                    })
                    goals = currGoals
                    await updateGoals(goals)
                    shuffle(goalStrList)
                    shuffle(emojiList)
                }
            }
        })
    }
    catch (err){
        console.log(`${err.name}: ${err.message}.`)
    }
}

function updateGoals(currGoals){
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO goals_count (goals) VALUES (?)`, [currGoals], (err) => {
            if (err) { reject(err) }
			console.log(`db updated`)
            resolve()
        })
    })
}

// Fisher–Yates shuffle.
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        [arr[i], arr[j]] = [arr[j], arr[i]]
    }
}

let commandList = [
	{ command: "/start", description: "Subscribe for new goals" },
	{ command: "/goals_count", description: "Total goals by Messi" }
]

let goalStrList = [
	'GOAL!', 'GOOAAL!!', 'GOAAL!!!',
	'Goal!!!', 'GOLASSO!!', 'Goal Goal Goal!',
	'Encara Messi! GOOOOAL!', 'Encara Messi Encara Messi! Golasso!'
]
let emojiList = [
	'⚽️', '😍', '😍','🥳','👽','👏','👑','🔥','💥',,'❤️','🔝'
]