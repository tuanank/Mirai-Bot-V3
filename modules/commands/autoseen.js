const fs = require('fs-extra');
const path = require('path');

const pathFile = path.join(__dirname, 'data', 'autoseen.txt');

if (!fs.existsSync(pathFile)) {
  fs.writeFileSync(pathFile, 'false');
}

module.exports.config = {
  name: 'autoseen',
  version: '1.0.0',
  hasPermssion: 3,
  credits: 'NT-Khang',
  description: 'Bật/tắt tự động seen khi có tin nhắn mới',
  commandCategory: 'Admin',
  usages: 'on/off',
  cooldowns: 5,
};

module.exports.handleEvent = async ({ api }) => {
  const isEnable = fs.readFileSync(pathFile, 'utf-8');
  if (isEnable === 'true') {
    api.markAsReadAll(() => {});
  }
};

module.exports.run = async ({ api, event, args }) => {
  try {
    if (args && args[0]) {
      if (args[0] === 'on' || args[0] === 'off') {
        fs.writeFileSync(pathFile, args[0]);
        api.sendMessage(`☑️ Đã ${args[0] === 'on' ? 'bật' : 'tắt'} autoseen khi có tin nhắn mới`, event.threadID, event.messageID);
      } else {
        api.sendMessage('⚠️ Vui lòng chọn: on hoặc off', event.threadID, event.messageID);
      }
    } else {
      api.sendMessage('⚠️ Vui lòng chọn: on hoặc off', event.threadID, event.messageID);
    }
  } catch (e) {
    console.error(e);
  }
};