module.exports.config = {
  name: "anti",
  version: "4.1.5",
  hasPermssion: 1,
  credits: "BraSL",
  description: "Anti change group vip pro",
  commandCategory: "Box chat",
  usages: "anti dùng để bật tắt",
  cooldowns: 5,
  dependencies: {
    "fs-extra": "",
  },
};

const {
  readdirSync,
  readFileSync,
  writeFileSync,
  existsSync,
  unlinkSync,
} = require("fs-extra");
const axios = require('axios');

module.exports.handleReply = async function ({
  api,
  event,
  args,
  handleReply,
}) {
  const { senderID, threadID, messageID, messageReply } = event;
  const { author, permssion } = handleReply;
  const Tm = (require('moment-timezone')).tz('Asia/Ho_Chi_Minh').format('HH:mm:ss || DD/MM/YYYY');
  const pathData = global.anti;
  const dataAnti = JSON.parse(readFileSync(pathData, "utf8"));

  if(author !== senderID ) return api.sendMessage(`❎ Bạn không phải người dùng lệnh`,threadID)

var number = event.args.filter(i=> !isNaN(i))
 for (const num of number){
  switch (num) {
    case "1": {
      //---> CODE ADMIN ONLY<---//
      if (permssion < 1)
        return api.sendMessage(
          "⚠️ Bạn không đủ quyền hạn để sử dụng lệnh này",
          threadID,
          messageID
        );
      var NameBox = dataAnti.boxname;
      const antiImage = NameBox.find(
        (item) => item.threadID === threadID
      );
      if (antiImage) {
        dataAnti.boxname = dataAnti.boxname.filter((item) => item.threadID !== threadID);
        api.sendMessage(
          "☑️ Tắt thành công chế độ anti đổi tên box ",
          threadID,
          messageID
        );
      } else {
        var threadName = (await api.getThreadInfo(event.threadID)).threadName;
        dataAnti.boxname.push({
          threadID,
          name: threadName
        })
        api.sendMessage(
          "☑️ Bật thành công chế độ anti đổi tên box",
          threadID,
          messageID
        );
      }
      writeFileSync(pathData, JSON.stringify(dataAnti, null, 4));
      break;
    }
    case "2": {
      if (permssion < 1)
        return api.sendMessage(
          "⚠️ Bạn không đủ quyền hạn để sử dụng lệnh này",
          threadID,
          messageID
        );
      const antiImage = dataAnti.boximage.find(
        (item) => item.threadID === threadID
      );
      if (antiImage) {
        dataAnti.boximage = dataAnti.boximage.filter((item) => item.threadID !== threadID);
        api.sendMessage(
          "☑️ Tắt thành công chế độ anti đổi ảnh box",
          threadID,
          messageID
        );
      } else {
        var threadInfo = await api.getThreadInfo(event.threadID);
        var img = global.utils.imgur(threadInfo.imageSrc, 'jpg');
        dataAnti.boximage.push({
          threadID,
          url: img,
        });
        api.sendMessage(
          "☑️ Bật thành công chế độ anti đổi ảnh box",
          threadID,
          messageID
        );
      }
      writeFileSync(pathData, JSON.stringify(dataAnti, null, 4));
      break;
    }
    case "3": {
      if (permssion < 1)
        return api.sendMessage(
          "⚠️ Bạn không đủ quyền hạn để sử dụng lệnh này",
          threadID,
          messageID
        );
      const NickName = dataAnti.antiNickname.find(
        (item) => item.threadID === threadID
      );

      if (NickName) {
        dataAnti.antiNickname = dataAnti.antiNickname.filter((item) => item.threadID !== threadID);
        api.sendMessage(
          "☑️ Tắt thành công chế độ anti đổi biệt danh",
          threadID,
          messageID
        );
      } else {
        const nickName = (await api.getThreadInfo(event.threadID)).nicknames
        dataAnti.antiNickname.push({
          threadID,
          data: nickName
        });
        api.sendMessage(
          "☑️ Bật thành công chế độ anti đổi biệt danh",
          threadID,
          messageID
        );
      }
      writeFileSync(pathData, JSON.stringify(dataAnti, null, 4));
      break;
    }
    case "4": {
      if (permssion < 1)
        return api.sendMessage(
          "⚠️ Bạn không đủ quyền hạn để sử dụng lệnh này",
          threadID,
          messageID
        );
      const antiout = dataAnti.antiout;
      if (antiout[threadID] == true) {
        antiout[threadID] = false;
        api.sendMessage(
          "☑️ Tắt thành công chế độ anti out",
          threadID,
          messageID
        );
      } else {
        antiout[threadID] = true;
        api.sendMessage(
          "☑️ Bật thành công chế độ anti out",
          threadID,
          messageID
        );
      }
      writeFileSync(pathData, JSON.stringify(dataAnti, null, 4));
      break;
    }
    case "5": {
      const antiImage = dataAnti.boximage.find(
        (item) => item.threadID === threadID
      );
      const antiBoxname = dataAnti.boxname.find(
        (item) => item.threadID === threadID
      );
      const antiNickname = dataAnti.antiNickname.find(
        (item) => item.threadID === threadID
      );
      return api.sendMessage(
        `[ Check Anti Group ]\n───────────────\n|› 1. anti namebox: ${antiBoxname ? "bật" : "tắt"}\n|›⁠ 2. anti imagebox: ${antiImage ? "bật" : "tắt" }\n|›⁠ 3. anti nickname: ${antiNickname ? "bật" : "tắt"}\n|› 4. anti out: ${dataAnti.antiout[threadID] ? "bật" : "tắt"}\n───────────────\n|› Trên kia là các trạng thái của từng anti`,
        threadID
      );
      break;
    }

    default: {
      return api.sendMessage(
        `❎ Số bạn chọn không có trong lệnh`,
        threadID
        );
      }
    }
  }
};

module.exports.run = async ({ api, event, args, permssion, Threads }) => {
  const { threadID, messageID, senderID } = event;
  const Tm = (require('moment-timezone')).tz('Asia/Ho_Chi_Minh').format('HH:mm:ss || DD/MM/YYYY');
  const threadSetting = (await Threads.getData(String(threadID))).data || {};
  const prefix = threadSetting.hasOwnProperty("PREFIX")
    ? threadSetting.PREFIX
    : global.config.PREFIX;

  return api.sendMessage(`[ Anti Change Group ]\n───────────────\n|› 1. anti namebox - cấm đổi tên nhóm\n|› 2. anti boximage - cấm đổi ảnh nhóm\n|› 3. anti nickname - cấm đổi biệt danh người dùng\n|› 4. anti out - cấm thành viên tự ý rời nhóm\n|› 5. check trạng thái anti của nhóm\n\n📌 Reply (phản hồi) theo stt để chọn chế độ mà bạn muốn thay đổi trạng thái`,
        threadID, (error, info) => {
            if (error) {
              return api.sendMessage("❎ Đã xảy ra lỗi!", threadID);
            } else {
              global.client.handleReply.push({
                name: this.config.name,
                messageID: info.messageID,
                author: senderID,
                permssion
          });
       }
   }, messageID);
};