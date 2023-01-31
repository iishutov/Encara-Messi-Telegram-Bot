const sqlite3 = require('sqlite3')
const parser  = require('./parser')

const db = new sqlite3.Database('./sql.db')

exports.createTables = () => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name='users'`, (err, row) => {
            if (err) reject(err)
            if (row == undefined){
                console.log(`Create db table for users on start`)
                db.run(`CREATE TABLE users (id INTEGER NOT NULL PRIMARY KEY)`, (err) => {
                    if (err) reject(err)
                })
            }
        })
        db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name='goals_count'`, async (err, row) => {
            if (err) reject(err)
            let goals = await parser.getGoals()
            if (row == undefined){
                console.log(`Create db table for goals count on start (${goals})`)
                db.run(`CREATE TABLE goals_count (goals INTEGER NOT NULL)`, (err) => {
                    if (err) reject(err)
                    db.run(`INSERT INTO goals_count (goals) VALUES (?)`, [goals])
                    resolve()
                })
            }
            else {
                console.log(`Update goals count on start (${goals})`)
                await exports.updateGoals(goals)
                resolve()
            }
        })
    })
}

exports.updateGoals = (currGoals) => {
    return new Promise((resolve, reject) => {
        db.run(`UPDATE goals_count SET goals = ?`, [currGoals], (err) => {
            if (err) reject(err)
            resolve()
        })
    })
}

exports.getGoals = () => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT goals FROM goals_count`, (err, row) => {
            if (err) reject(err)
            resolve(row?.goals)
        })
    })
}

exports.addUser = (id) => {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO users (id) VALUES (?)`, [id], (err) => {
            if (err) reject(err)
            resolve()
        })
    })
}

exports.getUsers = () => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM users`, (err, rows) => {
            if (err) reject(err)
            resolve(rows)
        })
    })
}