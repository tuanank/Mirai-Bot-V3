module.exports.config = {
 name: "masoi",
 version: "1.0.0",
 hasPermssion: 0,
 credits: "D-Jukie convert Kb2aBot",
 description: "Một chiếc ma sói trên mirai",
 commandCategory: "Game",
 usages: "masoi + số làng",
 cooldowns: 0
};

module.exports.onLoad = async () => {
 try {
 const GameManager = require('./masoi/GameManager');
 const loader = () => {
 const exportData = {
 masoi: require('./masoi/index')
 };
 return exportData;
 };
 const gameManager = new GameManager(loader());
 global.gameManager = gameManager;
 } catch (e) {
 console.error(e);
 }
};

module.exports.handleEvent = async function ({ api, event }) {
 const reply = (message) => api.sendMessage(message, event.threadID, event.messageID);

 // Kiểm tra xem có phải là lệnh và bot có nên phản hồi không
 if (event.type !== "message" || event.isGroup || !event.body.startsWith("masoi")) {
 return;
 }

 if (!global.gameManager || !global.gameManager.items.some(i => i.name === "Ma Sói")) {
 return;
 }

 for (const game of global.gameManager.items) {
 if (!game.participants) continue;
 if ((game.participants.includes(event.senderID) && !event.isGroup) || game.threadID === event.threadID) {
 game.onMessage(event, reply);
 break; // Thoát khỏi vòng lặp sau khi thực hiện lệnh một lần
 }
 }
};

module.exports.run = async ({ event, args, Users }) => {
 global.Users = Users;
 global.gameManager.run(this.config.name, {
 masterID: event.senderID,
 threadID: event.threadID,
 param: args,
 isGroup: event.isGroup
 });
};