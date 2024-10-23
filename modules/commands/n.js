module.exports.config = {
  name: "-",
  version: "3.0.0",
  hasPermssion: 0,
  credits: "Vtuan",
  description: "sailenh",
  commandCategory: "Hệ thống",
  usages: "Công cụ",
  cooldowns: 0,
  images: [],
  usePrefix: false,
};

module.exports.run = async ({ api, event }) => {
  const axios = require('axios');
  const fs = require("fs");
  const moment = require("moment-timezone");

  const timeStart = Date.now();
  const uptime = process.uptime();
  const uptimeHours = Math.floor(uptime / (60 * 60));
  const uptimeMinutes = Math.floor((uptime % (60 * 60)) / 60);
  const uptimeSeconds = Math.floor(uptime % 60);
  const gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss || D/MM/YYYY");
  const { threadID, messageID } = event;
  const PREFIX = global.config.PREFIX;
  
  const video = require('./../../data_api/datajson/vdgai.json');
  const randomVideo = video[Math.floor(Math.random() * video.length)].trim();
  const filePath = __dirname + `/cache/2.mp4`;

  async function downloadImage(image, fileName) {
    const response = await axios({
      url: image,
      method: 'GET',
      responseType: 'stream',
    });
   
    await new Promise((resolve, reject) => {
      const writeStream = fs.createWriteStream(fileName);
      response.data.pipe(writeStream);
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
    });
    
    return fileName;
  }

  try {
    const [downloadedFileName] = await Promise.all([
      downloadImage(randomVideo, filePath)
    ]);

    api.sendMessage({
      body: `『  Chưa Nhập Tên Lệnh 』\n               ${uptimeHours.toString().padStart(2, '0')} : ${uptimeMinutes.toString().padStart(2, '0')} : ${uptimeSeconds.toString().padStart(2, '0')}`,
      attachment: fs.createReadStream(downloadedFileName)
    }, threadID, () => {
      fs.unlinkSync(downloadedFileName);
    }, messageID);
  } catch (error) {
    console.error("Error:", error);
  }
}