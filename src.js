exports.languages = ['en', 'ru']

exports.welcomeMsg = {
    'en': `Welcome to Encara Messi Telegram Bot ⚽️`,
    'ru': `Добро пожаловать в Encara Messi Telegram Bot ⚽️`
}

exports.helpMsg = {
    'en':
`Use /goals command to get messages when Messi scores.
Use /assists command, if you also want to subscribe for assists.
/stats command give you information about total Messi\`s goals & assists.`,
    'ru':
`Используйте команду /goals, чтобы получать уведомления всякий раз, когда Месси забивает.
Используйте команду /assists, если также желаете подписаться на рассылку голевых передач.
Команда /stats выдаст информацию об общем количестве голов и голевых передач Месси`
}

exports.goalUnsubscribeMsg = {
    'en': `You have unsubscribed from goalsmessages.`,
    'ru': `Вы отписались от рассылки уведомлений о голах.`
}
exports.goalSubscribeMsg = {
    'en': `You have subscribed for goal messages 🐐`,
    'ru': `Вы подписались на рассылку уведомлений о голах 🐐`
}

exports.assistUnsubscribeMsg = {
    'en': `You have unsubscribed from assist messages.`,
    'ru': `Вы отписались от рассылки уведомлений о голевых передачах.`
}
exports.assistSubscribeMsg = {
    'en': `You have subscribed for assist messages 🐐`,
    'ru': `Вы подписались на рассылку уведомлений о голевых передачах 🐐`
}

exports.totalGoalsMsg = {
    'en': `Total goals scored by Messi`,
    'ru': `Всего забитых голов Месси`
}
exports.totalAssistsMsg = {
    'en': `Total assists`,
    'ru': `Всего ассистов`
}

exports.goalCanceledMsg = {
    'en': `Goal was canceled 😢`,
    'ru': `Гол отменён 😢`
}
exports.assistCanceledMsg = {
    'en': `Assists was canceled 😢`,
    'ru': `Ассист отменён 😢`
}

exports.assistMsg = {
    'en': `Assist!`,
    'ru': `Ассист!`
}

exports.goalStrList = {
    'en' : [
        'GOAL!', 'GOOAAL!!', 'GOAAL!!!',
        'Goal!!!', 'GOLASSO!!', 'Goal Goal Gooal!',
        'ENCARA MESSI! GOOOOAL!', 'Encara Messi Encara Messi! Golasso!'
    ],
    'ru' : [
        'ГОЛ!', 'ГОООЛ!!', 'ГОООООЛ!!!',
        'ГОЛ!!!', 'ГОЛАССО!!', 'Гол Гол Гоол!',
        'AНКАРА МЕССИ! ГООООЛ!', 'Анкара Месси Анкара Месси! Голассо!'
    ]
}

exports.emojiList = [
    '⚽️', '😍', '😍','🥳','👽','👏','👑','🔥','💥',,'❤️','🔝'
]

exports.myCommands = [
    { command: "/help"   , description: "Information about this bot" },
    { command: "/goals"  , description: "Toggle subscribe for new goals" },
    { command: "/assists", description: "Toggle subscribe for new assists" },
    { command: "/stats"  , description: "Get total Messi`s goals & assists" }
]