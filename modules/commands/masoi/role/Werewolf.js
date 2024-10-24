const Ability = require('../ability');
const {Party} = require('../enum');
const Gang = require('../gang');
const Role = require('./Role');

module.exports = class Werewolf extends Role {
	constructor(options) {
		super({
			...options,
			...{
				gang: Gang.Werewolf
			}
		});
	}

	async voteBite() {
		if(this.died) return []
		if(this.Sick) {
			this.Sick = false
			await this.sendMessage('[⚜️] ➜ 𝗕𝗮̣𝗻 𝗵𝗶𝗲̣̂𝗻 𝗰𝗼̀𝗻 𝗯𝗶̣ 𝗻𝗵𝗶𝗲̂̃𝗺 𝗯𝗲̣̂𝗻𝗵 𝗻𝗲̂𝗻 𝘁𝗼̂́𝗶 𝗻𝗮𝘆 𝗸𝗵𝗼̂𝗻𝗴 𝘁𝗵𝗲̂̉ 𝗰𝗮̆́𝗻 𝗻𝗴𝘂̛𝗼̛̀𝗶 !');
			return []
		}
		return [await this.request(Ability.Bite)];
	}

	isWin() {
		const werewolfCount = this.world.items.filter(
			player => !player.died && player.party == Party.WEREWOLF
		).length;
		const villagerCount = this.world.items.filter(
			player => !player.died && player.party == Party.VILLAGER
		).length;
		return werewolfCount >= villagerCount;
	}
};
