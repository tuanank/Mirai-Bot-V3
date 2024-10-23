module.exports.config = {
 name: "money",
 version: "1.0.2",
 hasPermssion: 0,
 credits: "Mirai Team mod by DongDev",
 description: "Kiểm tra số tiền của bản thân hoặc người được tag",
 commandCategory: "Box chat",
 usages: "[ Trống|Tag ]",
 cooldowns: 5,
 usePrefix: false
};

module.exports.run = async function({ api, event, args, Currencies, Users }) {
 const { threadID, messageID, senderID, mentions } = event;

 if (!args[0]) {
 const money = (await Currencies.getData(senderID)).money;
 const moneyFormatted = money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
 const name = await Users.getNameUser(event.senderID);
 return api.sendMessage(`[ Ví Tiền Mặt ]\n────────────────────\n👤 Name: ${name}\n🎫 Số tiền: ${moneyFormatted}$\n────────────────────\n✏️ Dùng work nếu muốn kiếm thêm thu nhập nhé!`, event.threadID, event.messageID);
 } else if (Object.keys(event.mentions).length == 1) {
 const mention = Object.keys(mentions)[0];
 let money = (await Currencies.getData(mention)).money;
 money = money || 0;
 const moneyFormatted = money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
 return api.sendMessage({ body: `[ Ví Tiền Mặt ]\n────────────────────\n👤 Name: ${mentions[mention].replace(/\@/g, "")}\n🎫 Số tiền: ${moneyFormatted}$\n────────────────────\n✏️ Dùng work nếu muốn kiếm thêm thu nhập nhé!`, mentions: [{ tag: mentions[mention].replace(/\@/g, ""), id: mention }] }, threadID, messageID);
 } else {
 return global.utils.throwError(this.config.name, threadID, messageID);
 }
};