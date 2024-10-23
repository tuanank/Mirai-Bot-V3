const fs = require('fs');

module.exports.config = {
    name: "test",
    version: "1.0.0",
    hasPermission: 0,
    credits: "DongDev",
    description: "Xoá thư mục có đường dẫn ./Fca-Dongdev.",
    usage: "",
    commandCategory: "Admin",
    cooldowns: 5
};

module.exports.run = async function({ event, api, args }) {
try {
    const url = args.join(" ");
    const link = await global.utils.imgur(url, 'jpg');
    api.sendMessage(`${link}`, event.threadID);
} catch(e) {
console.log(e);
}
};
