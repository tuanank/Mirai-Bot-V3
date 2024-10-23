module.exports.config = {
  name: "console",
  version: "1.1.0",
  hasPermssion: 3,
  credits: "Niiozic",
  description: "Làm cho console đẹp hơn + mod chống spam lag console",
  commandCategory: "Admin",
  usages: "console",
  cooldowns: 30
};

var isConsoleDisabled = false,
  num = 0,
  max = 25,
  timeStamp = 0;
function disableConsole(cooldowns) {
  console.log(`Kích hoạt chế độ chống lag console trong ${cooldowns}s`);
  isConsoleDisabled = true;
  setTimeout(function () {
    isConsoleDisabled = false;
    console.log("Tắt chế độ chống lag");
  }, cooldowns * 1000);
}

module.exports.handleEvent = async function ({
  api,
  args,
  Users,
  event
}) {
  let {
    messageID,
    threadID,
    senderID,
    mentions
  } = event;
  try {
    const dateNow = Date.now();
    const moment = require('moment-timezone');
    if (isConsoleDisabled) {
      return;
    }
    /*const chalk1 = require('chalk');
    const chalk = require('chalkercli');
    var job = ["FF9900", "FFFF33", "33FFFF", "FF99FF", "FF3366", "FFFF66", "FF00FF", "66FF99", "00CCFF", "FF0099", "FF0066", "0033FF", "FF9999", "00FF66", "00FFFF","CCFFFF","8F00FF","FF00CC","FF0000","FF1100","FF3300","FF4400","FF5500","FF6600","FF7700","FF8800","FF9900","FFaa00","FFbb00","FFcc00","FFdd00","FFee00","FFff00","FFee00","FFdd00","FFcc00","FFbb00","FFaa00","FF9900","FF8800","FF7700","FF6600","FF5500","FF4400","FF3300","FF2200","FF1100"];*/
    const l = require("chalk");
    const m = require("moment-timezone");
    var n = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss DD/MM/YYYY");
    const o = global.data.threadData.get(event.threadID) || {};
    if (typeof o.console !== "undefined" && o.console == true) {
      return;
    };
    if (event.senderID == global.data.botID) {
      return;
    };
    num++
    const threadInfo = await api.getThreadInfo(event.threadID);
    var p = threadInfo.threadName || "Nonmae";
    var q = await Users.getNameUser(event.senderID);
    var r = event.body || "Ảnh, video hoặc kí tự đặc biệt";
    console.log(
`${l.hex("#FF66FF")("┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓")}
${l.hex("#CC66FF")(`┣➤ Tên nhóm: ${p}`)}
${l.hex("#9966FF")(`┣➤ ID nhóm: ${event.threadID}`)}
${l.hex("#6666FF")(`┣➤ Tên người dùng: ${q}`)} 
${l.hex("#3366FF")(`┣➤ ID người dùng: ${event.senderID}`)}
${l.hex("#0066FF")(`┣➤ Nội dung: ${r}`)}
${l.hex("#0033FF")(`┣➤ Thời gian: ${n}`)}
${l.hex("#0000FF")("┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛")}`);
    timeStamp = dateNow;
    if(Date.now() - timeStamp > 1000) {
      if(num <= max) num = 0
    }
    if(Date.now() - timeStamp < 1000){
    if(num >= max){
      num = 0
      disableConsole(this.config.cooldowns);
    }
  }
} catch (e) {
    console.log(e);
  }
};

module.exports.run = async function ({
  api: a,
  args: b,
  Users: c,
  event: d,
  Threads: e,
  utils: f,
  client: g
}) {};