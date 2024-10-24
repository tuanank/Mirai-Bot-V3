const Format = require('../format');
const WerewolfGang = require('../gang/Werewolf.gang');
const Ability = require('./Ability');

module.exports = class Seer extends Ability {
	static question(player) {
		return (
			'[⚜️] ➜ 𝗕𝗮̣𝗻 𝗺𝘂𝗼̂́𝗻 𝗯𝗮̉𝗼 𝘃𝗲̣̂ 𝗮𝗶 𝘁𝗿𝗼𝗻𝗴 𝗱𝗮𝗻𝗵 𝘀𝗮́𝗰𝗵 🛡:\n' +
			player.world.game.listPlayer({died: false})
		);
	}

	static check(player, value) {
		const index = player.format(value, Format.validIndex, Format.alive);
		if (player.lastProtectIndex == index) {
			throw new Error('[⚜️] ➜ 𝗕𝗮̣𝗻 𝗸𝗵𝗼̂𝗻𝗴 𝘁𝗵𝗲̂̉ 𝗯𝗮̉𝗼 𝘃𝗲̣̂ 𝟮 𝗹𝗮̂̀𝗻 𝗰𝗵𝗼 𝗰𝘂̀𝗻𝗴 𝟭 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗰𝗵𝗼̛𝗶 🚫');
		}
		const {name} = player.world.items[index];
		player.sendMessage(`[⚜️] ➜ 𝗕𝗮̣𝗻 𝘃𝘂̛̀𝗮 𝗰𝗵𝗼̣𝗻 𝗯𝗮̉𝗼 𝘃𝗲̣̂ 𝗰𝗵𝗼 ${name} 🛡`);
		return index;
	}

	static async nightend(player, index, listDeaths) {
		if (index == null) return;
		for (let i = 0; i < listDeaths.length; i++) {
			const death = listDeaths[i];
			if (death.index == index && death.killer.constructor == WerewolfGang)
				listDeaths.splice(i--, 1);
		}
		player.lastProtectIndex = index;
	}
};
