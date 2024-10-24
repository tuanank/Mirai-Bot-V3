const Format = require('../format');
const Ability = require('./Ability');

module.exports = class Kill extends Ability {
	static question(player) {
		return (
			'[⚜️] ➜ 𝗕𝗮̣𝗻 𝗺𝘂𝗼̂́𝗻 𝗯𝗮̆́𝗻 𝗮𝗶 𝘁𝗿𝗼𝗻𝗴 𝗱𝗮𝗻𝗵 𝘀𝗮́𝗰𝗵 🔫:\n' + player.world.game.listPlayer({died: false})
		)
	}

	static check(player, value) {
		const index = player.format(
			value,
			Format.validIndex,
			Format.alive,
			Format.notSelf
		);
		const {name} = player.world.items[index];
		player.sendMessage(`[⚜️] ➜ 𝗕𝗮̣𝗻 𝘃𝘂̛̀𝗮 𝗰𝗵𝗼̣𝗻 𝗯𝗮̆́𝗻 𝗰𝗵𝗲̂́𝘁 ${name} 🩸`);
		return index;
	}

	static async nightend(player, index, listDeaths) {
		if (index == null) return;
		return index;
	}
};
