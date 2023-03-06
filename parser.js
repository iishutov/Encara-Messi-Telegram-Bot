const axios       = require('axios')
const { JSDOM }   = require("jsdom")

exports.getStats = async () => {
    const source_link = 'https://www.sports.ru/messi/career/'
    const resp = await axios.get(source_link)
    const doc = (new JSDOM(resp.data)).window.document.
                    getElementsByClassName('stat-table career')[4].
                    getElementsByTagName('tfoot')[0]

    const currGoals = doc.getElementsByClassName('bordR')[2].innerHTML.replace(/\n/g, '')
    const currAssists = doc.getElementsByClassName('bordR')[4].innerHTML.replace(/\n/g, '')

    return [currGoals, currAssists]
}