module.exports.config = {
 name: 'timejoin',
 version: '1.0.0',
 hasPermission: 0,
 credits: 'Nam',
 description: 'Xem thời gian ở box',
 commandCategory: 'Tiện ích',
 usages: '',
 cooldowns: 5,
};

const fs = require('fs');
const moment = require('moment-timezone');
const filePath = __dirname + '/data/timeJoin.json';

module.exports.onLoad = function () {
 // Tạo file nếu không tồn tại
 if (!fs.existsSync(filePath)) {
 fs.writeFileSync(filePath, '{}', 'utf8');
 }
};

module.exports.handleEvent = async function ({ event: e }) {
 const { threadID: t, senderID: u } = e,
 { readFileSync: r, writeFileSync: w } = fs,
 { parse: o, stringify: s } = JSON;

 const getTime = moment.tz('Asia/Ho_Chi_Minh');
 const gio = getTime.format('HH:mm:ss');
 const ngay = getTime.format('YYYY-MM-D');
 const burh = getTime.format('D/MM/YYYY');

 let data = o(r(filePath, 'utf8'));

 if (!data[u + t]) {
 data[u + t] = {
 uid: u,
 gio: gio,
 ngay: ngay,
 burh: burh,
 };
 w(filePath, s(data, null, 2), 'utf8');
 }
};

module.exports.run = async function ({
 api: a,
 event: e,
 args: g,
 Users: u,
 Threads: d,
}) {
 const { threadID: t, messageID: m, senderID: s } = e,
 c = this.config.credits,
 { readFileSync: f, existsSync: x } = fs,
 { parse: o } = JSON;

 if (!x(filePath)) {
 return a.sendMessage(`Chưa có dữ liệu thời gian người dùng tham gia.`, t, m);
 }

 let storedData = o(f(filePath, 'utf8')),
 userJoinDate = moment(`${storedData[s + t].ngay} ${storedData[s + t].gio}`, 'YYYY-MM-D HH:mm:ss').tz('Asia/Ho_Chi_Minh'),
 currentDate = moment().tz('Asia/Ho_Chi_Minh'),
 daysSinceJoin = currentDate.diff(userJoinDate, 'days');

 if (daysSinceJoin < 1) {
 return a.sendMessage(`Chỉ bắt đầu tính sau 1 ngày khi bạn tham gia nhóm`, t, m);
 }

 a.sendMessage(`━━━━━━━━━━━━━\n== [ ${t} ] ==\n\n𝗕𝗮̣𝗻 𝘁𝗵𝗮𝗺 𝗴𝗶𝗮 𝗻𝗵𝗼́𝗺 𝘃𝗮̀𝗼 𝗹𝘂́𝗰:\n\n[ ${
 storedData[s + t].gio
 } ] 𝗻𝗴𝗮̀𝘆 [ ${
 storedData[s + t].burh
 } ]\n\n━━━━━━━━━━━━━\n\n𝗦𝗼̂́ 𝗻𝗴𝗮̀𝘆 𝗼̛̉ 𝗯𝗼𝘅: ${daysSinceJoin} ngày`, t, m);
};