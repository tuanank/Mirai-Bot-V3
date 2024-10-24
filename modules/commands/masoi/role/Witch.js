const Ability = require('../ability');
const Format = require('../format');
const Gang = require('../gang');
const {symbols} = require('../helper');
const Villager = require('./Villager');

module.exports = class Witch extends Villager {
	constructor(options) {
		super({
			...options,
			...{}
		});
		this.potion = {
			save: true,
			kill: true
		};
	}

	async onNight(movementBefore) {
		if(this.died) return []
		const requests = [];
		const movements = movementBefore.Werewolf.filter(
			mm => mm.ability == Ability.Bite
		);
		const result = Gang.Werewolf.resultVoting(
			movements,
			this.world.items.length
		);

		if (result.indexKill != -1 && this.potion.save) {
			const victim = this.world.items[result.indexKill];
			requests.push(
				await this.request({
					question() {
						return (
							`[⚜️] ➜ 𝗧𝗼̂́𝗶 𝗻𝗮𝘆 ${victim.name} 𝘀𝗲̃ 𝗯𝗶̣ 𝗹𝘂̃ 𝘀𝗼́𝗶 𝗰𝗮̆́𝗻, 𝗯𝗮̣𝗻 𝗰𝗼́ 𝗺𝘂𝗼̂́𝗻 𝘀𝘂̛̉ 𝗱𝘂̣𝗻𝗴 𝗯𝗶̀𝗻𝗵 [ 𝗰𝘂̛́𝘂 𝗻𝗴𝘂̛𝗼̛̀𝗶 ] 𝗸𝗵𝗼̂𝗻𝗴 💉?\n` +
							`[⚜️] ➜ ${symbols[1]} 𝗖𝗼́ ♥\n` +
							`[⚜️] ➜ ${symbols[2]} 𝗞𝗵𝗼̂𝗻𝗴 😈`
						);
					},
					check(player, value) {
						const choose = player.format(value, ['1', '2']) == '1';
						player.sendMessage(
							choose
								? `[⚜️] ➜ 𝗕𝗮̣𝗻 𝘀𝘂̛̉ 𝗱𝘂̣𝗻𝗴 𝗯𝗶̀𝗻𝗵 [ 𝗰𝘂̛́𝘂 𝗻𝗴𝘂̛𝗼̛̀𝗶 ] 𝗹𝗲̂𝗻 ${victim.name} 💉`
								: `[⚜️] ➜ 𝗕𝗮̣𝗻 𝘃𝘂̛̀𝗮 𝗰𝗵𝗼̣𝗻 𝗸𝗵𝗼̂𝗻𝗴 𝗰𝘂̛́𝘂 ${victim.name} 😈`
						);
						return choose;
					},
					async nightend(player, choose, listDeaths) {
						if (choose == null) return;
						if (choose == true) {
							player.potion.save = false;
							const index = listDeaths.findIndex(
								death => death.index == victim.index
							);
							if (index != -1) listDeaths.splice(index, 1);
						}
					}
				})
			);
		}

		if (this.potion.kill) {
			requests.push(
				await this.request({
					question(player) {
						return (
							`[⚜️] ➜ 𝗕𝗮̣𝗻 𝗰𝗼́ 𝗺𝘂𝗼̂́𝗻 𝘀𝘂̛̉ 𝗱𝘂̣𝗻𝗴 ${
								requests.length > 0 ? '𝘁𝗵𝗲̂𝗺 ' : ''
							}𝗯𝗶̀𝗻𝗵 [ 𝗴𝗶𝗲̂́𝘁 𝗻𝗴𝘂̛𝗼̛̀𝗶 ] 𝘃𝗮̀ 𝗴𝗶𝗲̂́𝘁 𝗮𝗶 𝗸𝗵𝗼̂𝗻𝗴 🧪?\n` +
							player.world.game.listPlayer({died: false})
						);
					},
					check(player, value) {
						const index = player.format(
							value,
							Format.validIndex,
							Format.isAlive,
							Format.notSelf
						);
						player.sendMessage(
							`[⚜️] ➜ 𝗕𝗮̣𝗻 𝘃𝘂̛̀𝗮 𝗰𝗵𝗼̣𝗻 𝗴𝗶𝗲̂́𝘁 ${player.world.items[index].name} 🧪`
						);
						return index;
					},
					async nightend(player, index) {
						if (index == null) return;
						player.potion.kill = false;
						return index;
					}
				})
			);
		}
		return requests;
	}
};
