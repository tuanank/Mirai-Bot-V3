const sim = require('./../../data_api/sim.js');

module.exports.config = {
  name: "sim",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "DongDev",
  description: "Chat cùng con simsimi dễ thương nhất",
  commandCategory: "Game",
  usages: "[args]",
  cooldowns: 2,
  images: [],
  dependencies: {
    axios: ""
  },
};

async function simsimi(a, api, event) {
  const axios = require("axios");
  const g = (a) => a;

  try {
    const type = 'ask';
    const data = g(a);
    return sim.simi(type, data);
  } catch (p) {
    return { error: true, res: {} };
  }
}

module.exports.onLoad = async function () {
  if (typeof global.DongDev === 'undefined') global.DongDev = {};
  if (typeof global.DongDev.simsimi === 'undefined') global.DongDev.simsimi = new Map();
};

module.exports.handleEvent = async function ({ api, event }) {
  const { threadID, messageID, senderID, body } = event;
  const g = (senderID) => api.sendMessage(senderID, threadID, messageID);

  if (global.DongDev.simsimi.has(threadID)) {
    if (senderID === api.getCurrentUserID() || body === "" || messageID === global.DongDev.simsimi.get(threadID)) return;

    const sp = await simsimi(body, api, event);

    if (!sp) return;

    if (!sp.answer) g(sp.error);
    else g(sp.answer);
  }
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;
  const body = (args) => api.sendMessage(args, threadID, messageID);

  if (args.length === 0) return body("❎ Bạn chưa nhập tin nhắn");

  switch (args[0]) {
    case "on":
      if (global.DongDev.simsimi.has(threadID)) return body("🐥 Bật gì tận 2 lần hả em");
      else {
        global.DongDev.simsimi.set(threadID, messageID);
        return body("☑️ Bật sim thành công");
      }
    case "off":
      if (global.DongDev.simsimi.has(threadID)) {
        global.DongDev.simsimi.delete(threadID);
        return body("☑️ Tắt sim thành công");
      } else return body("😡 Tao đang phấn khởi tắt cái qq");
    default:
      const sp = await simsimi(args.join(" "), api, event);

      if (!sp) return;

      if (!sp.answer) body(sp.error);
      else body(sp.answer);
  }
};