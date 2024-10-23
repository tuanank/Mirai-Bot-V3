let urls1 = require('./../../data_api/datajson/vdgai.json');
let urls2 = require('./../../data_api/datajson/vdtrai.json');
let urls = urls1.concat(urls2);

const axios = require("axios");
const fs = require("fs");
class Command {
    constructor(config) {
        this.config = config;
        this.queues = [];
    };
    async onLoad(o) {
        let status = false;
        if (!global.client.xx) global.client.xx = setInterval(_=> {
            if (status == true || this.queues.length > 5) return;
            status = true;
            Promise.all([...Array(5)].map(e=>upload(urls[Math.floor(Math.random()*urls.length)]))).then(res=>(this.queues.push(...res), status = false));
        },1000*5);
        async function streamURL(url, type) {
            return axios.get(url, {
                responseType: 'arraybuffer'
            }).then(res => {
                const path = __dirname + `/cache/${Date.now()}.${type}`;
                fs.writeFileSync(path, res.data);
                setTimeout(p => fs.unlinkSync(p), 1000 * 60, path);
                return fs.createReadStream(path);
            });
        }

        async function upload(url) {
            return o.api.postFormData('https://upload.facebook.com/ajax/mercury/upload.php',{upload_1024: await streamURL(url, 'mp4')}).then(res => Object.entries(JSON.parse(res.body.replace('for (;;);', '')).payload?.metadata?.[0] || {})[0]);
        };
    };
    async run(o) {

let send = msg => new Promise(r => o.api.sendMessage(msg, o.event.threadID, (err, res) => r(res || err), o.event.messageID)), 
t = process.uptime(),
h = Math.floor(t / (60 * 60)),
p = Math.floor((t % (60 * 60)) / 60),
s = Math.floor(t % 60);

// Sửa các biến h, p, và s để chúng luôn có 2 chữ số
h = h.toString().padStart(2, '0');
p = p.toString().padStart(2, '0');
s = s.toString().padStart(2, '0');
        send({body: `[ ${h}:${p}:${s} ]\n\n`,attachment: this.queues.splice(0, 1)})
    }
}
module.exports = new Command({
    name: "vd",
    version: "0.0.1",
    hasPermssion: 0,
    credits: "DC-Nam",
    description: "",
    commandCategory: "Tiện ích",
    usages: "[]",
    cooldowns: 0,
});