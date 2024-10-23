const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs-extra');
const moment = require('moment-timezone');

async function scldown(url) {
    try {
        const response = await axios.post("https://www.klickaud.co/download.php", new URLSearchParams(Object.entries({
            'value': url,
            'afae4540b697beca72538dccafd46ea2ce84bec29b359a83751f62fc662d908a': '2106439ef3318091a603bfb1623e0774a6db38ca6579dae63bcbb57253d2199e'
        })), {
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                "user-agent": "RizFurr UwU"
            }
        });

        const $ = cheerio.load(response.data);
        const title = $('#header > div > div > div.col-lg-8 > div > table > tbody > tr > td:nth-child(2)').text();
        const link = $('#dlMP3').attr('onclick').split(`downloadFile('`)[1].split(`',`)[0];

        const result = {
                title: title,
                link: link
        };

        return result;
    } catch (error) {
        throw error;
    }
}

module.exports.config = {
  name: 'scl',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'DongDev',
  description: 'Tìm kiếm nhạc trên SoundCloud',
  commandCategory: 'Tiện ích',
  usages: '[]',
  cooldowns: 5,
  images: [],
};

module.exports.run = async function ({ api, event, args }) {
  const query = args.join(" ").trim();
  const { threadID, messageID } = event;
  const linkURL = `https://soundcloud.com`;
  const headers = {
    Accept: "application/json",
    "Accept-Language": "en-US,en;q=0.9,vi;q=0.8",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36",
  };

  if (!query) {
    api.sendMessage("⚠️ Vui lòng nhập từ khóa tìm kiếm", threadID, messageID);
    return;
  }

  try {
    const response = await axios.get(`https://m.soundcloud.com/search?q=${encodeURIComponent(query)}`, {
      headers
    });
    const htmlContent = response.data;

    const $ = cheerio.load(htmlContent);
    const dataaa = [];

    $("div > ul > li > div").each(function (index, element) {
      if (index < 8) {
        const title = $(element).find("a").attr("aria-label")?.trim() || "";
        const url = linkURL + ($(element).find("a").attr("href") || "").trim();
        const thumb = $(element).find("a > div > div > div > picture > img").attr("src")?.trim() || "";
        const artist = $(element).find("a > div > div > div").eq(1).text()?.trim() || "";
        const views = $(element).find("a > div > div > div > div > div").eq(0).text()?.trim() || "";
        const timestamp = $(element).find("a > div > div > div > div > div").eq(1).text()?.trim() || "";
        const release = $(element).find("a > div > div > div > div > div").eq(2).text()?.trim() || "";

        dataaa.push({
          title,
          url,
          thumb,
          artist,
          views,
          release,
          timestamp,
        });
      }
    });

    if (dataaa.length === 0) {
      api.sendMessage(`❎ Không tìm thấy kết quả cho từ khóa "${query}"`, threadID, messageID);
      return;
    }

    const messages = dataaa.map((item, index) => {
      return `\n${index + 1}. 👤 Tên: ${item.artist}\n📝 Tiêu đề: ${item.title}\n⏳ Thời lượng: ${item.timestamp} giây`;
    });

    const listMessage = `📝 Danh sách tìm kiếm của từ khóa: ${query}\n${messages.join("\n")}\n\n📌 Reply (phản hồi) theo STT tương ứng để tải nhạc`;

    api.sendMessage(listMessage, event.threadID, (error, info) => {
      global.client.handleReply.push({
        type: "choosee",
        name: this.config.name,
        author: info.senderID,
        messageID: info.messageID,
        dataaa: dataaa,
      });
    });
  } catch (error) {
    console.error("❎ Lỗi trong quá trình tìm kiếm:", error);
    api.sendMessage(`❎ Đã xảy ra lỗi trong quá trình tìm kiếm`, threadID, messageID);
  }
};

module.exports.handleReply = async function ({ event, api, handleReply, args }) {
  const { threadID: tid, messageID: mid, body } = event;

  switch (handleReply.type) {
    case 'choosee':
      const choose = parseInt(body);
      api.unsendMessage(handleReply.messageID);

      if (isNaN(choose)) {
        return api.sendMessage('⚠️ Vui lòng nhập 1 con số', tid, mid);
      }

      if (choose > 5 || choose < 1) {
        return api.sendMessage('❎ Lựa chọn không nằm trong danh sách', tid, mid);
      }
      let streamURL = (url, ext = 'jpg') => require('axios').get(url, { responseType: 'stream', }).then(res => (res.data.path = `tmp.${ext}`, res.data)).catch(e => null);
      const chosenItem = handleReply.dataaa[choose - 1];
      const url = chosenItem.url;
      const result = await scldown(url);
        api.sendMessage({
          body: `[ SOUNDCLOUD - MP3 ]\n───────────────\n[👤] → Tên: ${chosenItem.artist}\n[📝] → Tiêu đề: ${chosenItem.title}\n[⏳] → Thời lượng: ${chosenItem.timestamp} giây\n[🔈] → Lượt phát: ${chosenItem.views}\n[🗓️] → Tải tên: ${chosenItem.release}\n───────────────\n[⏰] → Time: ${moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:ss")}`, attachment: await streamURL(result.link, 'mp3')}, tid);
      break;
    default:
  }
};