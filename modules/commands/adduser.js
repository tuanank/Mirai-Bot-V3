module.exports.config = {
    name: "adduser",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "D-Jukie",
    description: "Thêm người dùng vào nhóm bằng link hoặc uid",
    commandCategory: "Box chat",
    usages: "[args]",
    images: [],
    cooldowns: 5
};

module.exports.run = async function ({ api, event, args, Threads, Users }) {
    const { threadID, messageID } = event;
    const axios = require('axios');
    const link = args.join(" ");

    if (!args[0]) return api.sendMessage('❎ Vui lòng nhập link hoặc id người dùng muốn thêm vào nhóm!', threadID, messageID);

    var { participantIDs, approvalMode, adminIDs } = await api.getThreadInfo(threadID);

    if (link.indexOf(".com/") !== -1) {
        const uidUser = await api.getUID(args[0] || event.messageReply.body);
        api.addUserToGroup(uidUser, threadID, (err) => {
            if (participantIDs.includes(uidUser)) return api.sendMessage(`⚠️ Thành viên đã có mặt trong nhóm`, threadID, messageID);
            if (err) return api.sendMessage(`❎ Không thể thêm thành viên vào nhóm`, threadID, messageID);
            else if (approvalMode && !adminIDs.some(item => item.id == api.getCurrentUserID())) return api.sendMessage(`📝 Đã thêm người dùng vào danh sách phê duyệt`, threadID, messageID);
            else return api.sendMessage(`✅ Thêm thành viên vào nhóm thành công`, threadID, messageID);
        });
    } else {
        var uidUser = args[0];
        api.addUserToGroup(uidUser, threadID, (err) => {
            if (participantIDs.includes(uidUser)) return api.sendMessage(`⚠️ Thành viên đã có mặt trong nhóm`, threadID, messageID);
            if (err) return api.sendMessage(`❎ Không thể thêm thành viên vào nhóm`, threadID, messageID);
            else if (approvalMode && !adminIDs.some(item => item.id == api.getCurrentUserID())) return api.sendMessage(`📝 Đã thêm người dùng vào danh sách phê duyệt`, threadID, messageID);
            else return api.sendMessage(`✅ Thêm thành viên vào nhóm thành công`, threadID, messageID);
        });
    }
};