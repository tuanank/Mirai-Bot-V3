module.exports.config = {
    name: "fixspam",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "ManhG",
    description: "Người chửi bot sẽ tự động bị ban khỏi hệ thống <3",
    commandCategory: "Hệ thống",
    usages: "",
    cooldowns: 0,
    images: [],
};

module.exports.handleReply = async function ({ api, args, Users, event, handleReply }) {
    const { threadID, messageID } = event;
    const { reason } = handleReply;
    var name = await Users.getNameUser(event.senderID);
    var arg = event.body.split(" ");
    var uidUser = handleReply.author;
    var nameU = handleReply.nameU;
    switch (handleReply.type) {
        case "reply": {
            api.sendMessage({
                body: `[ USER FEEDBACK ]\n──────────────────\n|› 👤 Người dùng: ${name}\n|› 💬 Nội dung: ${event.body}\n📌 Reply (phản hồi) tin nhắn để gửi cho người dùng chửi bot`,
                mentions: [{
                    id: event.senderID,
                    tag: name
                }]
            }, handleReply.author, (e, data) => global.client.handleReply.push({
                name: this.config.name,
                messageID: data.messageID,
                messID: event.messageID,
                author: event.senderID,
                id: event.threadID,
                nameU: name,
                type: "banU"
            }))
            break;
        }

        case "banU": {
            if (arg[0] == "unban" || arg[0] == "Unban") {
                let data = (await Users.getData(uidUser)).data || {};
                data.banned = 0;
                data.reason = null;
                data.dateAdded = null;
                await Users.setData(uidUser, { data });
                global.data.userBanned.delete(uidUser, 1);
                api.sendMessage(`‎|› 📝 Thông báo từ admin: ${name}\n|› 👤 Người dùng: ${nameU} đã được gỡ ban\n|› 📌 Có thể sử dụng bot ngay bây giờ`, uidUser, () =>
                    api.sendMessage(`${global.data.botID}`, () =>
                        api.sendMessage(`|› Unban success: ${nameU} \n|› 🔰 UID:${uidUser}`, threadID)));
            } else {
                api.sendMessage({ body: `[ ADMIN FEEDBACK ]\n──────────────────\n|› 💬 Nội dung: ${event.body}\n|› Reply (phản hồi) tin nhắn để phản hồi lại admin`, mentions: [{ tag: name, id: event.senderID }] }, handleReply.id, (e, data) => global.client.handleReply.push({
                    name: this.config.name,
                    author: event.senderID,
                    messageID: data.messageID,
                    type: "reply"
                }), handleReply.messID);
                break;
            }
        }

        case "chuibot": {
            api.sendMessage({ body: `[ ADMIN FEEDBACK ]\n──────────────────\n|› 💬 Nội dung: ${event.body}\n|› 📌 Reply (phản hồi) tin nhắn để phản hồi lại admin`, mentions: [{ tag: name, id: event.senderID }] }, handleReply.id, (e, data) => global.client.handleReply.push({
                name: this.config.name,
                author: event.senderID,
                messageID: data.messageID,
                type: "reply"
            }), handleReply.messID);
            break;
        }
    }
};

module.exports.handleEvent = async ({ event, api, Users, Threads }) => {
    var { threadID, messageID, body, senderID, reason } = event;
    const moment = require("moment-timezone");
    const time = moment.tz("Asia/Ho_Chi_minh").format("HH:mm:ss D/MM/YYYY");

    var { threadID, messageID, body, senderID } = event; const thread = global.data.threadData.get(threadID) || {};
   
    if (senderID == global.data.botID) return;
    let name = await Users.getNameUser(event.senderID);
    var idbox = event.threadID;
    var threadInfo = (await Threads.getData(threadID)).threadInfo;
    //trả lời
    var msg = {
        body: `|› 👤 Người dùng: ${name} đã bị ban khỏi hệ thống vì đã chửi bot\n|› 📝 Nếu muốn được unban vui lòng liên hệ admin\n|› 🌐 Fb Admin: ${global.config.FACEBOOK_ADMIN}\n|› 📌 Admin mở ban hay không thì tùy nhé`
    }
    // Gọi bot
    const arr = ["bot óc chó", "bot lồn", "bot ngu", "bot gà", "bot lol", "bot tuấn óc", "bot như cặc", "bot chó", "bot ngu lồn", "bot chó", "dm bot", "dmm bot", "Clm bot", "bot ghẻ", "đmm bot", "đb bot", "bot điên", "bot dở", "bot khùng", "đĩ bot", "bot paylac rồi", "con bot lòn", "cmm bot", "clap bot", "bot ncc", "bot oc", "bot óc", "bot óc chó", "cc bot", "bot tiki", "lozz bottt", "lol bot", "loz bot", "lồn bot", "bot hãm", "bot lon", "bot cac", "bot nhu lon", "bot như cc", "bot như bìu", "bot sida", "bot xàm", "bot fake", "bot súc vật", "bot shoppee", "bot đểu", "bot như lồn", "bot dởm","đồng ngu","dongdev ngu","admin ncc"];

    arr.forEach(i => {
        let str = i[0].toUpperCase() + i.slice(1);
        if (body === i.toUpperCase() | body === i | str === body) {
            const uidUser = event.senderID;
            const data = Users.getData(uidUser).data || {};
            Users.setData(uidUser, { data });
            data.banned = 1;
            data.reason = 'Chửi '+ i || null;
            data.dateAdded = time;
            global.data.userBanned.set(uidUser, { reason: data.reason, dateAdded: data.dateAdded });

            api.sendMessage(msg, threadID, () => {
                var adminList = [...global.config.ADMINBOT, ...global.config.NDH]; // Kết hợp danh sách admin từ cả hai biến
                let namethread = threadInfo.threadName;
                adminList.forEach(adminID => {
                    api.sendMessage(`|› 👤 Người dùng chửi bot: ${name}\n|› ✏️ UID: ${uidUser}\n|› 💌 Nhóm: ${namethread}\n|› 📝 Lời xúc phạm bot: ${data.reason}\n\n|› 🔰 Bot đã ban người dùng khỏi hệ thống nên các admin yên tâm nhé`, adminID, (error, info) =>
                        global.client.handleReply.push({
                            name: this.config.name,
                            author: senderID,
                            messageID: info.messageID,
                            messID: messageID,
                            id: idbox,
                            type: "chuibot"
                        })
                    );
                });
            });
        }
    });
};
module.exports.run = () => {};