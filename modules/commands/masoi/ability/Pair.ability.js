const {DeathType, Party} = require('../enum');
const Format = require('../format');
const {Death} = require('../type');
const Ability = require('./Ability');

module.exports = class Pair extends Ability {
	static question(player) {
		return (
			'[⚜️] ➜ 𝗕𝗮̣𝗻 𝗺𝘂𝗼̂́𝗻 𝗰𝗵𝗼̣𝗻 𝗮𝗶 𝗹𝗮̀𝗺 𝗰𝗼𝘂𝗽𝗹𝗲 𝘁𝗿𝗼𝗻𝗴 𝗱𝗮𝗻𝗵 𝘀𝗮́𝗰𝗵 💘: \n' +
			player.world.game.listPlayer({died: false}) +
			'\n[⚜️] ➜ 𝗛𝘂̛𝗼̛́𝗻𝗴 𝗱𝗮̂̃𝗻: <𝗻𝗴𝘂̛𝗼̛̀𝗶 𝘁𝗵𝘂̛́ 𝗻𝗵𝗮̂́𝘁><𝗱𝗮̂́𝘂 𝗰𝗮́𝗰𝗵><𝗻𝗴𝘂̛𝗼̛̀𝗶 𝘁𝗵𝘂̛́ 𝗵𝗮𝗶>, 𝗩𝗗: 𝟯 𝟭'
		);
	}

	static check(player, value) {
		const pairs = value
			.split(' ')
			.slice(0, 2)
			.map(val => player.format(val, Format.validIndex, Format.alive));
		if (pairs.length != 2) {
			throw new Error('[⚜️] ➜ 𝗩𝘂𝗶 𝗹𝗼̀𝗻𝗴 𝗰𝗵𝗼̣𝗻 𝗰𝗵𝗶́𝗻𝗵 𝘅𝗮́𝗰 𝟮 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗸𝗵𝗼̂𝗻𝗴 𝗵𝗼̛𝗻 𝗸𝗵𝗼̂𝗻𝗴 𝗸𝗲́𝗺');
		}
		Format.diff(player, pairs);
		const player1 = player.world.items[pairs[0]];
		const player2 = player.world.items[pairs[1]];
		player.sendMessage(
			`[⚜️] ➜ 𝗕𝗮̣𝗻 𝘃𝘂̛̀𝗮 𝗰𝗵𝗼̣𝗻 ${player1.name} 𝘃𝗮̀ ${player2.name} 𝗹𝗮̀𝗺 𝗰𝗼𝘂𝗽𝗹𝗲 💘`
		);
		return pairs;
	}

	static async nightend(player, pairs, listDeaths) {
		if (pairs == null) return;
		const players = pairs.map(index => player.world.items[index]);
		const lastStandWinCondition =
			players[0].party == Party.NEUTRAL || players[0].party != players[1].party;
		let queryParty;
		if (!lastStandWinCondition)
			for (queryParty in Party)
				if (Party[queryParty] == players[0].party) break;

		for (let i = 0; i < 2; i++) {
			const me = players[i];
			const waifu = players[(i + 1) % 2];
			const mePreviousDieFunction = me.die;
			me.waifu = waifu;
			me.die = async death => {
				await mePreviousDieFunction.bind(me)(death);
				if (!waifu.died) await waifu.die(new Death(me, waifu, DeathType.SIMP));
			};
			if (lastStandWinCondition) {
				me.party = Party.NEUTRAL;
				me.isWin = () => {
					if (
						player.world.items.filter(player => !player.died).length == 2 &&
						!player.world.items[players[0].index].died &&
						!player.world.items[players[1].index].died
					) {
						return true;
					}
				};
			}

			me.sendMessage(
				`[⚜️] ➜ 𝗕𝗮̣𝗻 𝘃𝗮̀ ${waifu.name} 𝗹𝗮̀ 𝟭 𝗰𝗼𝘂𝗽𝗹𝗲 (𝗰𝘂𝗽𝗶𝗱) 💘\n[⚜️] ➜ 𝗟𝘂̛𝘂 𝘆́: 𝗖𝗮́𝗰 𝗯𝗮̣𝗻 𝘀𝗲̃ 𝘁𝗵𝗮̆́𝗻𝗴 ${
					lastStandWinCondition
						? '𝗸𝗵𝗶 𝗹𝗮̀ 𝗰𝗼𝘂𝗽𝗹𝗲 𝗰𝘂𝗼̂́𝗶 𝗰𝘂̀𝗻𝗴 𝘀𝗼̂́𝗻𝗴 𝘀𝗼́𝘁 💏'
						: `𝗰𝘂̀𝗻𝗴 𝘃𝗼̛́𝗶 𝗽𝗵𝗲 ${queryParty}`
				}`
			);
		}
	}
};
