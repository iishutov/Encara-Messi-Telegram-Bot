const axios       = require('axios')
const { JSDOM }   = require("jsdom")

exports.getStats = async () => {
    const source_link = 'https://www.sports.ru/messi/career/'
    let resp = await axios.get(source_link)
    const doc = (new JSDOM(resp.data)).window.document.
                    getElementsByClassName('stat-table career')[4].
                    getElementsByTagName('tfoot')[0]

    let currGoals = doc.getElementsByClassName('bordR')[2].innerHTML.replace(/\n/g, '')
    let currAssists = doc.getElementsByClassName('bordR')[4].innerHTML.replace(/\n/g, '')

    return [currGoals, currAssists]
}