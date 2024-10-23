const imgur = require("imgur");
const fs = require("fs");
const axios = require("axios");
const moment = require("moment-timezone");
const { downloadFile } = require("../../utils/index");

module.exports.config = {
 name: "4k",
 version: "1.0.0",
 hasPermssion: 0,
 credits: "DongDev",
 description: "Tăng độ phân giải hình ảnh lên 4K",
 commandCategory: "Tiện ích",
 usages: "[reply]",
 cooldowns: 0,
 images: [
 "https://files.catbox.moe/cbkjr1.jpeg",
 "https://files.catbox.moe/5dmlyd.jpeg"
 ],
};

module.exports.run = async ({ api, event, Users }) => {
 const { threadID, type, messageReply, messageID } = event;
 let name = await Users.getNameUser(event.senderID);
 
 const ClientID = "771631e18e73452";
 const upscaleAPI = "http://server.gamehosting.vn:25755/taoanhdep/lamnetanh";

 if (type !== "message_reply") {
 return api.sendMessage("⚠️ Bạn phải reply một hình ảnh nào đó", threadID, messageID);
 }

 if (messageReply.attachments.length !== 1) {
 return api.sendMessage("⚠️ Bạn chỉ có thể xử lý mỗi hình ảnh một lần", threadID, messageID);
 }

 imgur.setClientId(ClientID);

 const startTime = Date.now();
 const initialMessage = `⏱️ | Tiến hành tăng độ phân giải, vui lòng chờ...`;
 api.sendMessage(initialMessage, threadID, messageID);

 const attachment = messageReply.attachments[0];
 const pathSave = __dirname + `/cache/${startTime}.jpg`;
 const url = attachment.url;
 let processingTime = 0;

 await downloadFile(url, pathSave);

 const uploadStartTime = Date.now();
 const uploadPromise = imgur.uploadFile(pathSave);
 const getLink = await uploadPromise;
 const uploadEndTime = Date.now();

 fs.unlinkSync(pathSave);

 processingTime = ((uploadEndTime - startTime) / 1000).toFixed(2);

 const upscaleRes = (await axios({ url: (await axios(`${upscaleAPI}?url=${getLink.link}`)).data.data,
 method: "GET",
 responseType: "stream" })).data;

 processingTime = parseFloat(processingTime).toFixed(2);

 api.sendMessage({ 
 body: `✅ Xử lý ảnh thành công\n👤 Người yêu cầu: ${name}\n⌛ Thời gian xử lý: ${processingTime} giây\n───────────────\n⏰ Time: ${moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss || DD/MM/YYYY")}`, 
 attachment: upscaleRes 
 }, threadID);
};