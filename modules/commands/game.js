const axios = require("axios");
const fs = require("fs");
const { parse } = require("path");
const users = require("../../includes/controllers/users");
const dataDungeon = JSON.parse(fs.readFileSync(__dirname + "/game/game/collections.json"))
const dataShop = JSON.parse(fs.readFileSync(__dirname + "/game/game/shop.json"))
class Module {
    get config() {
        return {
            name: "game",
            description: "Game commands",
            version: "1.0.0",
            credits: 'Thiệu Trung Kiên',
            hasPermssion: 0,
            commandCategory: "Game",
            usages: "game",
            cooldowns: 5,
            images: [],
        }
    }
    gacha() {
        return JSON.parse(fs.readFileSync(__dirname + "/game/game/gacha.json"))
    }
    getData() {
        return JSON.parse(fs.readFileSync(__dirname + "/game/game/game.json"))
    }
    getDataUser(uid) {
        return this.getData()[uid]
    }
    setData(data) {
        fs.writeFileSync(__dirname + "/game/game/game.json", JSON.stringify(data, null, 4))
    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    getImage(url) {
        return new Promise((resolve, reject) => {
            axios({
                url,
                responseType: 'stream'
            }).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }
    useItem(uid, id_item, amount = '1') {
        const data = this.getData()[uid];
        const { items, dataUser } = data;
        const item = dataShop.items[id_item]['heal_percentage'].split('%')[0];
        const countUse = Number(amount);
        if (items[id_item] >= countUse) {
            dataUser.hp += Math.floor(dataUser.max_hp * (item / 100)) * countUse;
            dataUser.hp = Math.min(dataUser.hp, dataUser.max_hp);
            items[id_item] -= countUse;
            this.setData({ ...data, items });
            return true;
        }
        return false;
    }
    levelUp(uid, level, exp) {
        var needExp = level * 1000
        console.log({ uid, level, exp, needExp })
        if (exp > needExp) {
            var data = this.getData()[uid]
            data.dataUser.level += 1
            data.dataUser.exp -= needExp
            data.dataUser.hp += 100
            data.dataUser.mana += 100
            data.dataUser.max_hp += 100
            data.dataUser.atk += 10
            data.dataUser.def += 10
            data.points += 5
            this.setData({ ...this.getData(), [uid]: data })
            return true
        }
        return false
    }
    async attackDungeon(uid, map, api, event) {
        const { dataUser: data, item: dataItem } = this.getData()[uid];

        if (data.weapons === 0) {
            await api.sendMessage("❎ Bạn chưa trang bị vũ khí, vui lòng trang bị vũ khí", event.threadID, event.messageID);
            return;
        }

        const dataMap = dataDungeon[map];
        const nameMonster = Object.keys(dataMap)[Math.floor(Math.random() * Object.keys(dataMap).length)];
        const monster = dataMap[nameMonster];

        data.hp -= monster.damage;
        if (data.hp <= 0) {
            data.exp -= Math.floor(data.exp * 0.1);
            data.hp = 100;
            this.setData({ ...this.getData(), [uid]: { ...this.getData()[uid], dataUser: data } });
            await api.sendMessage(`☠️ Bạn đã bị tiêu diệt bởi ${monster.name} và mất 10% exp hiện tại!`, event.threadID);
            return;
        }

        data.exp += monster.exp;
        data.gold += monster.gold;
        dataItem.weapons[data.weapons].durability -= 1;
        console.log(dataItem.weapons[data.weapons].durability);

        if (dataItem.weapons[data.weapons].durability <= 0) {
            await api.sendMessage(`⚔️ Vũ khí: ${data.weapons} đã bị hỏng!\n📝 Vui lòng mua lại vũ khí mới trong shop!`, event.threadID);
            delete dataItem.weapons[data.weapons];
            data.weapons = '0';
            this.setData({ ...this.getData(), [uid]: { ...this.getData()[uid], dataUser: data, item: dataItem } });
            return;
        }

        this.setData({ ...this.getData(), [uid]: { ...this.getData()[uid], dataUser: data, item: dataItem } });

        if (this.levelUp(uid, data.level, data.exp)) {
            await api.sendMessage(`🎉 Bạn đã lên level ${data.level} và nhận được 5 điểm phát triển!`, event.threadID);
        }
        const message = {
            body: `⚔️ Bạn đã đánh bại ${monster.name} và nhận được ${monster.exp} điểm kinh nghiệm\n📊 Chỉ số hiện tại của bạn :\n⚖️ Exp: ${data.exp}\n🪙 Gold: ${data.gold}\n🩸 HP: ${data.hp}\n🍄 Mana: ${data.mana}\n🔰 Atk: ${data.atk}\n🌾 Def: ${data.def}\n🌴 Weapons: ${data.weapons}\n📌 Thả cảm xúc '❤' để tiếp tục đi đánh quái!\n👉 Reply '👍' để sử dụng vật phẩm hồi máu!`,
            attachment: await this.getImage(monster.image)
        };

        return api.sendMessage(message, event.threadID, (error, info) => {
            global.client.handleReaction.push({
                name: this.config.name,
                messageID: info.messageID,
                author: uid,
                type: "attackDungeon"
            })
        });
    }
    async attackPlayer(uid1, uid2, api, event) {
        const player1 = this.getData()[uid1].dataUser;
        const player2 = this.getData()[uid2].dataUser;
        const iterations = 10;
        const gameDungeon = global.gameDungeon || {};
        if (gameDungeon[event.threadID]) {
            return api.sendMessage("❎ Nhóm này đang có trận đấu, vui lòng chờ đến khi kết thúc trận đấu!", event.threadID, event.messageID);
        }
        gameDungeon[event.threadID] = { player1: { ...player1 }, player2: { ...player2 }, result: null };
        for (let i = 0; i < iterations && !gameDungeon[event.threadID].result; i++) {
            gameDungeon[event.threadID].player1.hp -= Math.floor(gameDungeon[event.threadID].player2.atk * Math.random());
            gameDungeon[event.threadID].player2.hp -= Math.floor(gameDungeon[event.threadID].player1.atk * Math.random());
            api.sendMessage(`👤 Người chơi 1 : ${gameDungeon[event.threadID].player1.hp}\n👤 Người chơi 2 : ${gameDungeon[event.threadID].player2.hp}`, event.threadID, event.messageID);
            if (gameDungeon[event.threadID].player1.hp <= 0) {
                gameDungeon[event.threadID].result = uid2;
            } else if (gameDungeon[event.threadID].player2.hp <= 0) {
                gameDungeon[event.threadID].result = uid1;
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        const winner = gameDungeon[event.threadID].result;
        const loser = winner === uid1 ? uid2 : uid1;
        const dataWinner = { ...this.getData()[winner].dataUser };
        const dataLoser = { ...this.getData()[loser].dataUser };
        dataWinner.exp += Math.floor(dataLoser.exp * 0.1);
        dataLoser.exp -= Math.floor(dataLoser.exp * 0.1);
        dataWinner.hp = Math.min(dataWinner.max_hp, dataWinner.hp + Math.floor(dataWinner.max_hp * 0.1));
        this.setData({ ...this.getData(), [winner]: { ...this.getData()[winner], dataUser: dataWinner }, [loser]: { ...this.getData()[loser], dataUser: dataLoser } });
        api.sendMessage(`👤 Người chơi ${winner} đã chiến thắng và nhận được ${Math.floor(dataLoser.exp * 0.1)} exp!`, event.threadID, event.messageID);
    }
    mapMine() {
        var map = {
            "1": {
                "requirePickaxe": 1,
                "ore": ["copper", "iron"]
            },
            "2": {
                "requirePickaxe": 2,
                "ore": ["iron", "gold"]
            },
            "3": {
                "requirePickaxe": 3,
                "ore": ["gold", "diamond"]
            }
        }
        return map
    }
    async mine(uid, api, event) {
        var data = this.getData()[uid];
        const map = this.mapMine()[data.mine]
        if (data.dataUser.tools == '0') return api.sendMessage("❎ Bạn chưa có công cụ, hãy mua công cụ tại shop", event.threadID, event.messageID)
        const ore = map.ore[Math.floor(Math.random() * map.ore.length)];
        const getDataOre = dataDungeon['mine'][ore];
        const { name, exp, gold, image, dur } = getDataOre;
        console.log({ name, exp, gold, image, dur })
        data.dataUser.exp += exp;
        data.dataUser.gold += gold;
        data.ore[ore] += 1;
        data.item.tools[data.dataUser.tools].durability -= dur
        if (data.item.tools[data.dataUser.tools].durability <= 0) {
            return api.sendMessage(`⛏️ Công cụ : ${data.dataUser.tools} đã bị hỏng!\n📝 Vui lòng mua lại công cụ mới trong shop!`, event.threadID, () => {
                delete data.item.tools[data.dataUser.tools];
                data.dataUser.tools = '0';
                this.setData({ ...this.getData(), [uid]: { ...this.getData()[uid], dataUser: data.dataUser, item: data.item } });
            });
        }
        this.setData({ ...this.getData(), [uid]: { ...this.getData()[uid], dataUser: data.dataUser, item: data.item, ore: data.ore } });
        if (this.levelUp(uid, data.dataUser.level, data.dataUser.exp)) {
            api.sendMessage(`🆙 Bạn đã lên level ${data.dataUser.level} và nhận được 5 điểm phát triển!`, event.threadID);
        }
        return api.sendMessage({ body: `⛏️ Bạn đã đào được ${name} và nhận được ${exp} điểm kinh nghiệm\n📊 Chỉ số hiện tại của bạn :\n🍄 Exp: ${data.dataUser.exp}\n🪙 Gold: ${data.dataUser.gold}\n📌 Thả cảm xúc '❤' để tiếp tục đào đá!`, attachment: await this.getImage(image) }, event.threadID, (error, info) => {
            global.client.handleReaction.push({
                name: this.config.name,
                messageID: info.messageID,
                author: uid,
                type: "mine"
            })
        }, event.messageID);
    }
    async run({ api, event }) {
        return api.sendMessage(`[ GAME - Gacha ]\n──────────────────\n|› 1. Đăng ký tài khoản\n|› 2. Đi đánh quái\n|› 3. Shop mua đồ\n|› 4. Xem rương đồ\n|› 5. Đổi khu vực\n|› 6. Đi đào đá\n|› 7. Nâng cấp trang bị\n|› 8. Xem thông tin bản thân\n|› 9. Quay gacha\n|› 10. PVP\n\n📌 Reply (phản hồi) theo stt để chọn`, event.threadID, (error, info) => {
            global.client.handleReply.push({
                name: this.config.name,
                messageID: info.messageID,
                author: event.senderID,
                type: "game"
            })
        }, event.messageID);
    }
    async handleReply({ api, event, handleReply, Users }) {
        if (handleReply.author != event.senderID) return;
        switch (handleReply.type) {
            case "game": {
                if (event.body != "1") {
                    if (!this.getData()[event.senderID]) return api.sendMessage("❎ Bạn chưa đăng ký tài khoản, hãy đăng ký tài khoản trước!", event.threadID, event.messageID);
                }
                switch (event.body) {
                    case "1": {
                        if (!this.getData()[event.senderID]) {
                            this.setData({
                                ...this.getData(), [event.senderID]: {
                                    map: 'jungle_0',
                                    mine: "1",
                                    dataUser: {
                                        level: 1,
                                        exp: 0,
                                        gold: 1000,
                                        hp: 100,
                                        mana: 100,
                                        atk: 10,
                                        max_hp: 100,
                                        def: 10,
                                        weapons: '0',
                                        tools: '0'
                                    },
                                    "item": {
                                        "weapons": {}, "tools": {}
                                    },
                                    "items": { "1": 0 },
                                    "ore": { "copper": 0, "iron": 0, "gold": 0, "diamond": 0 },
                                    points: 0
                                },
                            })
                            return api.sendMessage(`✅ Đăng ký thành công!\n🔰 UID: ${event.senderID}\n💌 Level: 1\n🍄 Exp: 0\n🪙 Gold: 1000\n🩸 HP: 100\n🌾 Mana: 100\n🌴 Atk: 10\n🌟 Def: 10\n⚔️ Weapons: ${dataShop.weapons['1']['name']}`, event.threadID, event.messageID)
                        }
                        return api.sendMessage(`⚠️ Bạn đã đăng ký rồi!`, event.threadID, event.messageID)
                    }
                    case "2": {
                        return this.attackDungeon(event.senderID, this.getData()[event.senderID].map, api, event)
                    }
                    case "3": {
                        return api.sendMessage(`|› 1. Shop Vũ Khí\n|› 2. Shop Đồ Dùng\n|› 3. Shop Trang Bị\n|› 4. Shop Áo Giáp\n\n📌 Reply (phản hồi) STT để thực hiện yêu cầu`, event.threadID, (error, info) => {
                            global.client.handleReply.push({
                                name: this.config.name,
                                messageID: info.messageID,
                                author: event.senderID,
                                type: "shop"
                            })
                        }, event.messageID)
                    }
                    case "4": {
                        return api.sendMessage(`|› 1. Xem kho vũ khí\n|› 2.Xem kho đồ\n|› 3. Xem kho trang bị\n\n📌 Reply (phản hồi) STT để thực hiện yêu cầu`, event.threadID, (error, info) => {
                            global.client.handleReply.push({
                                name: this.config.name,
                                messageID: info.messageID,
                                author: event.senderID,
                                type: "inventory"
                            })
                        }, event.messageID)
                    }
                    case "5": {
                        return api.sendMessage(`[ Danh Sách Khu Vực ]\n──────────────────\n|› 1. Khu Vực Đánh Quái\n|› 2. Khu Vực Đào Đá\n\n📌 Reply tin nhắn này theo số thứ tự để đổi khu vực!`, event.threadID, (error, info) => {
                            global.client.handleReply.push({
                                name: this.config.name,
                                messageID: info.messageID,
                                author: event.senderID,
                                type: "chooseMap"
                            })
                        }, event.messageID)
                    }
                    case "6": {
                        return this.mine(event.senderID, api, event)
                    }
                    case "7": {
                        return api.sendMessage(`|› 1. Nâng cấp vũ khí\n|› 2. Nâng cấp công cụ\n\n📌 Reply tin nhắn này theo số thự tự để lựa chọn!`, event.threadID, (error, info) => {
                            global.client.handleReply.push({
                                name: this.config.name,
                                messageID: info.messageID,
                                author: event.senderID,
                                type: "upgrade"
                            })
                        }, event.messageID)
                    }
                    case "8": {
                        var data = this.getData()[event.senderID]
                        return api.sendMessage(`[ Thông Tin ]\n💌 Level: ${data.dataUser.level}\n🍄 Exp: ${data.dataUser.exp}\n🪙 Gold: ${data.dataUser.gold}\n🩸 HP: ${data.dataUser.hp}\n💉 Mana: ${data.dataUser.mana}\n🌾 Atk: ${data.dataUser.atk}\n🌴 Def: ${data.dataUser.def}\n⚔️ Weapons: ${data.dataUser.weapons}\n📝 Điểm tích lũy: ${data.points}\n\n📌 Thả '❤' tin nhắn này để cộng điểm tích lũy!`, event.threadID, (error, info) => {
                            global.client.handleReaction.push({
                                name: this.config.name,
                                messageID: info.messageID,
                                author: event.senderID,
                                type: "addPoint"
                            })
                        })
                    }
                    case "9": {
                        return api.sendMessage(`|› 1. Quay Vũ Khí\n|› 2. Quay Áo Giáp\n\n📌 Reply tin nhắn này theo số thứ tự để lựa chọn!`, event.threadID, (error, info) => {
                            global.client.handleReply.push({
                                name: this.config.name,
                                messageID: info.messageID,
                                author: event.senderID,
                                type: "roll"
                            })
                        }, event.messageID)
                    }
                    case "10": {
                        return api.sendMessage(`⚠️ Tag người bạn muốn đánh hoặc reply tin nhắn này và gõ 'list' để xem danh sách người chơi!`, event.threadID, (error, info) => {
                            global.client.handleReply.push({
                                name: this.config.name,
                                messageID: info.messageID,
                                author: event.senderID,
                                type: "fight"
                            }, event.messageID)
                        })
                    }
                }
            }
                break;
            case "shop": {
                switch (event.body) {
                    case "1": {
                        await this.displayShopItems(dataShop.weapons, "buyWeapon", event, api)
                    }
                        break;
                    case "2": {
                        await this.displayShopItems(dataShop.items, "buyItem", event, api)
                    }
                        break;
                    case "3": {
                        await this.displayShopItems(dataShop.tools, "buyTool", event, api)
                    }
                        break;
                    case "4": {
                        await this.displayShopItems(dataShop.armor, "buyArmor", event, api)
                    }
                        break;
                }
            }
                break;
            case "buyWeapon": {
                var data = this.getData()[event.senderID]
                if (data.dataUser.gold < dataShop.weapons[event.body]['price']) return api.sendMessage(`❎ Bạn không đủ tiền để mua vật phẩm này!`, event.threadID, event.messageID)
                if (dataShop.weapons[event.body]['name'] == data.dataUser.weapons) return api.sendMessage(`⚠️ Bạn đã sở hữu vật phẩm này!`, event.threadID, event.messageID)
                data.dataUser.gold -= dataShop.weapons[event.body]['price']
                data.item['weapons'][dataShop.weapons[event.body]['name']] = {
                    ...dataShop.weapons[event.body]
                }
                this.setData({ ...this.getData(), [event.senderID]: data })
                return api.sendMessage({ body: `✅ Bạn đã mua thành công vật phẩm ${dataShop.weapons[event.body]['name']}!`, attachment: await this.getImage(dataShop.weapons[event.body]['image']) }, event.threadID, event.messageID)
            }
            case "inventory": {
                var data = this.getData()[event.senderID]
                var arr = [], msg = ``
                switch (event.body) {
                    case "1": {
                        for (var i = 0; i < Object.keys(data.item.weapons).length; i++) {
                            var weapon = data.item.weapons[Object.keys(data.item.weapons)[i]]
                            msg += `${i + 1}. ${Object.keys(data.item.weapons)[i]}\n💌 Level: ${weapon['level']}\n💪 Sức chịu đựng: ${weapon['durability']}\n────────────────\n`
                            var getImage = await this.getImage(weapon['image'])
                            arr.push(getImage)
                            if (i == Object.keys(data.item.weapons).length - 1) {
                                return api.sendMessage({ body: `[ KHO VŨ KHÍ ]\n${msg}\n📌 Reply tin nhắn này theo số thứ tự để sử dụng vũ khí!`, attachment: arr }, event.threadID, (error, info) => {
                                    global.client.handleReply.push({
                                        name: this.config.name,
                                        messageID: info.messageID,
                                        author: event.senderID,
                                        type: "useWeapon",
                                        data: Object.keys(data.item.weapons)
                                    })
                                }, event.messageID)
                            }
                        }
                    }
                        break;
                    case '2': {
                        for (var i = 0; i < Object.keys(data.items).length; i++) {
                            var item = dataShop.items[Object.keys(data.items)[i]]
                            msg += `${i + 1}. ${dataShop.items[Object.keys(data.items)[i]]['name']}\n📊 Số lượng: ${data.items[Object.keys(data.items)[i]]}\n🩸 Số phần trăm máu hồi lại: ${dataShop.items[Object.keys(data.items)[i]]['heal_percentage']}\n────────────────\n`
                            var getImage = await this.getImage(item['image'])
                            arr.push(getImage)
                            if (i == Object.keys(data.items).length - 1) {
                                return api.sendMessage({ body: `[ KHO ĐỒ DÙNG ]\n${msg}\n📌 Reply tin nhắn này theo số thứ tự để sử dụng đồ dùng!\nVí dụ: 1 2 (1 là id đồ dùng, 2 là số lượng)`, attachment: arr }, event.threadID, (error, info) => {
                                    global.client.handleReply.push({
                                        name: this.config.name,
                                        messageID: info.messageID,
                                        author: event.senderID,
                                        type: "useItem"
                                    })
                                }, event.messageID)
                            }
                        }
                    }
                        break;
                    case '3': {
                        for (var i = 0; i < Object.keys(data.item.armor).length; i++) {
                            var armor = data.item.armor[Object.keys(data.item.armor)[i]]
                            msg += `${i + 1}. ${Object.keys(data.item.armor)[i]}\n💌 Level: ${armor['level']}\n💪 Sức chịu đựng: ${armor['durability']}\n────────────────\n`
                            var getImage = await this.getImage(armor['image'])
                            arr.push(getImage)
                            if (i == Object.keys(data.item.armor).length - 1) {
                                return api.sendMessage({ body: `[ KHO GIÁP ]\n${msg}\n📌 Reply tin nhắn này theo số thứ tự để sử dụng giáp!`, attachment: arr }, event.threadID, (error, info) => {
                                    global.client.handleReply.push({
                                        name: this.config.name,
                                        messageID: info.messageID,
                                        author: event.senderID,
                                        type: "useArmor",
                                        data: Object.keys(data.item.armor)
                                    })
                                }, event.messageID)
                            }
                        }
                    }
                }
            }
                break;
            case "useWeapon": {
                var dataUser = this.getData()[event.senderID]
                var weapons = handleReply.data
                var dataWeapon = dataUser.item.weapons[weapons[parseInt(event.body) - 1]]
                if (!dataWeapon) return api.sendMessage("❎ Vũ khí không tồn tại!", event.threadID, event.messageID)
                for (let i = 0; i < Object.entries(dataShop.weapons).length; i++) {
                    if (Object.entries(dataShop.weapons)[i][1]['name'] != dataUser.dataUser.weapons) {
                        dataUser.dataUser.atk -= Object.entries(dataShop.weapons)[i][1]['damage']
                        break;
                    }
                    else {
                        return api.sendMessage("⚠️ Bạn đã sử dụng vũ khí này rồi!", event.threadID, event.messageID)
                    }
                }
                dataUser.dataUser.weapons = weapons[parseInt(event.body) - 1]
                dataUser.dataUser.atk += dataWeapon['damage']
                this.setData({ ...this.getData(), [event.senderID]: dataUser })
                return api.sendMessage({ body: `✅ Bạn đã sử dụng thành công vũ khí ${weapons[parseInt(event.body) - 1]}!`, attachment: await this.getImage(dataWeapon['image']) }, event.threadID, event.messageID)
            }
            case "useItem": {
                var data = this.getData()[event.senderID]
                var body = event.body.split(" ")
                var getID = body[0], amount = parseInt(body[1])
                var id_item = Object.keys(data.items)[parseInt(getID) - 1]
                if (!id_item || !amount) return api.sendMessage(`❎ Bạn chưa nhập đủ thông tin!\nVí dụ: 1 2 (1 là id đồ dùng, 2 là số lượng)`, event.threadID, event.messageID)
                if (!data.items[id_item]) return api.sendMessage(`❎ Bạn không có đồ dùng này!`, event.threadID, event.messageID)
                if (data.items[id_item] < amount) return api.sendMessage(`❎ Bạn không có đủ đồ dùng này!`, event.threadID, event.messageID)
                if (this.useItem(event.senderID, id_item, amount)) {
                    return api.sendMessage(`✅ Bạn đã sử dụng đồ dùng "${dataShop.items[id_item]['name']}" thành công!\nMáu của bạn đã hồi phục ${dataShop.items[id_item]['heal_percentage'].split("%")[0] * amount}%`, event.threadID, event.messageID)
                }
                return api.sendMessage(`❎ Bạn không có đồ dùng này!`, event.threadID, event.messageID)
            }
            case "useArmor": {
                var data = this.getData()[event.senderID]
                var armor = handleReply.data
                var dataArmor = data.item.armor[armor[parseInt(event.body) - 1]]
                if (!dataArmor) return api.sendMessage("❎ Giáp không tồn tại!", event.threadID, event.messageID)
                for (let i = 0; i < Object.entries(dataShop.armor).length; i++) {
                    console.log(Object.entries(dataShop.armor)[i][1]['name'])
                    console.log(data.dataUser.armor)
                    if (Object.entries(dataShop.armor)[i][1]['name'] != data.dataUser.armor) {
                        data.dataUser.def -= Object.entries(dataShop.armor)[i][1]['defense']
                        data.dataUser.hp -= Object.entries(dataShop.armor)[i][1]['hp']
                        break;
                    }
                    else {
                        return api.sendMessage(`⚠️ Bạn đã đang sử dụng giáp này!`, event.threadID, event.messageID);
                    }
                }
                data.dataUser.armor = armor[parseInt(event.body) - 1]
                data.dataUser.def += dataArmor['defense']
                data.dataUser.hp += dataArmor['hp']
                this.setData({ ...this.getData(), [event.senderID]: data })
                return api.sendMessage({ body: `✅ Bạn đã sử dụng thành công giáp ${armor[parseInt(event.body) - 1]}!`, attachment: await this.getImage(dataArmor['image']) }, event.threadID, event.messageID)
            }
            case "buyItem": {
                if (!dataShop.items[event.body]) return api.sendMessage(`❎ Vật phẩm bạn nhập không tồn tại!`, event.threadID, event.messageID);
                return api.sendMessage(`👉 Nhập số lượng ${dataShop.items[event.body]['name']} bạn muốn mua!`, event.threadID, (error, info) => {
                    global.client.handleReply.push({
                        name: this.config.name,
                        messageID: info.messageID,
                        author: event.senderID,
                        type: "buyItem2",
                        item: event.body
                    })
                }, event.messageID)
            }
            case "buyItem2": {
                var data = this.getData()[event.senderID]
                if (data.dataUser.gold < dataShop.items[handleReply.item]['price'] * parseInt(event.body)) return api.sendMessage(`❎ Bạn không đủ tiền để mua vật phẩm này!`, event.threadID, event.messageID)
                if (event.body <= 0) return api.sendMessage(`❎ Số lượng không hợp lệ!`, event.threadID, event.messageID)
                data.dataUser.gold -= dataShop.items[handleReply.item]['price'] * parseInt(event.body)
                if (handleReply.item in data.items) {
                    data.items[handleReply.item] += parseInt(event.body)
                }
                else {
                    data.items[handleReply.item] = parseInt(event.body)
                }
                this.setData({ ...this.getData(), [event.senderID]: data })
                return api.sendMessage(`✅ Bạn đã mua thành công ${event.body} ${dataShop.items[handleReply.item]['name']}!`, event.threadID, event.messageID)
            }
            case "chooseMap": {
                switch (event.body) {
                    case "1": {
                        var valueKeyMap = Object.keys(dataDungeon)
                        var msg = ``
                        valueKeyMap.forEach((item, index) => {
                            var nameMap = item.split("_")[0], levelMap = item.split("_")[1]
                            if (nameMap == "mine") return;
                            msg += `${index + 1}. ${nameMap} - Level: ${levelMap}\n`
                        });
                        return api.sendMessage(`⛳ Chọn map bạn muốn vào!\n${msg}\n📌 Reply số thứ tự bạn muốn vào!`, event.threadID, (error, info) => {
                            global.client.handleReply.push({
                                name: this.config.name,
                                messageID: info.messageID,
                                author: event.senderID,
                                mapData: valueKeyMap,
                                type: "changeMap"
                            })
                        }, event.messageID)
                    }
                    case "2": {
                        var data = Object.entries(this.mapMine())
                        console.log(data[0][1])
                        var msg = ``
                        for (let i = 0; i < data.length; i++) {
                            msg += `${i + 1}. ⛳ Khu: ${data[i][0]}\n📝 Yêu cầu : ${dataShop.tools[data[i][1]['requirePickaxe']]['name']} trở lên\n🏭 Khoáng sản gồm: ${data[i][1]['ore'].join(", ")}\n\n`
                        }
                        return api.sendMessage(`🔰 Chọn khu bạn muốn vào!\n${msg}\n\n📌 Reply số khu bạn muốn vào!`, event.threadID, (error, info) => {
                            global.client.handleReply.push({
                                name: this.config.name,
                                messageID: info.messageID,
                                author: event.senderID,
                                type: "changeMapMine",
                                mapData: data
                            })
                        }, event.messageID)
                    }
                }
            }
                break;
            case "changeMap": {
                if (event.body < 1 || event.body > handleReply.mapData.length) return api.sendMessage(`❎ Số không hợp lệ!`, event.threadID, event.messageID)
                var data = this.getData()[event.senderID]
                var map = handleReply.mapData[event.body - 1],
                    mapName = map.split("_")[0],
                    mapLevel = parseInt(map.split("_")[1])
                if (data.dataUser.level < mapLevel) return api.sendMessage(`❎ Bạn cần đạt level ${mapLevel} mới có thể vào map này!`, event.threadID, event.messageID)
                data.map = map
                this.setData({ ...this.getData(), [event.senderID]: data })
                return api.sendMessage(`✅ Bạn đã chuyển đến map '${mapName}' thành công!`, event.threadID, event.messageID)
            }
            case "changeMapMine": {
                if (event.body < 1 || event.body > handleReply.mapData.length) return api.sendMessage(`❎ Số không hợp lệ!`, event.threadID, event.messageID)
                var data = this.getData()[event.senderID]
                if (Object.entries(data.item.tools).length == 0) return api.sendMessage(`❎ Bạn không có công cụ nào để mở khóa khu này!`, event.threadID, event.messageID)
                var map = handleReply.mapData[event.body - 1][0],
                    requirePickaxe = handleReply.mapData[event.body - 1][1]['requirePickaxe'],
                    dataShopEntry = Object.entries(dataShop.tools),
                    nameTool = data.dataUser.tools;
                for (let i = 0; i < dataShopEntry.length; i++) {
                    if (dataShopEntry[i][1]['name'] == nameTool) {
                        var keyTool = dataShopEntry[i][0]
                        break;
                    }
                }
                if (keyTool < requirePickaxe) return api.sendMessage(`📝 Bạn cần có ${dataShop.tools[requirePickaxe]['name']} trở lên để mở khóa khu này!\n📌 Vui lòng trang bị cúp xịn hơn trong inventory!`, event.threadID, event.messageID)
                data.mine = map
                this.setData({ ...this.getData(), [event.senderID]: data })
                return api.sendMessage(`⛳ Bạn đã chuyển đến khu '${map}' thành công!`, event.threadID, event.messageID)
            }
            case "buyTool": {
                var data = this.getData()[event.senderID]
                if (!dataShop.tools[event.body]) return api.sendMessage(`❎ Vật phẩm không tồn tại!`, event.threadID, event.messageID)
                if (data.dataUser.gold < dataShop.tools[event.body]['price']) return api.sendMessage(`❎ Bạn không đủ tiền để mua vật phẩm này!`, event.threadID, event.messageID)
                data.dataUser.gold -= dataShop.tools[event.body]['price']
                if (event.body in data.item.tools) {
                    return api.sendMessage(`⚠️ Bạn đã có vật phẩm này!`, event.threadID, event.messageID)
                }
                else {
                    data.item.tools[dataShop.tools[event.body]['name']] = {
                        ...dataShop.tools[event.body],
                    }
                    data.dataUser.tools = dataShop.tools[event.body]['name']
                    this.setData({ ...this.getData(), [event.senderID]: data })
                }
                return api.sendMessage(`✅ Bạn đã mua thành công ${dataShop.tools[event.body]['name']}!`, event.threadID, event.messageID)
            }
            case "buyArmor": {
                var data = this.getData()[event.senderID]
                if (data.dataUser.gold < dataShop.armor[event.body]['price']) return api.sendMessage(`❎ Bạn không đủ tiền để mua vật phẩm này!`, event.threadID, event.messageID)
                if (dataShop.armor[event.body]['name'] == data.dataUser.armor) return api.sendMessage(`⚠️ Bạn đã có vật phẩm này!`, event.threadID, event.messageID)
                data.dataUser.gold -= dataShop.armor[event.body]['price']
                data.item.armor[dataShop.armor[event.body]['name']] = {
                    ...dataShop.armor[event.body]
                }
                this.setData({ ...this.getData(), [event.senderID]: data })
                return api.sendMessage({ body: `✅ Bạn đã mua thành công ${dataShop.armor[event.body]['name']}!`, attachment: await this.getImage(dataShop.armor[event.body]['image']) }, event.threadID, event.messageID)
            }
            case "upgrade": {
                var data = this.getData()[event.senderID]
                var type = event.body == "1" ? 'weapons' : event.body == '2' ? 'tools' : null
                var getType = data.item[type][data.dataUser[type]]
                if (data.dataUser[type] == "0") return api.sendMessage(`❎ Bạn chưa trang bị hoặc mua cúp!`, event.threadID, event.messageID)
                await this.upgrade(getType.level, event.senderID, api, event, type)
            }
                break;
            case "addPoint2": {
                console.log("hi")
                var data = this.getData()[event.senderID]
                var point = event.body.split(" ")
                if (point.length != 2) return api.sendMessage(`❎ Sai format!`, event.threadID, event.messageID)
                if (parseInt(point[1]) < 1 || parseInt(point[1]) > data.points) return api.sendMessage(`❎ Số điểm tích lũy không hợp lệ!`, event.threadID, event.messageID)
                var type = point[0] == "1" ? 'hp' : point[0] == "2" ? 'mp' : point[0] == "3" ? 'atk' : 'def'
                data.dataUser[type] += parseInt(point[1])
                data.points -= parseInt(point[1])
                this.setData({ ...this.getData(), [event.senderID]: data })
                return api.sendMessage(`✅ Bạn đã cộng thành công ${point[1]} điểm vào ${type}!`, event.threadID, event.messageID)
            }
            case "roll": {
                const obj = {
                    "1": "weapons",
                    "2": "armor"
                }
                var data = this.getData()[event.senderID]
                if (data.dataUser.gold < 50000) return api.sendMessage(`❎ Bạn không đủ tiền quay!\n💵 Bạn cần 50,000$ để quay!`, event.threadID, event.messageID)
                data.dataUser.gold -= 50000
                var type = this.gacha().filter(item => item.type == obj[event.body])
                if (Math.random() <= 0.000000001) {
                    var rarity = type.filter(item => item.rarity == "rare" || item.rarity == "epic")
                    var item = rarity[Math.floor(Math.random() * rarity.length)]
                }
                else {
                    var item = type[Math.floor(Math.random() * type.length)]
                }
                if (item.name in data.item[item.type]) {
                    if (item.rarity != data.item[item.type][item.name].rarity) {
                        data.item[item.type][item.name] = {
                            ...item
                        }
                        this.setData({ ...this.getData(), [event.senderID]: data })
                        return api.sendMessage({ body: `🛒 Bạn đã nhận được ${item.name}!\n😻 Độ hiếm: ${item.rarity}`, attachment: await this.getImage(item.image) }, event.threadID, event.messageID)
                    }
                    else return api.sendMessage({ body: `🛒 Bạn đã có vật phẩm ${item.name}\n🔄 Sẽ tự động quy đổi thành tiền`, attachment: await this.getImage(item.image) }, event.threadID, () => {
                        data.dataUser.gold += 2000
                        this.setData({ ...this.getData(), [event.senderID]: data })
                    })
                }
                data.item[item.type][item.name] = {
                    ...item
                }
                this.setData({ ...this.getData(), [event.senderID]: data })
                return api.sendMessage({ body: `🛒 Bạn đã nhận được ${item.name}!\n😻 Độ hiếm: ${item.rarity}`, attachment: await this.getImage(item.image) }, event.threadID, event.messageID)
            }
            case "fight": {
                const data = this.getData();
                const { body, senderID, threadID, mentions } = event;

                if (body.toLowerCase() === "list") {
                    const list = Object.keys(data).filter(item => item !== senderID && item !== api.getCurrentUserID());
                    const msg = await Promise.all(list.map(async (item, index) => {
                        const getName = await Users.getNameUser(item) || "Không xác định";
                        return `${index + 1}. ${getName}\nLevel: ${data[item].dataUser.level}\nHP: ${data[item].dataUser.hp}/${data[item].dataUser.max_hp}\n`;
                    }));
                    console.log(msg);
                    const message = `📝 Danh sách người chơi:\n${msg.join("")}`;
                    const handleReplyData = {
                        name: this.config.name,
                        author: senderID,
                        type: "fight",
                        listUser: list
                    };
                    return api.sendMessage(message, threadID, (err, info) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        handleReplyData.messageID = info.messageID;
                        global.client.handleReply.push(handleReplyData);
                    });
                }

                let uid = Object.keys(mentions);
                if (uid.length === 0) {
                    uid = handleReply.listUser[body - 1];
                }
                if (!uid || !data[uid]) {
                    return api.sendMessage(`❎ Người chơi không tồn tại!`, threadID, event.messageID);
                }
                await this.attackPlayer(senderID, uid, api, event);
            }
        }
    }

    async upgrade(level, uid, api, event, type) {
        const materials = {
            "5": {
                ore: {
                    copper: 100,
                    iron: 100
                },
                min_price: 30000
            },
            "10": {
                ore: {
                    copper: 200,
                    iron: 200,
                    gold: 100
                },
                min_price: 50000
            },
            "15": {
                ore: {
                    copper: 300,
                    iron: 300,
                    gold: 200,
                    diamond: 100
                },
                min_price: 100000
            }
        };
        console.log(level);
        const data = this.getData()[uid];
        const item = data.item[type];
        const getMaterial = materials[Math.min(Math.floor(level / 5) * 5 + 5, 15)];
        const getOre = getMaterial.ore;
        let check = true;
        for (const ore in getOre) {
            if (data.ore[ore] < getOre[ore] * level) {
                check = false;
                break;
            }
        }
        if (check && data.dataUser.gold >= getMaterial.min_price * level) {
            for (const ore in getOre) {
                data.ore[ore] -= getOre[ore] * level;
            }
            data.dataUser.gold -= getMaterial.min_price * level;
            item[data.dataUser[type]].level += 1;
            item[data.dataUser[type]].durability += level * 100;
            if (item[data.dataUser[type]].hasOwnProperty('damage')) {
                item[data.dataUser[type]].damage += level + 5;
            }
            this.setData({ ...this.getData(), [uid]: data });
            return api.sendMessage(`✅ Bạn đã nâng cấp thành công ${data.dataUser[type]} lên cấp ${item[data.dataUser[type]].level}!`, event.threadID, event.messageID);
        } else {
            const requiredOre = Object.entries(getOre).map(([ore, amount]) => `${ore}: ${amount * level}`).join(", ");
            const requiredGold = getMaterial.min_price * level;
            if (!check) {
                return api.sendMessage(`❎ Bạn không đủ nguyên liệu để nâng cấp!\n🪵 Nguyên liệu cần thiết: ${requiredOre}`, event.threadID, event.messageID);
            } else {
                return api.sendMessage(`❎ Bạn không đủ tiền để nâng cấp!\n💵 Số tiền cần: ${requiredGold}`, event.threadID, event.messageID);
            }
        }
    }
    async displayShopItems(data, type, event, api) {
        var msg = ``
        var arr = []
        for (const [i, item] of Object.entries(data)) {
            msg += `${parseInt(i)}. ${item['name']}\n🌟 Price: ${item['price']}\n`
            if (item.hasOwnProperty('durability')) msg += `⚔️ Durability: ${item['durability']}\n`
            if (item.hasOwnProperty('damage')) msg += `💉 Atk: ${item['damage']}\n`
            if (item.hasOwnProperty('heal_percentage')) msg += `🩸 Số phần trăm máu hồi lại : ${item['heal_percentage']}\n`
            msg += `────────────────\n`
            var getImage = await this.getImage(item['image'])
            arr.push(getImage)
        }
        return api.sendMessage({ body: `${msg}\n📌 Reply tin nhắn này theo số thứ tự để mua`, attachment: arr }, event.threadID, (error, info) => {
            global.client.handleReply.push({
                name: this.config.name,
                messageID: info.messageID,
                author: event.senderID,
                type: type
            })
        }, event.messageID)
    }
    async handleReaction({ api, event, handleReaction }) {
        if (handleReaction.author != event.userID) return;
        switch (handleReaction.type) {
            case "attackDungeon": {
                if (event.reaction == "❤") {
                    api.unsendMessage(handleReaction.messageID)
                    this.attackDungeon(event.userID, this.getData()[event.userID].map, api, event)
                }
                else if (event.reaction == "👍") {
                    var data = this.getData()[event.userID]
                    var items = Object.keys(data.items)
                    var arr = [], msg = ""
                    items.forEach(async (item, index) => {
                        msg += `${index + 1}. ${dataShop.items[item]['name']}\nSố lượng: ${data.items[item]}\n`
                        const getImage = await this.getImage(dataShop.items[item]['image'])
                        arr.push(getImage)
                        if (index == items.length - 1) {
                            return api.sendMessage({ body: `[ KHO ĐỒ DÙNG ]\n${msg}\n📌 Reply tin nhắn này theo số thứ tự để sử dụng đồ dùng!\nVí dụ: 1 2 (1 là id đồ dùng, 2 là số lượng)`, attachment: arr }, event.threadID, (error, info) => {
                                global.client.handleReply.push({
                                    name: this.config.name,
                                    messageID: info.messageID,
                                    author: event.userID,
                                    type: "useItem"
                                })
                            }, event.messageID)
                        }
                    })
                }
            }
                break;
            case "mine": {
                if (event.reaction == "❤") {
                    this.mine(event.userID, api, event)
                }
            }
                break;
            case "addPoint": {
                if (event.reaction == "❤") {
                    return api.sendMessage(`|› 1. Máu\n|› 2. Mana\n|› 3. Atk\n|› 4. Def\n📌 Reply tin nhắn này theo format: "1 3" <1 là danh mục, 3 là số điểm muốn cộng>`, event.threadID, (err, info) => {
                        global.client.handleReply.push({
                            name: this.config.name,
                            messageID: info.messageID,
                            author: event.userID,
                            type: "addPoint2"
                        })
                    }, event.messageID)
                }
            }
        }
    }
}

module.exports = new Module()