const db = require('./db')
const parser = require('./parser')
const src = require('./src')

exports.setup = async () => {
    await db.createTables()
    globalThis.goals, globalThis.assists; [goals, assists] = await db.getStats()
    console.log(`Setup completed`)
}

exports.checkStats = async (bot) => {
    let currGoals, currAssists
    [currGoals, currAssists] = await parser.getStats()
    const isGoal = await checkGoals(bot, currGoals)
    const isAssist = await checkAssists(bot, currAssists)
    if (isGoal || isAssist) await db.updateStats(currGoals, currAssists)
}

async function checkGoals(bot, currGoals){
    if (goals != currGoals){
        const users = await db.getUsers('goalNotif')

        let alarmMessage = {}
        const rand = Math.random()
        src.languages.forEach(lang => {
            alarmMessage[lang] = (currGoals < goals) ?
                src.goalCanceledMsg[lang] :
                src.goalStrList[lang][Math.floor(rand * src.goalStrList[lang].length)] + ' ' +
                src.emojiList[Math.floor(rand * src.emojiList.length)]
        })
        
        users.forEach(user => { bot.sendMessage(user.id, alarmMessage[user.lang]) })

        goals = currGoals
        shuffle(src.goalStrList), shuffle(src.emojiList)
        return true
    }
    return false
}

async function checkAssists(bot, currAssists){
    if (assists != currAssists){
        const users = await db.getUsers('assistNotif')

        let alarmMessage = {}
        const rand = Math.random()
        src.languages.forEach(lang => {
            alarmMessage[lang] = (currAssists < assists) ?
                src.assistCanceledMsg[lang] :
                src.assistMsg[lang] + ' ' + src.emojiList[Math.floor(rand * src.emojiList.length)]
        })

        users.forEach(user => { bot.sendMessage(user.id, alarmMessage[user.lang]) })

        assists = currAssists
        shuffle(src.emojiList)
        return true
    }
    return false
}

function shuffle(arr){
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]
    }
}
