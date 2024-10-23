module.exports.config = {
	name: "ndfb",
	version: "1.0.0",
	hasPermssion: 1,
	credits: "ProCoderMew",
	description: "Lọc người dùng Facebook",
	commandCategory: "Box chat",
	usages: "",
	cooldowns: 20,
        images: [],
};

module.exports.run = async function({ api, event }) {
    var { userInfo, adminIDs } = await api.getThreadInfo(event.threadID);    
    var success = 0, fail = 0;
    var arr = [];
    for (const e of userInfo) {
        if (e.gender == undefined) {
            arr.push(e.id);
        }
    };

    adminIDs = adminIDs.map(e => e.id).some(e => e == api.getCurrentUserID());
    if (arr.length == 0) {
        return api.sendMessage("🔄 Nhóm bạn hiện không có người dùng bị bay acc", event.threadID, event.messageID);
    }
    else {
        api.sendMessage(`🔄 Phát hiện nhóm bạn có ${arr.length} người dùng bị bay acc`, event.threadID, function () {
            if (!adminIDs) {
                api.sendMessage("❎ Bot không phải là qtv nên không thể lọc, vui lòng thêm bot làm qtv rồi thử lại", event.threadID);
            } else {
                api.sendMessage("📌 Bắt đầu lọc...", event.threadID, async function() {
                    for (const e of arr) {
                        try {
                            await new Promise(resolve => setTimeout(resolve, 1000));
                            await api.removeUserFromGroup(parseInt(e), event.threadID);   
                            success++;
                        }
                        catch {
                            fail++;
                        }
                    }
                  
                    api.sendMessage(`☑️ Đã lọc thành công ${success} người dùng`, event.threadID, function() {
                        if (fail != 0) return api.sendMessage(`❎ Lọc thất bại ${fail} người dùng`, event.threadID);
                    });
                })
            }
        })
    }
}
