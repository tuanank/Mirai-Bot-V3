const Ability = require('../ability');
const {DeathType} = require('../enum');
const Format = require('../format');
const {Death} = require('../type');
const Villager = require('./Villager');

module.exports = class Hunter extends Villager {
	constructor(options) {
		super({
			...options,
			...{}
		});
	}

	async die(death) {
		await super.die(death);
		if (death.type == DeathType.LYNCH)
			await this.sendMessage('[⚜️] ➜ 𝗕𝗮̣𝗻 𝗵𝗶𝗲̣̂𝗻 𝗯𝗶̣ 𝗰𝗮̉ 𝗹𝗮̀𝗻𝗴 𝘁𝗿𝗲𝗼 𝗰𝗼̂̉ !');
		else await this.sendMessage('[⚜️] ➜ 𝗕𝗮̣𝗻 𝘃𝘂̛̀𝗮 𝗯𝗶̣ 𝗴𝗶𝗲̂́𝘁 💐');

		const {checkerResult} = await this.request(Ability.Kill);
		if (checkerResult != null) {
			const victim = this.world.items[checkerResult];
			await victim.sendMessage('[⚜️] ➜ 𝗕𝗮̣𝗻 𝘃𝘂̛̀𝗮 𝗯𝗶̣ [ 𝗛𝘂𝗻𝘁𝗲𝗿 ] 𝗯𝗮̆́𝗻 𝗰𝗵𝗲̂́𝘁 !');
			await this.world.game.sendMessage(
				'[⚜️] ➜ 𝗖𝗼́ 𝗺𝗼̣̂𝘁 𝘁𝗶𝗲̂́𝗻𝗴 𝘀𝘂́𝗻𝗴 𝘃𝗮𝗻𝗴 𝗹𝗲̂𝗻 𝗸𝗵𝗮̆́𝗽 𝗰𝗮̉ 𝗹𝗮̀𝗻𝗴 🔫'
			);
			await victim.die(new Death(this, victim, DeathType.P2P));
		}
	}
};
