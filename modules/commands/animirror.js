const axios = require("axios");
const fs = require("fs");

const models = {
    "1": "Anime Premium",
    "2": "Cartoon Premium",
    "3": "Anime Style: Trang phục hầu gái",
    "4": "Anime Style: Cô gái trên bãi biển",
    "5": "Anime Style: Fantasy dễ thương",
    "6": "Anime Style: Truyện tranh tình yêu",
    "7": "Anime Style: Kỷ niệm trường trung học",
    "8": "Anime Style: Giáng sinh vui vẻ",
    "9": "Anime Art: Cuộc phiêu lưu cướp biển ( One Piece )",
    "10": "Anime Art: Cảm giác của ngôi sao pop ( Oshi no Ko )",
    "11": "Anime Art: Di sản Ninja ( Naruto )",
    "12": "Anime Art: Siêu chiến binh ( DBZ )",
    "13": "Anime Art: Sổ tay tối ( Death Note )",
    "14": "Anime Art: Cuộc chiến vĩnh cửu ( Bleach )",
    "15": "Anime Art: Cánh của số phận ( AOT )",
    "16": "Anime Art: Phép thuật bí ẩn (Jujutsu Kaisen)",
    "17": "Anime Art: Thiên tài tennis (ThePrince of Tennis)",
    "18": "Anime Art: Hồ sơ Thợ săn Quỷ (Demon Slayer)",
    "19": "Anime Art: Cuộc phiêu lưu Hóa học (Fullmetal Alchemist)",
    "20": "Anime Art: Tương lai anh hùng (My Hero Academia)",
    "21": "Anime Art: Hành trình tiền sử (Dr Stone)",
    "22": "Anime Art: Trận chiến trên sân đấu (Haikyuu)"
};

module.exports.config = {
    name: "animirror",
    version: "1.0",
    hasPermssion: 0,
    credits: "SiAM fix by DongDev",
    description: "Biến mình thành nhân vật anime!",
    commandCategory: "Công cụ",
    usages: "",
    cooldowns: 5,
    images: [],
};

module.exports.run = async function ({ api, event, args }) {
    try {
        if (!args.length || args[0] === "list") {
            const modelList = Object.entries(models).map(([number, name]) => `|› ${number}. ${name}`).join("\n");
            return api.sendMessage("📝 Danh sách các mẫu có sẵn:\n\n" + modelList, event.threadID, event.messageID);
        }

        const [modelNumber] = args;
        if (isNaN(modelNumber) || !models[modelNumber]) {
            return api.sendMessage("❎ Số mẫu không hợp lệ, vui lòng cung cấp số mẫu hợp lệ từ danh sách.\n📝 Nhập `aimirror list` để xem tất cả các mẫu có sẵn", event.threadID, event.messageID);
        }

        const imageUrl = event.messageReply.attachments?.[0]?.url;
        if (!imageUrl) {
            return api.sendMessage("⚠️ Vui lòng reply bằng một hình ảnh để áp dụng filter anime", event.threadID, event.messageID);
        }

        const encodedImageUrl = encodeURIComponent(imageUrl);
        const processingMessage = await api.sendMessage(`🔄 Đang áp dụng filter, vui lòng chờ...\n📝 Sử dụng mẫu: ${modelNumber} (${models[modelNumber]}) ⌛`, event.threadID, event.messageID);

        const response = await axios.get(`https://simoapi-aimirror.onrender.com/generate?imageUrl=${encodedImageUrl}&modelNumber=${modelNumber}`);
        const generatedImageUrl = response.data.imageUrl;
        const { data: imageBuffer } = await axios.get(generatedImageUrl, { responseType: "arraybuffer" });
        const temporaryImagePath = `temp_${Date.now()}.jpg`;
        fs.writeFileSync(temporaryImagePath, Buffer.from(imageBuffer, 'binary'));
        const attachmentData = fs.createReadStream(temporaryImagePath);

        await api.sendMessage({ 
            body: `✅ Đã áp dụng art anime ✨\n📝 Mẫu được sử dụng: ${modelNumber} (${models[modelNumber]})`, 
            attachment: attachmentData 
        }, event.threadID, event.messageID);

        fs.unlinkSync(temporaryImagePath);
        api.unsendMessage(processingMessage.messageID);
    } catch (error) {
        console.error(error);
        api.sendMessage("❎ Lỗi trong quá trình áp dụng filter anime", event.threadID);
    }
};