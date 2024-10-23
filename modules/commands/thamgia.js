module.exports.config = {
    name: "thamgia",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "cherry & DongDev fix",
    description: "Tham gia vào nhóm bot đang ở",
    commandCategory: "Admin",
    usages: "bủh",
    cooldowns: 0,
    images: [],
    dependencies: {
        "request": "",
        "fs-extra": "",
        "axios": ""
    }
};

module.exports.handleReply = async ({ event, api, handleReply }) => {
    const { threadID, messageID, body, senderID } = event;
    const { threadList, author } = handleReply;

    if (senderID !== author) return;

    api.unsendMessage(handleReply.messageID);

    if (!body || !parseInt(body)) return api.sendMessage('❎ Lựa chọn của bạn phải là một số', threadID, messageID);

    const selectedThread = threadList[parseInt(body) - 1];

    if (!selectedThread) return api.sendMessage("❎ Lựa chọn của bạn không nằm trong danh sách", threadID, messageID);

    try {
        const { participantIDs, name, threadID: selectedThreadID } = selectedThread;

        if (participantIDs.includes(senderID)) return api.sendMessage('☑️ Bạn đã có mặt trong nhóm này rồi', threadID, messageID);

        api.addUserToGroup(senderID, selectedThreadID, (error) => {
            if (error) api.sendMessage(`❎ Đã xảy ra lỗi: ${error.errorDescription}`, threadID, messageID);
            else api.sendMessage(`☑️ Bot đã thêm bạn vào nhóm ${name}\n📌 Kiểm tra ở mục spam hoặc tin nhắn chờ nếu không thấy box`, threadID, messageID);
        });
    } catch (error) {
        api.sendMessage(`❎ Lỗi khi thêm bạn vào nhóm: ${error}`, threadID, messageID);
    }
};

module.exports.run = async function ({ api, event }) {
    const { threadID, senderID, messageID } = event;
  try {
        const allThreads = await api.getThreadList(100, null, ["INBOX"]);
        const groupThreads = allThreads.filter(thread => thread.isGroup);

        if (!groupThreads.length) return api.sendMessage("Không tìm thấy nhóm nào.", threadID);

        let msg = `📝 Danh sách tất cả các nhóm bạn có thể tham gia:\n──────────────────\n`;

        await Promise.all(groupThreads.map(async (thread, index) => {
            msg += `${index + 1}. ${thread.name}\n`;
        }));

        msg += `\n📌 Reply (phản hồi) STT ứng với nhóm mà bạn muốn vào`;

        api.sendMessage(msg, threadID, async (error, info) => {
        if (error) return console.error("Error sending message:", error);
            try {
                await global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: senderID,
                    threadList: groupThreads
                });
            } catch (err) {
                console.error("Error while pushing handleReply data:", err);
            }
        }, messageID);
    } catch (err) {
        console.error("Error while getting thread list:", err);
        api.sendMessage("❎ Đã xảy ra lỗi khi lấy danh sách nhóm", threadID, messageID);
    }
};