const moment = require('moment-timezone');
const axios = require('axios');

module.exports.config = {
 name: 'autosend',
 version: '10.02',
 hasPermssion: 3,
 credits: 'DongDev',
 description: 'Tự động gửi tin nhắn theo giờ đã cài!',
 commandCategory: 'Hệ thống',
 usages: '[]',
 cooldowns: 3,
 images: [],
};

const weather = require('weather-js');
const findWeather = (city, degreeType = 'C') => {
 return new Promise((resolve, reject) => {
 weather.find({ search: city, degreeType }, (err, result) => {
 if (err) {
 reject(err);
 } else {
 resolve(result);
 }
 });
 });
};

const nam = [
 {
 timer: '04:00:00',
 message: ['\n{thoitiet}']
 },
 {
 timer: '06:00:00',
 message: ['Chúc mọi người buổi sáng vui vẻ 😉', 'Chúc mn buổi sáng vv ❤️', 'Buổi sáng đầy năng lượng nha các bạn 😙']
 },
 {
 timer: '10:00:00',
 message: ['Nấu cơm nhớ bật nút nha mọi người 😙']
 },
 {
 timer: '11:00:00',
 message: ['Cả sáng mệt mỏi rùi, nghỉ ngơi nạp năng lượng nào!! 😴']
 },
 {
 timer: '12:00:00',
 message: ['Chúc mọi người buổi trưa vui vẻ 😋', 'Chúc mọi người bữa trưa ngon miệng 😋']
 },
 {
 timer: '13:00:00',
 message: ['Chúc mọi người buổi chiều đầy năng lượng 😼', 'Chúc mọi người buổi chiều vui vẻ 🙌']
 },
 {
 timer: '17:00:00',
 message: ['Hihi chuẩn bị nấu cơm thui nào 😋']
 },
 {
 timer: '00:30:00',
 message: ['Chúc mọi người ngủ ngon 😴', 'Khuya rùi ngủ ngon nhé các bạn 😇']
 }
];

module.exports.onLoad = o => setInterval(async () => {
 const r = a => a[Math.floor(Math.random() * a.length)];
 const currentTime = moment().tz('Asia/Ho_Chi_Minh').format('HH:mm:ss');

 if (á = nam.find(i => i.timer === currentTime)) {
 const gio = moment().tz('Asia/Ho_Chi_Minh').format('HH:mm:ss || DD/MM/YYYY');

var msg = r(á.message);
var tinh = [
"Hà Nội", "Hồ Chí Minh", "Đà Nẵng", "Hải Phòng", "Cần Thơ", "Hải Dương", "Bắc Ninh",
"Quảng Ninh", "Thái Bình", "Nam Định", "Ninh Bình", "Thái Nguyên", "Phú Thọ", "Vĩnh Phúc",
"Bắc Giang", "Lạng Sơn", "Quảng Bình", "Quảng Trị", "Thừa Thiên Huế", "Quảng Nam", "Quảng Ngãi",
"Bình Định", "Phú Yên", "Khánh Hòa", "Ninh Thuận", "Bình Thuận", "Kon Tum", "Gia Lai", "Đắk Lắk",
"Đắk Nông", "Lâm Đồng", "Bình Phước", "Tây Ninh", "Bình Dương", "Đồng Nai", "Long An", "Đồng Tháp",
"Tiền Giang", "An Giang", "Bà Rịa - Vũng Tàu", "Bến Tre", "Bạc Liêu", "Cà Mau", "Hậu Giang",
"Kiên Giang", "Sóc Trăng", "Trà Vinh", "Vĩnh Long", "Thanh Hóa"
];
const city = tinh[Math.floor(Math.random() * tinh.length)];
 const result = await findWeather(city);
 var currentDay = result[0].current.day.replace(/Friday/g, "Thứ 6").replace(/Saturday/g, "Thứ 7").replace(/Sunday/g, "Chủ nhật").replace(/Monday/g, "Thứ 2").replace(/Tuesday/g, "Thứ 3").replace(/Wednesday/g, "Thứ 4").replace(/Thursday/g, "Thứ 5");
 var date = result[0].current.date;
 var dateFormat = `Ngày ${date.split("-")[2]}-${date.split("-")[1]}-${date.split("-")[0]}`;
 var skytext = result[0].current.skytext.toString()
 "Cloudy" == skytext ? skytext = "Mây" : "Sunny" == skytext ? skytext = "Nắng" : "Partly Cloudy" == skytext ? skytext = "Mây một phần" : "Mostly Cloudy" == skytext ? skytext = "Mây rất nhiều" : "Rain" == skytext ? skytext = "Mưa" : "Thunderstorm" == skytext ? skytext = "Bão" : "Snow" == skytext ? skytext = "Tuyết" : "Fog" == skytext || "Haze" == skytext ? skytext = "Sương mù" : "Clear" == skytext ? skytext = "Trời trong" : "Light Rain" == skytext ? skytext = "Mưa nhẹ" : "Mostly Clear" == skytext && (skytext = "Trời trong rất nhiều");
 var winddisplay = result[0].current.winddisplay.toString().split(" ")[2];
 "Northeast" == winddisplay && (winddisplay = "Hướng Đông Bắc"), "Northwest" == winddisplay && (winddisplay = "Hướng Tây Bắc"), "Southeast" == winddisplay && (winddisplay = "Hướng Đông Nam"), "Southwest" == winddisplay && (winddisplay = "Hướng Tây Nam"), "East" == winddisplay && (winddisplay = "Hướng Đông"), "West" == winddisplay && (winddisplay = "Hướng Tây"), "North" == winddisplay && (winddisplay = "Hướng Bắc"), "South" == winddisplay && (winddisplay = "Hướng Nam");
 var thoitiet = `(~~[ ${gio} ]~~)\n───────────────\n[🗺️] →⁠ Cập nhật thời tiết tại: ${result[0].location.name}\n[🌡] →⁠ Nhiệt độ: ${result[0].current.temperature}°${result[0].location.degreetype}\n[✏️] →⁠ Mô tả: ${skytext}\n[♒] →⁠ Độ ẩm: ${result[0].current.humidity}%\n[💨] →⁠ Hướng gió: ${result[0].current.windspeed} ${winddisplay}\n[⏰] →⁠ Ghi nhận vào: ${result[0].current.observationtime}\n[🗺️] →⁠ Từ trạm ${result[0].current.observationpoint}\n───────────────\n🔄 Đây Là Tin Nhắn Tự Động`;
 
 msg = msg.replace(/{thoitiet}/, thoitiet);

 msg = {
 body: msg,
 };

 global.data.allThreadID.forEach(i => o.api.sendMessage(msg, i));
 }
}, 1000);

module.exports.run = () => {};