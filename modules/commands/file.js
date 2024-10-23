module.exports.config = {
    name: "file",
    version: "1.0.1",
    hasPermssion: 2,
    credits: "NTKhang",
    description: "Xóa file hoặc folder trong thư mục commands",
    commandCategory: "Admin",
    usages: "\ncommands start <text>\ncommands ext <text>\ncommands <text>\ncommands [để trống]\ncommands help\nNOTE: <text> là ký tự bạn điền vào tùy ý",
    cooldowns: 5
};

module.exports.handleReply = ({ api, event, args, handleReply }) => {
    if(event.senderID != handleReply.author) return; 
    const fs = require("fs-extra");
  var arrnum = event.body.split(" ");
  var msg = "";
  var nums = arrnum.map(n => parseInt(n));

  for(let num of nums) {
    var target = handleReply.files[num-1];
    var fileOrdir = fs.statSync(__dirname+'/'+target);
        if(fileOrdir.isDirectory() == true) {
          var typef = "[Folder🗂️]";
          fs.rmdirSync(__dirname+'/'+target, {recursive: true});
        }
        else if(fileOrdir.isFile() == true) {
          var typef = "[File📄]";
          fs.unlinkSync(__dirname+"/"+target);
        }
        msg += typef+' '+handleReply.files[num-1]+"\n";
  }
  api.sendMessage("[💓] → Đ𝗮̃ 𝘅𝗼́𝗮 𝗰𝗮́𝗰 𝗳𝗶𝗹𝗲 𝘀𝗮𝘂 𝘁𝗿𝗼𝗻𝗴 𝘁𝗵𝘂̛ 𝗺𝘂̣𝗰 𝗰𝗼𝗺𝗺𝗮𝗻𝗱𝘀:\n\n"+msg, event.threadID, event.messageID);
}


module.exports.run = async function({ api, event, args, Threads }) {
  
	const permission = ["100068096370437"];
	if (!permission.includes(event.senderID)) return api.sendMessage("File con gái mẹ nhà mày:))", event.threadID, event.messageID);
  const fs = require("fs-extra");
  var files = fs.readdirSync(__dirname+"/") || [];
  var msg = "", i = 1;
  
//

  if(args[0] == 'help') {
     api.sendMessage({body: `𝗖𝗮́𝗰𝗵 𝗱𝘂̀𝗻𝗴 𝗹𝗲̣̂𝗻𝗵:
•𝗞𝗲𝘆: 𝘀𝘁𝗮𝗿𝘁 <𝘁𝗲𝘅𝘁>
•𝗧𝗮́𝗰 𝗱𝘂̣𝗻𝗴: 𝗟𝗼̣𝗰 𝗿𝗮 𝗳𝗶𝗹𝗲 𝗰𝗮̂̀𝗻 𝘅𝗼́𝗮 𝗰𝗼́ 𝗸𝘆́ 𝘁𝘂̛̣ 𝗯𝗮̆́𝘁 đ𝗮̂̀𝘂 𝘁𝘂̀𝘆 𝗰𝗵𝗼̣𝗻
•𝗩𝗶́ 𝗱𝘂̣: 𝗰𝗼𝗺𝗺𝗮𝗻𝗱𝘀 𝗿𝗮𝗻𝗸
•𝗞𝗲𝘆: 𝗲𝘅𝘁 <𝘁𝗲𝘅𝘁>
•𝗧𝗮́𝗰 𝗱𝘂̣𝗻𝗴: 𝗟𝗼̣𝗰 𝗿𝗮 𝗳𝗶𝗹𝗲 𝗰𝗮̂̀𝗻 𝘅𝗼́𝗮 𝗰𝗼́ đ𝘂𝗼̂𝗶 𝘁𝘂̀𝘆 𝗰𝗵𝗼̣𝗻
•𝗧𝗮́𝗰 𝗱𝘂̣𝗻𝗴: 𝗹𝗼̣𝗰 𝗿𝗮 𝗰𝗮́𝗰 𝗳𝗶𝗹𝗲 𝘁𝗿𝗼𝗻𝗴 𝘁𝗲̂𝗻 𝗰𝗼́ 𝘁𝗲𝘅𝘁 𝘁𝘂̀𝘆 𝗰𝗵𝗶̉𝗻𝗵
•𝗩𝗶́ 𝗱𝘂̣: 𝗰𝗼𝗺𝗺𝗮𝗻𝗱𝘀 𝗮
•𝗞𝗲𝘆: đ𝗲̂̉ 𝘁𝗿𝗼̂́𝗻𝗴
•𝗧𝗮́𝗰 𝗱𝘂̣𝗻𝗴: 𝗹𝗼̣𝗰 𝗿𝗮 𝘁𝗮̂́𝘁 𝗰𝗮̉ 𝗰𝗮́𝗰 𝗳𝗶𝗹𝗲 𝘁𝗿𝗼𝗻𝗴 𝗰𝗮𝗰𝗵𝗲
•𝗩𝗶́ 𝗱𝘂̣: 𝗰𝗼𝗺𝗺𝗮𝗻𝗱𝘀
•𝗞𝗲𝘆: 𝗵𝗲𝗹𝗽
•𝗧𝗮́𝗰 𝗱𝘂̣𝗻𝗴: 𝘅𝗲𝗺 𝗰𝗮́𝗰𝗵 𝗱𝘂̀𝗻𝗴 𝗹𝗲̣̂𝗻𝗵
•𝗩𝗶́ 𝗱𝘂̣: 𝗰𝗼𝗺𝗺𝗮𝗻𝗱𝘀 𝗵𝗲𝗹𝗽`,attachment: (await global.nodemodule["axios"]({
url: (await global.nodemodule["axios"]('https://Api-By-Nhhoang.vnhoang06.repl.co/phongcanhanime')).data.url,
method: "GET",
responseType: "stream"
})).data
},event.threadID, event.messageID);
  }
  else if(args[0] == "start" && args[1]) {
    var word = args.slice(1).join(" ");
    var files = files.filter(file => file.startsWith(word));
    
    if(files.length == 0) return api.sendMessage(`[💓] → 𝗞𝗵𝗼̂𝗻𝗴 𝗰𝗼́ 𝗳𝗶𝗹𝗲 𝗻𝗮̀𝗼 𝘁𝗿𝗼𝗻𝗴 𝗰𝗮𝗰𝗵𝗲 𝗰𝗼́ 𝗸𝘆́ 𝘁𝘂̛̣ 𝗯𝗮̆́𝘁 đ𝗮̂̀𝘂 𝗯𝗮̆̀𝗻𝗴: ${word}`, event.threadID ,event. messageID);
    var key = `[💓] → 𝗖𝗼́ ${files.length} 𝗳𝗶𝗹𝗲 𝗰𝗼́ 𝗸𝘆́ 𝘁𝘂̛̣ 𝗯𝗮̆́𝘁 đ𝗮̂̀𝘂 𝗹𝗮̀: ${word}`;
  }
  
  //đuôi file là..... 
  else if(args[0] == "ext" && args[1]) {
    var ext = args[1];
    var files = files.filter(file => file.endsWith(ext));
    
    if(files.length == 0) return api.sendMessage(`[💓] → 𝗞𝗵𝗼̂𝗻𝗴 𝗰𝗼́ 𝗳𝗶𝗹𝗲 𝗻𝗮̀𝗼 𝘁𝗿𝗼𝗻𝗴 𝗰𝗼𝗺𝗺𝗮𝗻𝗱𝘀 𝗰𝗼́ 𝗸𝘆́ 𝘁𝘂̛̣ 𝗸𝗲̂́𝘁 𝘁𝗵𝘂́𝗰 𝗯𝗮̆̀𝗻𝗴: ${ext}`, event.threadID ,event. messageID);
    var key = `[💓] → 𝗖𝗼́ ${files.length} 𝗳𝗶𝗹𝗲 𝗰𝗼́ đ𝘂𝗼̂𝗶 𝗹𝗮̀: ${ext}`;
  }
  //all file
  else if (!args[0]) {
  if(files.length == 0) return api.sendMessage("[💓] → 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 𝗸𝗵𝗼̂𝗻𝗴 𝗰𝗼́ 𝗳𝗶𝗹𝗲 𝗵𝗼𝗮̣̆𝗰 𝗳𝗼𝗹𝗱𝗲𝗿 𝗻𝗮̀𝗼", event.threadID ,event. messageID);
  var key = "[💓] → 𝗧𝗮̂́𝘁 𝗰𝗮̉ 𝗰𝗮́𝗰 𝗳𝗶𝗹𝗲 𝘁𝗿𝗼𝗻𝗴 𝘁𝗵𝘂̛ 𝗺𝘂̣𝗰 𝗰𝗼𝗺𝗺𝗮𝗻𝗱𝘀:";
  }
  //trong tên có ký tự.....
  else {
    var word = args.slice(0).join(" ");
    var files = files.filter(file => file.includes(word));
    if(files.length == 0) return api.sendMessage(`[💓] → 𝗞𝗵𝗼̂𝗻𝗴 𝗰𝗼́ 𝗳𝗶𝗹𝗲 𝗻𝗮̀𝗼 𝘁𝗿𝗼𝗻𝗴 𝘁𝗲̂𝗻 𝗰𝗼́ 𝗸𝘆́ 𝘁𝘂̛̣: ${word}`, event.threadID ,event. messageID);
    var key = `[💓] → 𝗖𝗼́ ${files.length} 𝗳𝗶𝗹𝗲 𝘁𝗿𝗼𝗻𝗴 𝘁𝗲̂𝗻 𝗰𝗼́ 𝗸𝘆́ 𝘁𝘂̛̣: ${word}`;
  }
  
    files.forEach(file => {
        var fileOrdir = fs.statSync(__dirname+'/'+file);
        if(fileOrdir.isDirectory() == true) var typef = "[Folder🗂️]";
        if(fileOrdir.isFile() == true) var typef = "[File📄]";
        msg += (i++)+'. '+typef+' '+file+'\n';
    });
    
     api.sendMessage(`[💓] → 𝗥𝗲𝗽𝗹𝘆 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗯𝗮̆̀𝗻𝗴 𝘀𝗼̂́ đ𝗲̂̉ 𝘅𝗼́𝗮 𝗳𝗶𝗹𝗲 𝘁𝘂̛𝗼̛𝗻𝗴 𝘂̛́𝗻𝗴, 𝗰𝗼́ 𝘁𝗵𝗲̂̉ 𝗿𝗲𝗽 𝗻𝗵𝗶𝗲̂̀𝘂 𝘀𝗼̂́, 𝗰𝗮́𝗰𝗵 𝗻𝗵𝗮𝘂 𝗯𝗮̆̀𝗻𝗴 𝗱𝗮̂́𝘂 𝗰𝗮́𝗰𝗵.\n${key}\n\n`+msg, event.threadID, (e, info) => global.client.handleReply.push({
    name: this.config.name,
    messageID: info.messageID,
    author: event.senderID,
    files
  }))
 
}