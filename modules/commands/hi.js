const fs = require("fs");
const axios = require("axios");
const moment = require("moment-timezone");
const path = require("path");

const KEY = [
 "hello", "hi", "hai", "chào mn", "hi mk tvm", "hi mình tvm", "chào", "chao", "hí", "híí", "hì", "hìì", "lô", "hii", "helo", "hê nhô"
];

let filePath;

module.exports.config = {
 name: "hi",
 version: "1.0.0",
 hasPermssion: 1,
 credits: "DongDev",
 description: "hi chào tv",
 commandCategory: "Hệ thống",
 usages: "[text]",
 cooldowns: 0,
 images: [],
};

module.exports.onLoad = () => {
 filePath = path.join(__dirname, "data", "hi.json");
 if (!fs.existsSync(filePath)) {
 fs.writeFileSync(filePath, "{}");
 }
};

module.exports.handleEvent = async function({ event, api, Users }) {
 let { threadID, messageID } = event;

 const jsonData = fs.readFileSync(filePath, "utf-8");
 const savedData = JSON.parse(jsonData);

 if (typeof savedData[threadID]?.hi === "undefined" || savedData[threadID].hi === true) {
 if (event.body && KEY.includes(event.body.toLowerCase())) {
 let hours = moment.tz('Asia/Ho_Chi_Minh').format('HHmm');
 let data2 = ["tốt lành", "vui vẻ"];
 let text = data2[Math.floor(Math.random() * data2.length)];

 let session = (hours > 0001 && hours <= 400 ? "sáng tinh mơ" :
 hours > 401 && hours <= 700 ? "sáng sớm" :
 hours > 701 && hours <= 1000 ? "sáng" :
 hours > 1001 && hours <= 1200 ? "trưa" :
 hours > 1201 && hours <= 1700 ? "chiều" :
 hours > 1701 && hours <= 1800 ? "chiều tà" :
 hours > 1801 && hours <= 2100 ? "tối" :
 hours > 2101 && hours <= 2400 ? "tối muộn" :
 "lỗi");

 let name = await Users.getNameUser(event.senderID);
 let mentions = [{ tag: name, id: event.senderID }];

 let msg = {
 body: `➩ Xin chào ${name}\n➩ Chúc bạn một buổi ${session} ${text} ❤️\n➩ Bây giờ là : ${moment().tz("Asia/Ho_Chi_Minh").format("HH:mm:ss || DD/MM/YYYY")}`, mentions,
 };

 api.sendMessage(msg, threadID, messageID);

 savedData[threadID] = { hi: true };
 fs.writeFileSync(filePath, JSON.stringify(savedData));
 }
 }
};

module.exports.run = async ({ event, api }) => {
 let { threadID, messageID } = event;

 const jsonData = fs.readFileSync(filePath, "utf-8");
 const savedData = JSON.parse(jsonData);

 if (typeof savedData[threadID]?.hi === "undefined" || savedData[threadID].hi === true) {
 savedData[threadID] = { hi: false };
 fs.writeFileSync(filePath, JSON.stringify(savedData));

 api.sendMessage(`☑️ Tắt hi thành công!`, threadID, messageID);
 } else {
 savedData[threadID] = { hi: true };
 fs.writeFileSync(filePath, JSON.stringify(savedData));

 api.sendMessage(`☑️ Bật hi thành công!`, threadID, messageID);
 }
};