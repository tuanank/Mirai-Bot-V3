const axios = require('axios');
const moment = require('moment-timezone');

const imageUrlsA = ['https://i.imgur.com/4Hfduoe.png', 'https://i.imgur.com/EHsr9RL.png', 'https://i.imgur.com/Xuw6yG8.png'];
const imageUrlsB = ['https://i.imgur.com/YPhfjfU.png', 'https://i.imgur.com/mahn5lm.png', 'https://i.imgur.com/cEivriJ.png'];

module.exports.config = {
    name: "kbb",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "quất",
    description: "",
    commandCategory: "Game",
    usages: "[từ khoá]",
    cooldowns: 0,
    images: [],
};

module.exports.run = async function ({ api, event, args, Currencies, Users }) {
    const { threadID, senderID } = event;
    
    const betAmount = parseFloat(args[1]) || 0;
    const currentUserMoney = (await Currencies.getData(senderID)).money;

    if (!args[0] || (!betAmount && args[1] !== 'all') || (!['kéo', 'búa', 'bao'].includes(args[0]))) {
        return api.sendMessage('❎ Vui lòng chọn kéo, búa hoặc bao và cược tiền', threadID);
    }

    const userChoice = args[0];
    const userBet = args[1] === 'all' ? currentUserMoney : betAmount;

    const botChoice = ['kéo', 'búa', 'bao'][Math.floor(Math.random() * 3)];
    let moneyChange = 0;

    switch (userChoice) {
        case 'kéo':
            if (botChoice === 'búa') {
                moneyChange = -userBet;
            } else if (botChoice === 'bao') {
                moneyChange = userBet;
            }
            break;
        case 'búa':
            if (botChoice === 'bao') {
                moneyChange = -userBet;
            } else if (botChoice === 'kéo') {
                moneyChange = userBet;
            }
            break;
        case 'bao':
            if (botChoice === 'kéo') {
                moneyChange = -userBet;
            } else if (botChoice === 'búa') {
                moneyChange = userBet;
            }
            break;
    }

    if (moneyChange > 0) {
        Currencies.increaseMoney(event.senderID, moneyChange);
    } else if (moneyChange < 0) {
        Currencies.decreaseMoney(event.senderID, -moneyChange);
    }

    const timestamp = moment.tz("Asia/Ho_Chi_Minh").format('HH:mm:ss || DD/MM/YYYY');
    const userImageUrl = imageUrlsA[['kéo', 'búa', 'bao'].indexOf(userChoice)];
    const botImageUrl = imageUrlsB[['kéo', 'búa', 'bao'].indexOf(botChoice)];

    const attachments = [
        await getImage(userImageUrl),
        await getImage(getResultImageUrl(moneyChange)),
        await getImage(botImageUrl)
    ];

    const displayName = await Users.getNameUser(senderID);
    const resultMessage = moneyChange > 0 ? 'thắng' : moneyChange < 0 ? 'thua' : 'hòa';
    const moneyChangeMessage = moneyChange > 0 ? `nhận: ${moneyChange}$` : moneyChange < 0 ? `mất: ${-moneyChange}$` : `giữ lại: ${moneyChange}$`;

    const message = `|› 👤 Người chơi: ${displayName}\n|› ⏰ Lúc: ${timestamp}\n|› 📝 Kết quả: ${resultMessage}\n|› ✏️ Bạn đưa ra: ${userChoice}\n|› 🤖 Bot đưa ra: ${botChoice}\n|› 🔰 Bạn ${moneyChangeMessage}\n|› 💵 Hiện bạn còn: ${currentUserMoney + moneyChange}$\n──────────────────`;

    return api.sendMessage({ body: message, attachment: attachments }, threadID);
};

async function getImage(url) {
    const response = await axios.get(url, { responseType: 'stream' });
    return response.data;
}

function getResultImageUrl(moneyChange) {
    return moneyChange > 0 ? 'https://i.imgur.com/tYFcqjH.png' : moneyChange < 0 ? 'https://i.imgur.com/4QBP4bC.png' : 'https://i.imgur.com/AYhzVjZ.png';
}