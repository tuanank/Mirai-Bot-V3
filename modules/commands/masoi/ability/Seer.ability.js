const {Party} = require('../enum');
const Format = require('../format');
const Ability = require('./Ability');

module.exports = class Seer extends Ability {
	static question(player) {
		return (
			'[⚜️] ➜ 𝗕𝗮̣𝗻 𝗺𝘂𝗼̂́𝗻 𝘀𝗼𝗶 𝗮𝗶 𝘁𝗿𝗼𝗻𝗴 𝗱𝗮𝗻𝗵 𝘀𝗮́𝗰𝗵 🔍:\n' + player.world.game.listPlayer()
		);
	}

	static check(player, value) {
		const index = player.format(value, Format.validIndex, Format.notSelf);
		player.sendMessage(
			`[⚜️] ➜ 𝗕𝗮̣𝗻 𝘃𝘂̛̀𝗮 𝗰𝗵𝗼̣𝗻 𝘅𝗲𝗺 𝗽𝗵𝗲 𝗰𝘂̉𝗮 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗰𝗵𝗼̛𝗶 ${player.world.items[index].name}!`
		);
		return index;
	}

	static async nightend(player, index, listDeaths) {
	    if (index == null) return;

	    var target = player.world.items[index];
	    var party = target.party;
	    if (target.constructor.name == 'Lycan') party = 4;
	    if (target.constructor.name == 'Minion') party = 2;
	    for (let partyName in Party) {
	        if (Party[partyName] != party) continue;
	        await player.sendMessage(`[⚜️] ➜ 𝗣𝗵𝗲 𝗰𝘂̉𝗮 ${target.name} 𝗹𝗮̀ [ ${partyName} ]`);
	        break;
	    }
	}
};