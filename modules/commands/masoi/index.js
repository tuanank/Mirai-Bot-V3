const {Data} = require('./constant');
const {State, Party} = require('./enum');
const Role = require('./role');
const World = require('./world');
const {gameConfig, dataSetup, symbols, guide, vietsub} = require('./helper');
const StateManager = require('./State')

const {sendMessage} = global.client.api
const prefix = global.config.PREFIX
const Game = require('./Game')
const gameManager = require('./GameManager')
const shuffle = arr => {
	// thuật toán bogo-sort
	let count = arr.length,
		temp,
		index;

	while (count > 0) {
		index = Math.floor(Math.random() * count);
		count--;
		temp = arr[count];
		arr[count] = arr[index];
		arr[index] = temp;
	}

	return arr; //Bogosort with no điều kiện dừng
};
const asyncWait = async time => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve();
		}, time);
	});
};
module.exports = class MasoiGame extends Game {
	constructor(options = {}) {
		super({
			...options,
			...{
				name: 'Ma Sói'
			}
		});
		if (!this.isGroup)
			return
		if(options.param[0] == 'info') {
			let indexVillage = Number(options.param[1]) - 1;
			if(!options.param[1]) return sendMessage(`[⚜️] ➜ 𝗟𝗲̣̂𝗻𝗵: ${prefix}𝗺𝗮𝘀𝗼𝗶 𝗶𝗻𝗳𝗼 [𝗠𝗮̃ 𝗹𝗮̀𝗻𝗴]`, this.threadID);
			if (!gameConfig.setups[indexVillage]) return sendMessage(`[⚜️] ➜ 𝗞𝗵𝗼̂𝗻𝗴 𝘁𝗶̀𝗺 𝘁𝗵𝗮̂́𝘆 𝗹𝗮̀𝗻𝗴 𝘃𝗼̛́𝗶 𝗺𝗮̃ 𝘀𝗼̂́ ${symbols[options.param[0]]}!`, this.threadID);	
			let msg = '=== 『 𝗧𝗵𝗼̂𝗻𝗴 𝘁𝗶𝗻 𝗰𝗮́𝗰 𝗻𝗵𝗮̂𝗻 𝘃𝗮̣̂𝘁 𝘁𝗿𝗼𝗻𝗴 𝗹𝗮̀𝗻𝗴 』===\n\n'
			for(let i in gameConfig.setups[indexVillage].roles) {
				if(gameConfig.setups[indexVillage].roles[i] == 0) continue
				msg += `${vietsub(i)}: ${gameConfig.setups[indexVillage].roles[i]} 𝗻𝗴𝘂̛𝗼̛̀𝗶\n`
			}
			return sendMessage(msg, this.threadID)
		}
		const indexVillage = Number(options.param[0]) - 1;
		if (!options.param[0] || isNaN(indexVillage)) {
            var body = `🐺==== 「 𝐌𝐀 𝐒𝐎́𝐈 」 ====🐺\n━━━━━━━━━━━━━━\n\n[⚜️] ➜ 𝗛𝘂̛𝗼̛́𝗻𝗴 𝗱𝗮̂̃𝗻 𝘁𝗮̣𝗼: ${prefix}𝗺𝗮𝘀𝗼𝗶 <𝗺𝗮̃ 𝗹𝗮̀𝗻𝗴>\n` +
            '=== 『 𝗧𝗵𝗼̂𝗻𝗴 𝘁𝗶𝗻 𝗰𝗮́𝗰 𝗹𝗮̀𝗻𝗴 』===\n' +
            gameConfig.setups.map((setup, index) => {
                const {name, roles} = dataSetup(setup);
                return `${symbols[index + 1]}. ${name} (${roles.length} 𝗻𝗴𝘂̛𝗼̛̀𝗶)\n`;
            })
            body += `\n[🔰] ➜ 𝗫𝗲𝗺 𝗰𝗵𝗶 𝘁𝗶𝗲̂́𝘁 𝗰𝗮́𝗰 𝗻𝗵𝗮̂𝗻 𝘃𝗮̣̂𝘁 𝘁𝗿𝗼𝗻𝗴 𝗹𝗮̀𝗻𝗴: ${prefix}𝗺𝗮𝘀𝗼𝗶 𝗶𝗻𝗳𝗼 [𝗠𝗮̃ 𝗹𝗮̀𝗻𝗴]`
            return sendMessage(body.replace(/,/g, ""), this.threadID);
        }

		if (!gameConfig.setups[indexVillage]) {
            return sendMessage(`[⚜️] ➜ 𝗞𝗵𝗼̂𝗻𝗴 𝘁𝗶̀𝗺 𝘁𝗵𝗮̂́𝘆 𝗹𝗮̀𝗻𝗴 𝘃𝗼̛́𝗶 𝗺𝗮̃ 𝘀𝗼̂́ ${symbols[options.param[0]]}!`, this.threadID);
        }
		this.setup = dataSetup(gameConfig.setups[indexVillage]);
		this.state = new StateManager([State.SETUP, State.PLAY]);
		this.world = new World.Normal({
			game: this
		});

		this.sendMessage(
				'=== 『 🐺 𝐆𝐀𝐌𝐄 𝐌𝐀 𝐒𝐎́𝐈 🐺 』===\n\n' +
				`[⛺️] ➜ 𝗟𝗮̀𝗻𝗴: ${this.setup.name}\n` +
				`[💎] ➜ 𝗦𝗼̂́ 𝗹𝘂̛𝗼̛̣𝗻𝗴: ${this.setup.roles.length}\n` +
				`[💬] ➜ 𝗡𝗵𝗮̆́𝗻 "${gameConfig.ready}" 𝗻𝗲̂́𝘂 𝗺𝘂𝗼̂́𝗻 𝘃𝗮̀𝗼 𝗴𝗮𝗺𝗲\n` +
				`[✅] ➜ 𝗡𝗲̂́𝘂 𝗺𝘂𝗼̂́𝗻 𝗸𝗲̂́𝘁 𝘁𝗵𝘂́𝗰 𝗴𝗮𝗺𝗲 𝘁𝗵𝗶̀ 𝗻𝗵𝗮̆́𝗻 "𝗲𝗻𝗱"\n[✅] ➜ 𝗡𝗲̂́𝘂 𝗺𝘂𝗼̂́𝗻 𝗿𝗼̛̀𝗶 𝗸𝗵𝗼̉𝗶 𝗴𝗮𝗺𝗲 𝘁𝗵𝗶̀ 𝗻𝗵𝗮̆́𝗻 "𝗼𝘂𝘁"\n` +
				`[⚜️] ➜ 𝗟𝘂̛𝘂 𝗬́: 𝗧𝗮̂́𝘁 𝗰𝗮̉ 𝗻𝗵𝘂̛̃𝗻𝗴 𝘂𝘀𝗲𝗿 𝘁𝗿𝘂̛𝗼̛́𝗰 𝗸𝗵𝗶 𝗻𝗵𝗮̂́𝗻 𝗺𝗲𝗽𝗹𝗮𝘆 𝘃𝗮̀𝗼 𝗴𝗮𝗺𝗲, 𝗵𝗮̃𝘆 𝗶𝗯 𝘃𝗼̛́𝗶 𝗻𝗶𝗰𝗸 𝗯𝗼𝘁 𝘁𝗿𝘂̛𝗼̛́𝗰. 𝗕𝘂̛𝗼̛́𝗰 𝗻𝗮̀𝘆 𝗰𝘂̛̣𝗰 𝗸𝗶̀ 𝗾𝘂𝗮𝗻 𝘁𝗿𝗼̣𝗻𝗴 𝗻𝗲̂́𝘂 𝗸𝗵𝗼̂𝗻𝗴 𝘀𝗲̃ 𝗸𝗵𝗼̂𝗻𝗴 𝘁𝗵𝗲̂̉ 𝗰𝗵𝗼̛𝗶\n` +
				`[🔴] ➜ 𝗦𝗼̂́ 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝘀𝗮̆̃𝗻 𝘀𝗮̀𝗻𝗴: [ 𝟭/${this.setup.roles.length} ]`
		);
	}

	async clean() {
		await super.clean();
		if (this.world.isEnd) return;
		this.world.endGame();
		for (const player of this.world.items) {
			player.resolve([null, null]);
		}
	}

	// ---------------------------------------------------------------------------

	async onMessage(message, reply) {
		await super.onMessage(message, reply);
		if (message.body.toLowerCase() == 'end') {
			if (message.senderID == this.masterID) {
				await global.gameManager.clean(this.threadID);
				if (this.state.getCurrent() == State.SETUP)
					await reply('[⚜️] ➜ 𝗞𝗲̂́𝘁 𝘁𝗵𝘂́𝗰 𝗴𝗮𝗺𝗲 𝘁𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴 !');
			} else {
				await reply('[⚜️] ➜ 𝗖𝗵𝗶̉ 𝗰𝗼́ 𝗰𝗵𝘂̉ 𝘁𝗮̣𝗼 𝗴𝗮𝗺𝗲 𝗺𝗼̛́𝗶 𝗰𝗼́ 𝘁𝗵𝗲̂̉ 𝗲𝗻𝗱');
			}
		}
		if (message.body.toLowerCase() == 'out') {
			if(!this.participants.includes(message.senderID)) 
				return await this.sendMessage(`[⚜️] ➜ 𝗕𝗮̣𝗻 𝗰𝗵𝘂̛𝗮 𝘁𝗵𝗮𝗺 𝗴𝗶𝗮 𝗴𝗮𝗺𝗲 𝗻𝗲̂𝗻 𝗸𝗵𝗼̂𝗻𝗴 𝘁𝗵𝗲̂̉ 𝗼𝘂𝘁\n[⚜️] ➜ 𝗧𝗶̀𝗻𝗵 𝘁𝗿𝗮̣𝗻𝗴 𝗴𝗮𝗺𝗲 𝗵𝗶𝗲̣̂𝗻 𝘁𝗮̣𝗶: ${this.participants.length}/${this.setup.roles.length}!`);
			if(message.senderID == this.masterID) 
				return await this.sendMessage(`[⚜️] ➜ 𝗕𝗮̣𝗻 𝗹𝗮̀ 𝗰𝗵𝘂̉ 𝗽𝗵𝗼̀𝗻𝗴 𝗻𝗲̂𝗻 𝗸𝗵𝗼̂𝗻𝗴 𝘁𝗵𝗲̂̉ 𝗿𝗼̛̀𝗶 𝗸𝗵𝗼̉𝗶`)
			const index = this.participants.findIndex(i => i == message.senderID)
			this.participants.splice(index, 1)
			await this.sendMessage(`[⚜️] ➜ 𝗕𝗮̣𝗻 𝘃𝘂̛̀𝗮 𝗼𝘂𝘁 𝗴𝗮𝗺𝗲 𝘁𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴\n[⚜️] ➜ 𝗧𝗶̀𝗻𝗵 𝘁𝗿𝗮̣𝗻𝗴 𝗴𝗮𝗺𝗲 𝗵𝗶𝗲̣̂𝗻 𝘁𝗮̣𝗶: ${this.participants.length}/${this.setup.roles.length}!`);
		}
		const curState = this.state.getCurrent();
		switch (curState) {
		case State.SETUP:
			await this.stateSetup(message, reply);
			break;
		case State.PLAY:
			if (this.participants.includes(message.senderID))
				await this.statePlay(message, reply);
			break;
		}
	}

	//  ____ _____  _  _____ _____
	// / ___|_   _|/ \|_   _| ____|
	// \___ \ | | / _ \ | | |  _|
	//  ___) || |/ ___ \| | | |___
	// |____/ |_/_/   \_\_| |_____|

	async stateSetup(message) {
		if(message.body.toLowerCase() == gameConfig.ready && this.participants.includes(message.senderID)) {
			await this.sendMessage(`[⚠️] ➜ 𝗕𝗮̣𝗻 𝘁𝗵𝗮𝗺 𝗴𝗶𝗮 𝗴𝗮𝗺𝗲 𝗻𝗮̀𝘆 𝘁𝘂̛̀ 𝘁𝗿𝘂̛𝗼̛́𝗰 𝗿𝗼̂̀𝗶 !\n[⚜️] ➜ 𝗧𝗶̀𝗻𝗵 𝘁𝗿𝗮̣𝗻𝗴 𝗴𝗮𝗺𝗲 𝗵𝗶𝗲̣̂𝗻 𝘁𝗮̣𝗶: ${this.participants.length}/${this.setup.roles.length}!`);
		}
		if (message.body.toLowerCase() == gameConfig.ready && this.participants.length < this.setup.roles.length && !this.participants.includes(message.senderID)) {
			this.participants.push(message.senderID);
			if (this.participants.length == this.setup.roles.length) {
				this.state.next();
				shuffle(this.setup.roles);
				for (let i = 0; i < this.participants.length; i++) {
					const participantID = this.participants[i];
					const { name } =  await global.Users.getData(participantID);
					const player = this.world.add(
						new Role[this.setup.roles[i]]({
							index: this.world.items.length,
							world: this.world,
							name: name || '<Chưa kết bạn>',
							threadID: participantID
						})
					);
					this.sendMessage(guide(player), player.threadID);
				}
				const werewolfParty = this.world.items.filter(
					e => e.party == Party.WEREWOLF
				);
				const nameMap = werewolfParty.map(e => e.name);
				for (const player of werewolfParty) {
					if (nameMap.length > 1)
						await player.sendMessage(
							`=== 『 𝗡𝗵𝘂̛̃𝗻𝗴 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗰𝘂̀𝗻𝗴 𝗽𝗵𝗲 𝘃𝗼̛́𝗶 𝗯𝗮̣𝗻 𝗹𝗮̀ 🐺 』===\n${nameMap
								.filter(name => name != player.name)
								.join(
									', '
								)}\n[⚜️] ➜ 𝗛𝗮̃𝘆 𝗹𝗶𝗲̂𝗻 𝗵𝗲̣̂ 𝘃𝗼̛́𝗶 𝗵𝗼̣ 𝘃𝗮̀ 𝘁𝗮̣𝗼 𝟭 𝘁𝗲𝗮𝗺𝘄𝗼𝗿𝗸 𝘁𝗼̂́𝘁 𝗻𝗵𝗮̂́𝘁 𝗻𝗵𝗲́ !`
						);
				}
				let balanceScore = 0;
				for (const role of this.setup.roles) {
					balanceScore += Data[role].score;
				}
				this.sendMessage(
					this.timing({
						message:
							'=== 『 𝐁𝐞𝐠𝐢𝐧 𝐓𝐡𝐞 𝐆𝐚𝐦𝐞 』===\n\n' +
							`[⚖] ➜ 𝗣𝗼𝗶𝗻𝘁 𝗰𝗮̂𝗻 𝗯𝗮̆̀𝗻𝗴: ${balanceScore}\n` +
							'[📖] ➜ 𝗗𝗮𝗻𝗵 𝘀𝗮́𝗰𝗵 𝗹𝗲̣̂𝗻𝗵 (𝗸𝗵𝗼̂𝗻𝗴 𝗰𝗮̂̀𝗻 𝗽𝗿𝗲𝗳𝗶𝘅):\n=== 『 𝗚𝗥𝗢𝗨𝗣 』===\n𝟭. "𝗵𝗲𝗹𝗽": 𝗫𝗲𝗺 𝘃𝗮𝗶 𝘁𝗿𝗼̀ 𝗰𝘂̉𝗮 𝗺𝗶̀𝗻𝗵 !\n𝟮. "𝘀𝘁𝗮𝘁𝘂𝘀": 𝗧𝗶̀𝗻𝗵 𝘁𝗿𝗮̣𝗻𝗴 𝗰𝗮́𝗰 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗰𝗵𝗼̛𝗶 𝗰𝗼̀𝗻 𝘀𝗼̂́𝗻𝗴\n=== 『 𝗣𝗥𝗜𝗩𝗔𝗧𝗘 』===\n𝟭. "𝗽𝗮𝘀𝘀": 𝗕𝗼̉ 𝗾𝘂𝗮 𝗹𝘂̛𝗼̛̣𝘁\n' +
							'\n[⚜️] ➜ 𝗛𝗮̃𝘆 𝘅𝗲𝗺 𝗸𝗶̃ 𝗰𝗵𝗶 𝘁𝗶𝗲̂́𝘁 𝘃𝗮𝗶 𝘁𝗿𝗼̀ 𝗰𝘂̉𝗮 𝗺𝗶̀𝗻𝗵, 𝘁𝗿𝗼̀ 𝗰𝗵𝗼̛𝗶 𝗸𝗵𝗼̛̉𝗶 𝗰𝗵𝗮̣𝘆 𝘀𝗮𝘂',
						time: gameConfig.timeout.DELAY_STARTGAME,
						left: false
					})
				);
				await asyncWait(gameConfig.timeout.DELAY_STARTGAME);
				this.world.startLoop();
			} else {
				await this.sendMessage(`[⌛️] ➜ 𝗧𝗶̀𝗻𝗵 𝘁𝗿𝗮̣𝗻𝗴: ${this.participants.length}/${this.setup.roles.length}!`);
			}
		}
	}

	async statePlay(message, reply) {
		if (message.body.toLowerCase() != 'end') {
			const player = this.world.find({threadID: message.senderID});
			switch (message.body.toLowerCase()) {
			case 'help':
				await this.sendMessage(guide(player), message.senderID);
				break;
			case 'status':
				await this.sendStatus(message.threadID);
				break;
			}
			if (!message.isGroup)
				this.world.find({threadID: message.senderID}).onMessage(message, reply);
		}
	}

	//  _   _ _____ ___ _
	// | | | |_   _|_ _| |
	// | | | | | |  | || |
	// | |_| | | |  | || |___
	//  \___/  |_| |___|_____|

	async sendMessage(message, threadID = this.threadID) {
		await sendMessage(message, threadID);
	}

	timing({message = '', time = 0, left = true} = {}) {
		if (time < 0) time = 0;
		const hh = Math.floor(time / 1000 / 60 / 60);
		const mm = Math.floor((time - hh * 60 * 60 * 1000) / 1000 / 60);
		const ss = Math.ceil((time - hh * 60 * 60 * 1000 - mm * 60 * 1000) / 1000);
		let text = `${ss}s`;
		if (mm > 0) text = `${mm}m ${text}`;
		if (hh > 0) text = `${hh}h ${text}`;
		return left ? `[${text}] ${message}` : `${message} [${text}]`;
	}

	//  	____ _   _    _  _____
	//  / ___| | | |  / \|_   _|
	// | |   | |_| | / _ \ | |
	// | |___|  _  |/ ___ \| |
	//  \____|_| |_/_/   \_\_|

	listPlayer(filter = {}) {
		let text = '';
		for (let index = 0; index < this.world.getLength(); index++) {
			const player = this.world.items[index];

			let pass = true;
			for (const key in filter) {
				if (player[key] !== filter[key]) {
					pass = false;
					break;
				}
			}

			if (pass)
				text += `[☠️] ➜ ${symbols[index + 1]} ${player.name} ${
					player.died ? ' - 𝗖𝗵𝗲̂́𝘁 𝗿𝗼̂̀𝗶' : ''
				}\n`;
		}
		return text;
	}

	async sendStatus(threadID = this.threadID) {
		await this.sendMessage(
			`[🛠] ➜ 𝗧𝗶̀𝗻𝗵 𝗧𝗿𝗮̣𝗻𝗴 𝗣𝗹𝗮𝘆𝗲𝗿:\n${this.listPlayer({died: false})}`,
			threadID
		);
	}
};
