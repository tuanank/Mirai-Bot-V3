module.exports.config = {
	name: "rst",
	version: "1.0.0",
	hasPermssion: 3,
	credits: "Mirai Team",
	description: "Khởi Động Lại Bot.",
	commandCategory: "Admin",
	cooldowns: 0,
        images: [],
        };
module.exports.run = ({event, api}) => api.sendMessage("🔄 Bot tiến hành khởi động lại, vui lòng chờ!", event.threadID, () => process.exit(1), event.messageID)