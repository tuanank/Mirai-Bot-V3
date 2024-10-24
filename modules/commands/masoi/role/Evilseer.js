const Ability = require('../ability');
const Gang = require('../gang');
const Werewolf = require('./Werewolf');

module.exports = class Evilseer extends Werewolf {
	constructor(options) {
		super({
			...options,
			...{}
		});
	}

	async onNight() {
		return this.isAlone() ? [] : [await this.request(Ability.RoleReveal)];
	}
	
	async voteBite() {
		if(this.died) return []
		if(this.Sick) {
			this.Sick = false
			await this.sendMessage('[⚜️] ➜ 𝗕𝗮̣𝗻 𝗵𝗶𝗲̣̂𝗻 𝗰𝗼̀𝗻 𝗯𝗶̣ 𝗻𝗵𝗶𝗲̂̃𝗺 𝗯𝗲̣̂𝗻𝗵 𝗻𝗲̂𝗻 𝘁𝗼̂́𝗶 𝗻𝗮𝘆 𝗸𝗵𝗼̂𝗻𝗴 𝘁𝗵𝗲̂̉ 𝗰𝗮̆́𝗻 !');
			return []
		}
		return this.isAlone() ? await super.voteBite() : [];
	}

	isAlone() {
		const werewolfs = this.world.items.filter(
			player => player.role == Werewolf
		);
		const alives = werewolfs.filter(werewolf => !werewolf.died);
		return alives.length <= 0;
	}
};
