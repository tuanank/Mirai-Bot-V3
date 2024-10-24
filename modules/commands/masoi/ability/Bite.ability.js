const Format = require('../format');
const Ability = require('./Ability');

module.exports = class Bite extends Ability {
	static question(player) {
		return (
			'[⚜️] ➜ 𝗕𝗮̣𝗻 𝗺𝘂𝗼̂́𝗻 𝗰𝗮̆́𝗻 𝗮𝗶 𝘁𝗿𝗼𝗻𝗴 𝗱𝗮𝗻𝗵 𝘀𝗮́𝗰𝗵 🐺: \n' +
			player.world.game.listPlayer({died: false})
		);
	}

	static check(player, value) {
		const index = player.format(
			value,
			Format.validIndex,
			Format.alive,
			Format.notSelf
		);
		player.sendMessage(
			`[⚜️] ➜ 𝗕𝗮̣𝗻 𝘃𝘂̛̀𝗮 𝗰𝗵𝗼̣𝗻 𝗰𝗮̆́𝗻 𝗰𝗵𝗲̂́𝘁 ${player.world.items[index].name} !`
		);
		if(player.world.items[index].constructor.name == 'Diseased') {
			player.Sick = true
			player.sendMessage(
				`[⚜️] ➜ 𝗕𝗮̣𝗻 𝘃𝘂̛̀𝗮 𝗰𝗮̆́𝗻 𝗻𝗵𝗮̂̀𝗺 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗯𝗲̣̂𝗻𝗵 💊 ${player.world.items[index].name}, 𝗯𝗮̣𝗻 𝘀𝗲̃ 𝗺𝗮̂́𝘁 𝗸𝗵𝗮̉ 𝗻𝗮̆𝗻𝗴 𝗰𝗮̆́𝗻 𝘃𝗮̀𝗼 𝘁𝗼̂́𝗶 𝗵𝗼̂𝗺 𝘀𝗮𝘂 🐺`
			);
		}
		return index;
	}

	// static async nightend(player, value, listDeaths) {}
};
