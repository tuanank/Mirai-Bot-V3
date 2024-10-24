const {DeathType} = require('../enum');
const Villager = require('./Villager');

module.exports = class Diseased extends Villager {
	constructor(options) {
		super({
			...options,
			...{}
		});
	}

	async die(death) {
		await super.die(death);
		if (death.type == DeathType.GANG)
			await this.sendMessage('[⚜️] ➜ 𝗩𝗶̀ 𝗯𝗮̣𝗻 𝗹𝗮̀ 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗯𝗲̣̂𝗻𝗵 𝗻𝗲̂𝗻 𝗰𝗼𝗻 𝘀𝗼́𝗶 𝗰𝗮̆́𝗻 𝗯𝗮̣𝗻 𝘀𝗲̃ 𝗸𝗵𝗼̂𝗻𝗴 𝘁𝗵𝗲̂̉ 𝗰𝗮̆́𝗻 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝘃𝗮̀𝗼 𝗯𝘂𝗼̂̉𝗶 𝘁𝗼̂́𝗶 𝘁𝗶𝗲̂́𝗽 𝘁𝗵𝗲𝗼 !');
	}
};
