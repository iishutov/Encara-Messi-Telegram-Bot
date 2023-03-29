const axios       = require('axios')
const { JSDOM }   = require("jsdom")

exports.getStats = async () => {
    const sourceLink = 'https://www.sports.ru/messi/career/'
    const resp = await axios.get(sourceLink)
    const doc = (new JSDOM(resp.data)).window.document.
                    getElementsByClassName('stat-table career')[4].
                    getElementsByTagName('tfoot')[0]

    const currGoals = doc.getElementsByClassName('bordR')[2].innerHTML.replace(/\n/g, '')
    const currAssists = doc.getElementsByClassName('bordR')[4].innerHTML.replace(/\n/g, '')

    return [parseInt(currGoals), parseInt(currAssists)]
}

// exports.getParseDelayForClub = async (sourceLink) => {
//     const resp = await axios.get(sourceLink)
//     const data = (new JSDOM(resp.data)).window.document.
//                     getElementsByClassName('game_block')[0].
//                     getElementsByClassName('size10')[0].
//                     innerHTML

//     const day = parseInt(data.substring(0, 2))
//     const month = parseInt(data.substring(3, 5))
//     const hour = parseInt(data.substring(7, 9))
//     const minute = parseInt(data.substring(10, 12))

//     const currDate = new Date()
//     const year = (month - 1 < currDate.getMonth()) ? currDate.getFullYear() + 1 : currDate.getFullYear()
//     const matchDate = new Date(year, month - 1, day, hour, minute)

//     return matchDate - currDate
// }