const {Party} = require('../enum');
const Format = require('../format');
const Ability = require('./Ability');

module.exports = class Investigator extends Ability {
	static question(player) {
		return (
			'[⚜️] ➜ 𝗩𝘂𝗶 𝗹𝗼̀𝗻𝗴 𝗰𝗵𝗼̣𝗻 𝟯 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝘁𝗿𝗼𝗻𝗴 𝗱𝗮𝗻𝗵 𝘀𝗮́𝗰𝗵 🕵🏻: \n' +
			player.world.game.listPlayer() +
			'\n[⚜️] ➜ 𝗛𝘂̛𝗼̛́𝗻𝗴 𝗱𝗮̂̃𝗻: <𝗻𝗴𝘂̛𝗼̛̀𝗶 𝟭><𝗱𝗮̂́𝘂 𝗰𝗮́𝗰𝗵><𝗻𝗴𝘂̛𝗼̛̀𝗶 𝟮><𝗱𝗮̂́𝘂 𝗰𝗮́𝗰𝗵><𝗻𝗴𝘂̛𝗼̛̀𝗶 𝟯>. 𝗩𝗗: 𝟯 𝟮 𝟭'
		);
	}

	static check(player, value) {
		const trios = value
			.split(' ')
			.slice(0, 3)
			.map(val => player.format(val, Format.validIndex, Format.notSelf));
		if (trios.length != 3) {
			throw new Error('[⚜️] ➜ 𝗩𝘂𝗶 𝗹𝗼̀𝗻𝗴 𝗰𝗵𝗼̣𝗻 𝗰𝗵𝗶́𝗻𝗵 𝘅𝗮́𝗰 𝟯 𝗻𝗴𝘂̛𝗼̛̀𝗶 !');
		}
		Format.diff(player, trios);
		player.sendMessage(
			`[⚜️] ➜ 𝗕𝗮̣𝗻 𝘃𝘂̛̀𝗮 𝗰𝗵𝗼̣𝗻 𝟯 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗻𝗵𝘂̛ 𝘀𝗮𝘂: ${trios
				.map(index => player.world.items[index].name)
				.join(', ')}`
		);
		return trios;
	}

	static async nightend(player, trios, listDeaths) {
		if (trios == null) return;
		let rep = `[⚜️] ➜ 𝗧𝗿𝗼𝗻𝗴 𝟯 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗰𝗵𝗼̛𝗶: ${trios
			.map(index => player.world.items[index].name)
			.join(', ')}, `;
		const filtered = trios.filter(
			index => player.world.items[index].party != Party.VILLAGER
		);
		rep +=
			filtered.length > 0
				? '𝗰𝗼́ 𝗶́𝘁 𝗻𝗵𝗮̂́𝘁 𝟭 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗸𝗵𝗼̂𝗻𝗴 𝗽𝗵𝗮̉𝗶 𝗽𝗵𝗲 𝗩𝗜𝗟𝗟𝗔𝗚𝗘𝗥 ⚠️'
				: '𝗰𝗮̉ 𝟯 𝗹𝗮̀ 𝗽𝗵𝗲 𝗩𝗜𝗟𝗟𝗔𝗚𝗘𝗥';
		player.sendMessage(rep);
	}
};
