const {Data} = require('../constant');
const {DeathType} = require('../enum');
const Gang = require('../gang');
const {Movement} = require('../type');
const {gameConfig} = require('../helper');

module.exports = class Role {
	constructor({
		index,
		world,
		name,
		threadID,
		gang = Gang.Isolate,
		role = this.constructor,
		party = Data[this.constructor.name].party
	} = {}) {
		this.index = index; // Không dùng id để phân biệt, dùng index vì thao tác array nhanh hơn
		this.world = world;
		this.name = name;
		this.threadID = threadID;
		this.died = false;
		this.gang = gang;
		this.resolve = () => {};
		this.role = role;
		this.party = party;
	}

	async onMessage(message, reply) {
		if (!this.resolve.ability) return;
		switch (message.body.toLowerCase()) {
		case 'pass':
			reply('[⚜️] ➜ 𝗕𝗮̣𝗻 𝘃𝘂̛̀𝗮 𝗯𝗼̉ 𝗹𝘂̛𝗼̛̣𝘁 💩');
			this.resolve([null, null]);
			break;
		default:
			try {
				const checkerResult = this.resolve.ability.check(this, message.body);
				this.resolve([message.body, checkerResult]);
			} catch (e) {
				await reply(e.message);
			}
			break;
		}
	}

	request(ability, time = gameConfig.timeout[ability.name] || 30000) {
		return new Promise(resolve => {
			const timeoutID = setTimeout(() => {
				this.sendMessage('[⚜️] ➜ 𝗛𝗲̂́𝘁 𝘁𝗵𝗼̛̀𝗶 𝗴𝗶𝗮𝗻 𝗿𝗼̂̀𝗶 ⌛');
				this.resolve([null, null]);
			}, time);

			this.resolve = result => {
				this.resolve = () => {};
				if (result == null) {
					return resolve(new Movement(ability, null, this.index, null, 'real'));
				}
				const [value, checkerResult] = result;
				clearTimeout(timeoutID);
				resolve(
					new Movement(ability, value, this.index, checkerResult, 'real')
				);
			};

			this.resolve.ability = ability;
			this.sendMessage(
				this.world.game.timing({message: ability.question(this), time})
			);
		});
	}

	async sendMessage(message, threadID = this.threadID) {
		await this.world.game.sendMessage(message, threadID);
	}

	format(value, ...formats) {
		for (let index = 0; index < formats.length; index++) {
			if(formats[index] == undefined) continue;
			if (Array.isArray(formats[index])) {
				if (!formats[index].includes(value))
					throw new Error(
						`[⚜️] ➜ 𝗩𝘂𝗶 𝗹𝗼̀𝗻𝗴 𝗻𝗵𝗮̣̂𝗽 𝟭 𝘁𝗿𝗼𝗻𝗴 𝗰𝗮́𝗰 𝗴𝗶𝗮́ 𝘁𝗿𝗶̣ 𝘀𝗮𝘂: ${formats[index].join(
							', '
						)}!`
					);
			} else {
				value = formats[index](this, value);
			}
		}
		return value;
	}

	async nightend(movements, listDeaths) {}

	async onNight() {
		return [];
	}

	async die(death) {
		this.died = true;
		let rep =
			`[⚜️] ➜ 𝗖𝗵𝘂́𝗻𝗴 𝘁𝗼̂𝗶 𝘃𝗼̂ 𝗰𝘂̀𝗻𝗴 𝘁𝗵𝘂̛𝗼̛𝗻𝗴 𝘁𝗶𝗲̂́𝗰 𝗯𝗮́𝗼 𝘁𝗶𝗻: ${this.name} (𝗯𝗮̣𝗻) ` +
			`𝘃𝘂̛̀𝗮 𝗵𝗶 𝘀𝗶𝗻𝗵 𝘃𝗮̀𝗼 𝗯𝘂𝗼̂̉𝗶 𝘁𝗼̂́𝗶 𝘁𝗵𝘂̛́ ${
				this.world.history.items.filter(item => item.event == 'night').length
			} !\n`;
		switch (death.type) {
		case DeathType.P2P:
			if (death.killer != death.victim)
				rep += `[⚜️] ➜ 𝗡𝗴𝘂𝘆𝗲̂𝗻 𝗻𝗵𝗮̂𝗻 𝗰𝗵𝗲̂́𝘁: 𝗕𝗶̣ ${death.killer.name} (${death.killer.constructor.name}) 𝗴𝗶𝗲̂́𝘁 🩸\n`;
			else rep += '[⚜️] ➜ 𝗡𝗴𝘂𝘆𝗲̂𝗻 𝗻𝗵𝗮̂𝗻 𝗰𝗵𝗲̂́𝘁: 𝗧𝘂̛̣ 𝘁𝘂̛̉';
			break;
		case DeathType.GANG:
			rep += `[⚜️] ➜ 𝗡𝗴𝘂𝘆𝗲̂𝗻 𝗻𝗵𝗮̂𝗻 𝗰𝗵𝗲̂́𝘁: 𝗕𝗮̆𝗻𝗴 𝗵𝗼̣̂𝗶 ${death.killer.constructor.name} 𝗵𝗶𝗲̂́𝗽 𝗱𝗮̂𝗺 𝘁𝗮̣̂𝗽 𝘁𝗵𝗲̂̉ 𝘁𝗼̛́𝗶 𝗰𝗵𝗲̂́𝘁 ⚰️\n`;
			break;
		case DeathType.LYNCH:
			rep += '[⚜️] ➜ 𝗡𝗴𝘂𝘆𝗲̂𝗻 𝗻𝗵𝗮̂𝗻 𝗰𝗵𝗲̂́𝘁: 𝗗𝗮̂𝗻 𝗹𝗮̀𝗻𝗴 𝘁𝗿𝗲𝗼 𝗰𝗼̂̉\n';
			break;
		case DeathType.SIMP:
			rep += `[⚜️] ➜ 𝗡𝗴𝘂𝘆𝗲̂𝗻 𝗻𝗵𝗮̂𝗻 𝗰𝗵𝗲̂́𝘁: 𝗖𝗵𝗲̂́𝘁 𝘁𝗵𝗲𝗼 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝘆𝗲̂𝘂 ${this.waifu.name}\n`;
			break;
		default:
			rep += '[⚜️] ➜ 𝗡𝗴𝘂𝘆𝗲̂𝗻 𝗻𝗵𝗮̂𝗻 𝗰𝗵𝗲̂́𝘁: 𝗖𝗵𝘂̛𝗮 𝗿𝗼̃\n';
		}
		rep += '[⚜️] ➜ 𝗟𝘂̛𝘂 𝘆́: 𝗛𝗮̃𝘆 𝗶𝗺 𝗹𝗮̣̆𝗻𝗴 𝘃𝗮̀ 𝘅𝗲𝗺 𝘁𝗶𝗲̂́𝗽 𝘁𝗿𝗼̀ 𝗰𝗵𝗼̛𝗶 𝗸𝗵𝗼̂𝗻𝗴 𝗰𝗵𝗮𝘁 𝗴𝗶̀ 𝗰𝗮̉\n';
		await this.sendMessage(rep);
	}

	isWin() {
		return false;
	}
};
