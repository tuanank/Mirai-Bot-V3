const Format = require('../format');
const Ability = require('./Ability');

module.exports = class RoleReveal extends Ability {
	static question(player) {
		return (
			'[⚜️] ➜ 𝗕𝗮̣𝗻 𝗺𝘂𝗼̂́𝗻 𝘅𝗲𝗺 𝘃𝗮𝗶 𝘁𝗿𝗼̀ 𝗰𝘂̉𝗮 𝗮𝗶 𝘁𝗿𝗼𝗻𝗴 𝗱𝗮𝗻𝗵 𝘀𝗮́𝗰𝗵 🧛🏻‍♂️:\n' +
			player.world.game.listPlayer()
		);
	}

	static check(player, value) {
		const index = player.format(value, Format.validIndex, Format.notSelf);
		player.sendMessage(
			`[⚜️] ➜ 𝗕𝗮̣𝗻 𝘃𝘂̛̀𝗮 𝗰𝗵𝗼̣𝗻 𝘅𝗲𝗺 𝘃𝗮𝗶 𝘁𝗿𝗼̀ 𝗰𝘂̉𝗮 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗰𝗵𝗼̛𝗶 ${player.world.items[index].name} 🧛🏻‍♂️`
		);
		return index;
	}

	static async nightend(player, index, listDeaths) {
		if (index == null) return;
		const target = player.world.items[index];
		await player.sendMessage(
			`[⚜️] ➜ 𝗩𝗮𝗶 𝘁𝗿𝗼̀ 𝗰𝘂̉𝗮 ${target.name} 𝗹𝗮̀ ${target.role.name}`
		);
	}
};
