exports.myCommands = [
    { command: "/help"   , description: "Information about this bot" },
    { command: "/goals"  , description: "Toggle subscribe for new goals" },
    { command: "/assists", description: "Toggle subscribe for new assists" },
    { command: "/stats"  , description: "Get total Messi`s goals & assists" }
]

exports.goalStrList = [
    'GOAL!', 'GOOAAL!!', 'GOAAL!!!',
    'Goal!!!', 'GOLASSO!!', 'Goal Goal Goal!',
    'Encara Messi! GOOOOAL!', 'Encara Messi Encara Messi! Golasso!'
]
exports.emojiList = [
    '⚽️', '😍', '😍','🥳','👽','👏','👑','🔥','💥',,'❤️','🔝'
]

exports.helpMessage =
`Use /goals command to get messages when Messi scores.
Use /assists command, if you also want to subscribe for assists.
/stats command give you information about total Messi\`s goals & assists.`