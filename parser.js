const axios       = require('axios')
const { JSDOM }   = require("jsdom")

exports.getGoals = async () => {
    const source_link = 'https://www.sports.ru/messi/career/'
    let resp = await axios.get(source_link)
    const doc = new JSDOM(resp.data)
    let currGoals = doc.window.document.getElementsByClassName('stat-table career')[4].
                                        getElementsByTagName('tfoot')[0].
                                        getElementsByClassName('bordR')[2].
                                        innerHTML.replace(/\n/g, '')
    return currGoals
}