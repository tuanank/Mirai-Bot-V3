module.exports.config = {
	name: "setn",
	version: "2.0.0",
	hasPermssion: 0,
	credits: "TrúcCute mod by Niio-team",
	description: "Đổi biệt danh trong nhóm của bạn hoặc của người bạn tag",
	commandCategory: "Box chat",
	usages: "trống/tag/check/all + name",
	cooldowns: 5
}

module.exports.run = async ({ api, event, args, Users }) => {
 let { threadID, messageReply, senderID, mentions, type, participantIDs } = event;
 switch(args[0]){
 case '-c':
 case 'check':
 case 'Check': {
 const dataNickName = (await api.getThreadInfo(threadID)).nicknames
 var dataNotNN = []
 const objKeys = Object.keys(dataNickName);
 const notFoundIds = participantIDs.filter(id => !objKeys.includes(id));
 var msg = '📝 Danh sách các người dùng chưa setname\n',
 num = 1;
 await notFoundIds.map(async (id)=> {
 const name = await Users.getNameUser(id)
 msg += `\n${num++}. ${name}`
 });
 return api.sendMessage(msg,threadID)
 }
 break;
 case 'all':
 case 'All': {
			try{
 const name = (event.body).split('all')[1]
			var num = 1;
 for(const i of participantIDs){
				num++
				try{
					api.changeNickname(name, threadID, i)
				}catch(e){
					console.log(num + " " + e)
				}
 }
 return api.sendMessage(`✅ Đã đổi biệt danh thành công cho tất cả thành viên`,threadID)
		}catch(e) {
				return console.log(e,threadID)
			}
 }
 }
 const delayUnsend = 60;// tính theo giây
	if (type == "message_reply") {
 let name2 = await Users.getNameUser(messageReply.senderID)
 const name = args.join(" ")
 return api.changeNickname(`${name}`, threadID, messageReply.senderID),
 api.sendMessage(`✅ Đã đổi tên của ${name2} thành ${name || "tên gốc"}`, threadID, (err, info) =>
	setTimeout(() => {api.unsendMessage(info.messageID) }, delayUnsend * 1000))
 }
 else {
	const mention = Object.keys(mentions)[0];
	const name2 = await Users.getNameUser(mention || senderID)
 if (args.join().indexOf('@') !== -1 ) {
 const name = args.join(' ')
 return api.changeNickname(`${name.replace(mentions[mention],"")}`, threadID, mention),
 api.sendMessage(`✅ Đã đổi tên của ${name2} thành ${name.replace(mentions[mention],"") || "tên gốc"}`, threadID, (err, info) =>
 setTimeout(() => {api.unsendMessage(info.messageID) } , delayUnsend * 1000))
 } else {
 const name = args.join(" ")
 return api.changeNickname(`${name}`, threadID, senderID),
 api.sendMessage(`✅ Đã đổi tên của bạn thành ${name || "tên gốc"}`, threadID, (err, info) =>
 setTimeout(() => {api.unsendMessage(info.messageID) } , delayUnsend * 1000))
 }
 }
 }