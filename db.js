const sqlite3 = require('sqlite3')
const parser  = require('./parser')

const db = new sqlite3.Database('./sql.db')

exports.createTables = () => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name='users'`, (err, row) => {
            if (err) reject(err)
            if (row == undefined){
                console.log(`Creating db table 'users'`)
                db.run(`CREATE TABLE users (
                    id          INTEGER NOT NULL PRIMARY KEY,
                    goalNotif   INTEGER NOT NULL,
                    assistNotif INTEGER NOT NULL
                    )`, (err) => {if (err) reject(err)})
            }
        })
        db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name='messi_stats'`, async (err, row) => {
            if (err) reject(err)
            let currGoals, currAssists;
            [currGoals, currAssists] = await parser.getStats()
            if (row == undefined){
                console.log(`Creating db table 'messi_stats' (goals - ${currGoals}, assists - ${currAssists})`)
                db.run(`CREATE TABLE messi_stats (
                    goals   INTEGER NOT NULL,
                    assists INTEGER NOT NULL
                    )`, (err) => {
                    if (err) reject(err)
                    db.run(`INSERT INTO messi_stats (goals, assists) VALUES (?, ?)`, [currGoals, currAssists], (err) => {
                        if (err) reject(err)
                        resolve()
                    })
                })
            }
            else {
                console.log(`Updating messi_stats (goals - ${currGoals}, assists - ${currAssists})`)
                await exports.updateStats(currGoals, currAssists)
                resolve()
            }
        })
    })
}

exports.updateStats = (currGoals, currAssists) => {
    return new Promise((resolve, reject) => {
        db.run(`UPDATE messi_stats SET goals = ?, assists = ?`, [currGoals, currAssists], (err) => {
            if (err) reject(err)
            resolve()
        })
    })
}

exports.getStats = () => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT goals, assists FROM messi_stats`, (err, row) => {
            if (err) reject(err)
            resolve([row?.goals, row?.assists])
        })
    })
}

exports.addUser = (id) => {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO users (id, goalNotif, assistNotif) VALUES (?, ?, ?)`, [id, 0, 0], (err) => {
            if (err) reject(err)
            resolve()
        })
    })
}

exports.setUser = (id, col, val) => {
    return new Promise((resolve, reject) => {
        db.run(`UPDATE users SET ${col} = ? WHERE id = ?`, [val, id], (err) => {
            if (err) reject(err)
            resolve()
        })
    })
}

exports.getUser = (id) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM users WHERE id = ${id}`, (err, row) => {
            if (err) reject(err)
            resolve(row)
        })
    })
}

exports.getUsers = (notif) => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM users WHERE ${notif} = 1`, (err, rows) => {
            if (err) reject(err)
            resolve(rows)
        })
    })
}