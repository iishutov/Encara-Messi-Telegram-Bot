const db = require('./db')
const parser = require('./parser')
const src = require('./src')

exports.setup = async () => {
    globalThis.requestNum = 1
    await db.createTables()
    globalThis.goals, globalThis.assists; [goals, assists] = await db.getStats()
    console.log(`Setup completed`)
}

exports.checkStats = async () => {
    let currGoals, currAssists
    console.log(`Starting page request №${requestNum++}...`);
    [currGoals, currAssists] = await parser.getStats()
    let isGoal = await checkGoals(currGoals)
    let isAssist = await checkAssists(currAssists)
    if (isGoal || isAssist) await db.updateStats(currGoals, currAssists)
}

async function checkGoals(currGoals){
    if (goals != currGoals){
        const users = await db.getUsers('goalNotif')
        if (goals > currGoals){
            console.log(`GOAL! (${currGoals})`)
            var alarmMessage = src.goalStrList[Math.floor(Math.random() * src.goalStrList.length)] + ' '+
                               src.emojiList[Math.floor(Math.random() * src.emojiList.length)]
        }
        else {
            console.log(`GOAL CANCELED! (${currGoals})`)
            var alarmMessage = `Goal was canceled 😢`
        }
        users.forEach(user => { bot.sendMessage(user.id, alarmMessage) })

        goals = currGoals
        shuffle(src.goalStrList), shuffle(src.emojiList)
        return true
    }
    return false
}

async function checkAssists(currAssists){
    if (assists != currAssists){
        const users = await db.getUsers('assistNotif')
        if (assists > currAssists){
            console.log(`ASSIST! (${currAssists})`)
            var alarmMessage = 'Assist! ' +
                               src.emojiList[Math.floor(Math.random() * src.emojiList.length)]
        }
        else {
            console.log(`ASSIST CANCELED! (${currAssists})`)
            var alarmMessage = `Assist was canceled 😢`
        }
        users.forEach(user => { bot.sendMessage(user.id, alarmMessage) })

        assists = currAssists
        shuffle(src.emojiList)
        return true
    }
    return false
}

function shuffle(arr){
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]
    }
}