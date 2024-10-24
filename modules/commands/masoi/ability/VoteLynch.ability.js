const Format = require('../format');
const Ability = require('./Ability');

module.exports = class VoteLynch extends Ability {
	static question(player) {
		return (
			'[⚜️] ➜ 𝗩𝘂𝗶 𝗹𝗼̀𝗻𝗴 𝗰𝗵𝗼̣𝗻 𝟭 𝘁𝗿𝗼𝗻𝗴 𝗺𝗮̂́𝘆 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗰𝗵𝗼̛𝗶 𝗱𝘂̛𝗼̛́𝗶 𝘃𝗮̀ 𝘃𝗼𝘁𝗲 𝘁𝗿𝗲𝗼 𝗰𝗼̂̉ 📊\n' +
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
			`[⚜️] ➜ 𝗕𝗮̣𝗻 𝘃𝘂̛̀𝗮 𝘃𝗼𝘁𝗲 𝘁𝗿𝗲𝗼 𝗰𝗼̂̉ ${player.world.items[index].name} 📊`
		);
		return index;
	}

	static async nightend(player, value, listDeaths) {}
};
