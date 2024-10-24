module.exports.config = {
  name: "duyetbox",
  version: "1.0.2",
  hasPermssion: 2,
  credits: "DungUwU mod by Nam",
  description: "duyệt box dùng bot xD",
  commandCategory: "Admin",
  cooldowns: 5,
  usePrefix: false
};


const dataPath = __dirname + "/data/approvedThreads.json";
const dataPending = __dirname + "/data/pendingdThreads.json";
const fs = require("fs");

module.exports.onLoad = () => {
  if (!fs.existsSync(dataPath)) fs.writeFileSync(dataPath, JSON.stringify([]));
  if (!fs.existsSync(dataPending)) fs.writeFileSync(dataPending, JSON.stringify([]));
}
module.exports.handleReply = async function ({ event, api, Currencies, handleReply, Users, args }) {
    if (handleReply.author != event.senderID) return;
    const { body, threadID, messageID, senderID } = event;
    const { type } = handleReply;
    let data = JSON.parse(fs.readFileSync(dataPath));
    let dataP = JSON.parse(fs.readFileSync(dataPending));
    let idBox = (args[0]) ? args[0] : threadID;
  switch (type) {
        case "pending": {
          switch (body) {
                case `A`: {
        data.push(idBox);
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
        api.sendMessage(`» Phê duyệt thành công box:\n${idBox}`, threadID, () => {
          dataP.splice(dataP.indexOf(idBox), 1);
        fs.writeFileSync(dataPending, JSON.stringify(dataP, null, 2));
      }, messageID)
        }
        }
      }
    }
  }
module.exports.run = async  ({ event, api, args, Threads, Users, handleReply  }) => {
  const { threadID, messageID, senderID } = event;
  let data = JSON.parse(fs.readFileSync(dataPath));
  let dataP = JSON.parse(fs.readFileSync(dataPending));
  let msg = "";
  var lydo = args.splice(2).join(" ");
  let idBox = (args[0]) ? args[0] : threadID;
        if (args[0] == "list" || args[0] == "l") {
    msg = "[ 𝗠𝗢𝗗𝗘 ] - 𝗗𝗮𝗻𝗵 𝘀𝗮́𝗰𝗵 𝗰𝗮́𝗰 𝗻𝗵𝗼́𝗺 đ𝗮̃ 𝗱𝘂𝘆𝗲̣̂𝘁\n━━━━━━━━━━━━━━━━━━";
    let count = 0;
    for (e of data) {
       let name = (await api.getThreadInfo(e)).name || "Tên không tồn tại";
      msg += `\n\n(${count += 1}). ${name}\n🔰 𝗜𝗗: ${e}`;
      }
      api.sendMessage(msg, threadID, (error, info) => {
        global.client.handleReply.push({
            name: this.config.name,
            messageID: info.messageID,
            author: event.senderID,
            type: "a",
        })
    }, messageID);
        }
     else if (args[0] == "pending" || args[0] == "p") {
      msg = `=====「 DS BOX CHƯA DUYỆT: ${dataP.length} 」 ====`;
      let count = 0;
      for (e of dataP) {
        let threadInfo = await api.getThreadInfo(e);
          let threadName = threadInfo.threadName ? threadInfo.threadName : await Users.getNameUser(e);
        msg += `\n〘${count+=1}〙» ${threadName}\n${e}`;
      }
      api.sendMessage(msg, threadID, (error, info) => {
        global.client.handleReply.push({
            name: this.config.name,
            messageID: info.messageID,
            author: event.senderID,
            type: "pending",
        })
    }, messageID);
     }
       else if (args[0] == "help" || args[0] == "h") {
         const tst = (await Threads.getData(String(event.threadID))).data || {};
  const pb = (tst.hasOwnProperty("PREFIX")) ? tst.PREFIX : global.config.PREFIX;
  const nmdl = this.config.name
  const cre = this.config.credits
        return api.sendMessage(`=====「 𝗗𝗨𝗬𝗘̣̂𝗧 𝗕𝗢𝗫 」=====\n━━━━━━━━━━━━━━━━━━\n\n${pb}${nmdl} 𝗹/𝗹𝗶𝘀𝘁 => 𝘅𝗲𝗺 𝗱𝗮𝗻𝗵 𝘀𝗮́𝗰𝗵 𝗯𝗼𝘅 đ𝘂̛𝗼̛̣𝗰 𝗱𝘂𝘆𝗲̣̂𝘁 🎀\n\n${pb}${nmdl} 𝗽/𝗽𝗲𝗻𝗱𝗶𝗻𝗴 => 𝘅𝗲𝗺 𝗱𝗮𝗻𝗵 𝘀𝗮́𝗰𝗵 𝗯𝗼𝘅 𝗰𝗵𝘂̛𝗮 𝗱𝘂𝘆𝗲̣̂𝘁 🎀\n\n${pb}${nmdl} 𝗱/𝗱𝗲𝗹 => 𝗸𝗲̀𝗺 𝘁𝗵𝗲𝗼 𝗜𝗗 đ𝗲̂̉ 𝘅𝗼́𝗮 𝗸𝗵𝗼̉𝗶 𝗱𝗮𝗻𝗵 𝘀𝗮́𝗰𝗵 đ𝘂̛𝗼̛̣𝗰 𝗱𝘂̀𝗻𝗴 𝗯𝗼𝘁 🎀\n\n${pb}${nmdl} => 𝗸𝗲̀𝗺 𝘁𝗵𝗲𝗼 𝗜𝗗 đ𝗲̂̉ 𝗱𝘂𝘆𝗲̣̂𝘁 𝗯𝗼𝘅 đ𝗼́ 🎀\n`, threadID, messageID);
       }
    else if (args[0] == "del" || args[0] == "d") {
      let threadInfo = await api.getThreadInfo(event.threadID);
  let threadName = threadInfo.threadName;
      idBox = (args[1]) ? args[1] : event.threadID;
      if (isNaN(parseInt(idBox))) return api.sendMessage("[ 𝗗𝘂𝘆𝗲̣̂𝘁 𝗗𝗲𝗹 ] ➠  Không phải một con số", threadID, messageID);
      if (!data.includes(idBox)) return api.sendMessage("[ 𝗗𝘂𝘆𝗲̣̂𝘁 𝗗𝗲𝗹 ] ➠  Nhóm không được duyệt từ trước", threadID, messageID);

      api.sendMessage(`====『 𝗗𝗨𝗬𝗘𝗧 𝗗𝗘𝗟 』 ====\n━━━━━━━━━━━━━━━━\n[ 👨‍👩‍👧‍👦 ] 𝗻𝗵𝗼́𝗺 ${threadName}\n[🔰] 𝗜𝗗: ${idBox} \n🌟 đ𝗮̃ 𝗯𝗶̣ 𝗴𝗼̛̃ 𝗸𝗵𝗼̉𝗶 𝗱𝗮𝗻𝗵 𝘀𝗮́𝗰𝗵 đ𝘂̛𝗼̛̣𝗰 𝗽𝗵𝗲́𝗽 𝘀𝘂̛̉ 𝗱𝘂̣𝗻𝗴 𝗕𝗼𝘁`, threadID, () => {
        data.splice(data.indexOf(idBox), 1);
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
      }, messageID)
    }
    else if (isNaN(parseInt(idBox))) api.sendMessage("[ 𝗞𝗜𝗘̂̉𝗠 𝗗𝗨𝗬𝗘̣̂𝗧 ]\n[🔰] 𝗜𝗗 𝗯𝗮̣𝗻 𝗻𝗵𝗮̣̂𝗽 𝗸𝗵𝗼̂𝗻𝗴 𝗵𝗼̛̣𝗽 𝗹𝗲̣̂", threadID, messageID);
  else if (data.includes(idBox)) api.sendMessage(`[ 𝗞𝗜𝗘̂̉𝗠 𝗗𝗨𝗬𝗘̣̂𝗧 ]\n[🔰] 𝗜𝗗: ${idBox} đ𝗮̃ đ𝘂̛𝗼̛̣𝗰 𝗽𝗵𝗲̂ 𝗱𝘂𝘆𝗲̣̂𝘁 𝘁𝘂̛̀ 𝘁𝗿𝘂̛𝗼̛́𝗰`, threadID, messageID);
  else api.sendMessage("[ 𝗠𝗢𝗗𝗘 ] ➠ 𝗡𝗵𝗼́𝗺  đ𝗮̃ đ𝘂̛𝗼̛̣𝗰 𝗦𝗨𝗣𝗘𝗥 𝗔𝗗𝗠𝗜𝗡 𝗱𝘂𝘆𝗲̣̂𝘁 đ𝗲̂̉ 𝘀𝘂̛̉ 𝗱𝘂̣𝗻𝗴 💞", idBox, (error, info) => {
    if (error) return api.sendMessage("[ 𝗠𝗢𝗗𝗘 ] ➠ đ𝗮̃ 𝗰𝗼́ 𝗹𝗼̂̃𝗶 𝘅𝗮̉𝘆 𝗿𝗮, đ𝗮̉𝗺 𝗯𝗮̉𝗼 𝗿𝗮̆̀𝗻𝗴 𝗜𝗗 𝗯𝗮̣𝗻 𝗻𝗵𝗮̣̂𝗽 𝗵𝗼̛̣𝗽 𝗹𝗲̣̂ 𝘃𝗮̀ 𝗕𝗼𝘁 đ𝗮𝗻𝗴 𝗼̛̉ 𝘁𝗿𝗼𝗻𝗴 𝗻𝗵𝗼́𝗺", threadID, messageID);
      if (error) return api.sendMessage(`» Đã xảy ra lỗi`, event.threadID, event.messageID)

      else api.changeNickname(`〖 ${global.config.PREFIX} 〗• ${global.config.BOTNAME}`, event.threadID, api.getCurrentUserID())
  const fs = require("fs");
      if (error) return api.sendMessage("[ 𝗠𝗢𝗗𝗘 ] ➠ đ𝗮̃ 𝗰𝗼́ 𝗹𝗼̂̃𝗶 𝘅𝗮̉𝘆 𝗿𝗮, đ𝗮̉𝗺 𝗯𝗮̉𝗼 𝗿𝗮̆̀𝗻𝗴 𝗜𝗗 𝗯𝗮̣𝗻 𝗻𝗵𝗮̣̂𝗽 𝗵𝗼̛̣𝗽 𝗹𝗲̣̂ 𝘃𝗮̀ 𝗕𝗼𝘁 đ𝗮𝗻𝗴 𝗼̛̉ 𝘁𝗿𝗼𝗻𝗴 𝗻𝗵𝗼́𝗺", threadID, messageID);
      else {
        data.push(idBox);
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
        api.sendMessage(`=== [ 𝗗𝘂𝘆𝗲̣̂𝘁 𝗕𝗼𝘅 ] ===
🔰 𝗣𝗵𝗲̂ 𝗱𝘂𝘆𝗲̣̂𝘁 𝘁𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴 𝗻𝗵𝗼́𝗺 𝗰𝗼́ 𝗜𝗗: ${idBox}`, threadID, () => {
          dataP.splice(dataP.indexOf(idBox), 1);
        fs.writeFileSync(dataPending, JSON.stringify(dataP, null, 2));
      }, messageID)
      }
    });
}