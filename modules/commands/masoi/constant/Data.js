const {Party} = require('../enum');
/* {
	score: ,
	party: Party.,
	description: '',
	advice: ''
} */
//new Diseased, Mayor, Minion
module.exports = {
	Apprentice: {
		score: +3,
		party: Party.VILLAGER,
		description: '𝗔𝗽𝗽𝗿𝗲𝗻𝘁𝗶𝗰𝗲 𝘁𝗿𝗼̛̉ 𝘁𝗵𝗮̀𝗻𝗵 𝗚𝗼𝗼𝗱𝘀𝗲𝗲𝗿 𝗻𝗲̂́𝘂 𝗚𝗼𝗼𝗱𝘀𝗲𝗲𝗿 𝗰𝗵𝗲̂́𝘁',
		advice: '𝗖𝗼̂́ 𝗴𝗮̆́𝗻𝗴 𝗴𝗶𝗲̂́𝘁 𝗵𝗲̂́𝘁 𝗽𝗵𝗲 𝗦𝗼́𝗶 ⚔',
		image: __dirname + "/image/Apprentice.png"
	},
	Diseased: {
		score: +3,
		party: Party.VILLAGER,
		description: '𝗡𝗲̂́𝘂 𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗯𝗲̣̂𝗻𝗵 𝗯𝗶̣ 𝗦𝗼́𝗶 𝗰𝗮̆́𝗻, 𝘁𝗵𝗶̀ 𝗦𝗼́𝗶 𝘀𝗲̃ 𝗸𝗵𝗼̂𝗻𝗴 𝘁𝗵𝗲̂̉ 𝗰𝗮̆́𝗻 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗻𝗮̀𝗼 𝘃𝗮̀𝗼 𝗯𝘂𝗼̂̉𝗶 𝘁𝗼̂́𝗶 𝘁𝗶𝗲̂́𝗽 𝘁𝗵𝗲𝗼 𝗱𝗼 𝗯𝗶̣ 𝗯𝗲̣̂𝗻𝗵.',
		advice: '𝗛𝗶 𝘀𝗶𝗻𝗵 𝗰𝗵𝗼 𝘀𝗼́𝗶 𝗰𝗮̆́𝗻 𝗻𝗵𝗮̆̀𝗺 𝗸𝗶̀𝗺 𝗵𝗮̃𝗺 𝘀𝘂̛̣ 𝗵𝘂𝗻𝗴 𝗯𝗮̣𝗼 𝗰𝘂̉𝗮 𝗹𝘂̃ 𝘀𝗼́𝗶 𝘃𝗮̀ 𝗴𝗶𝗮̀𝗻𝗵 𝘁𝗶̉ 𝗹𝗲̣̂ 𝘁𝗵𝗮̆́𝗻𝗴 𝗱𝗼 𝗽𝗵𝗲 𝗗𝗮̂𝗻 💊',
		image: __dirname + "/image/Diseased.png"
	},
	Pacifist: {
		score: -1,
		party: Party.VILLAGER,
		description: '𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗬𝗲̂𝘂 𝗵𝗼̀𝗮 𝗯𝗶̀𝗻𝗵 𝗹𝘂𝗼̂𝗻 𝘃𝗼𝘁𝗲 𝗰𝗵𝗼 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗰𝗵𝗼̛𝗶 𝗽𝗵𝗶𝗲̂́𝘂 𝘀𝗼̂́𝗻𝗴.',
		advice: '𝗛𝗮̃𝘆 𝘁𝗶𝗻 𝘃𝗮̀𝗼 𝗯𝗮̉𝗻 𝘁𝗵𝗮̂𝗻 𝘃𝗮̀ 𝟭 𝗽𝗵𝗶𝗲̂́𝘂 𝘃𝗼𝘁𝗲 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 𝗹𝘂𝗼̂𝗻 𝘁𝗶́𝗻𝗵 𝗹𝗮̀ 𝗽𝗵𝗶𝗲̂́𝘂 𝗰𝘂̛́𝘂 ☘',
		image: __dirname + "/image/Pacifist.png"
	},
	Mayor: {
		score: +2,
		party: Party.VILLAGER,
		description: '𝗣𝗵𝗶𝗲̂́𝘂 𝗯𝗶𝗲̂̉𝘂 𝗾𝘂𝘆𝗲̂́𝘁 𝗰𝘂̉𝗮 𝗧𝗵𝗶̣ 𝘁𝗿𝘂̛𝗼̛̉𝗻𝗴 𝘀𝗲̃ 𝘁𝗶́𝗻𝗵 𝗹𝗮̀ 𝟮 𝗽𝗵𝗶𝗲̂́𝘂 𝗸𝗵𝗶 𝗯𝗶𝗲̂̉𝘂 𝗾𝘂𝘆𝗲̂́𝘁 𝘁𝗿𝗲𝗼 𝗰𝗼̂̉.',
		advice: '𝗦𝘂𝘆 𝗻𝗴𝗵𝗶̃ 𝘁𝗵𝗮̣̂𝘁 𝗸𝗶̃ 𝘁𝗿𝘂̛𝗼̛́𝗰 𝗸𝗵𝗶 𝘃𝗼𝘁𝗲 𝗻𝗵𝗲́ 👑',
		image: __dirname + "/image/Mayor.png"
	},
	Minion: {
		score: +6,
		party: Party.WEREWOLF,
		description: ' 𝗞𝗲̉ 𝗽𝗵𝗮̉𝗻 𝗯𝗼̣̂𝗶 𝘁𝗵𝘂̛́𝗰 𝗱𝗮̣̂𝘆 𝗰𝘂̀𝗻𝗴 𝗦𝗼́𝗶 𝘃𝗮̀ 𝗯𝗶𝗲̂́𝘁 𝗦𝗼́𝗶 𝗹𝗮̀ 𝗮𝗶. 𝗧𝗵𝗮𝗺 𝗴𝗶𝗮 𝗰𝘂̀𝗻𝗴 𝗦𝗼́𝗶 𝘃𝗮̀ 𝗴𝗶𝗲̂́𝘁 𝗗𝗮̂𝗻 𝗹𝗮̀𝗻𝗴. 𝗧𝘂𝘆 𝗻𝗵𝗶𝗲̂𝗻 𝗸𝗵𝗶 𝗧𝗶𝗲̂𝗻 𝘁𝗿𝗶 𝗸𝗵𝗶 𝘀𝗼𝗶 𝘃𝗮̀𝗼 𝗣𝗵𝗮̉𝗻 𝗯𝗼̣̂𝗶 𝘁𝗵𝗶̀ 𝘃𝗮̂̃𝗻 𝗿𝗮 𝗱𝗮̂𝗻 𝗹𝗮̀𝗻𝗴.',
		advice: '𝗖𝗼̂́ 𝗴𝗮̆́𝗻𝗴 𝗴𝗶𝗲̂́𝘁 𝗵𝗲̂́𝘁 𝗱𝗮̂𝗻 𝗹𝗮̀𝗻𝗴 ️🎭',
		image: __dirname + "/image/Minion.png"
	},
	Bodyguard: {
		score: +3,
		party: Party.VILLAGER,
		description:
			'𝗠𝗼̂̃𝗶 𝗯𝘂𝗼̂̉𝗶 𝘁𝗼̂́𝗶, 𝗕𝗼𝗱𝘆𝗴𝘂𝗮𝗿𝗱 𝘀𝗲̃ 𝗰𝗵𝗼̣𝗻 𝗺𝗼̣̂𝘁 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗯𝗮̂́𝘁 𝗸𝗶̀ 𝘃𝗮̀ 𝗯𝗮̉𝗼 𝘃𝗲̣̂, 𝗻𝗲̂́𝘂 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗮̂́𝘆 𝗯𝗶̣ 𝗦𝗼́𝗶 𝗰𝗮̆́𝗻, 𝘀𝗲̃ 𝗸𝗵𝗼̂𝗻𝗴 𝗯𝗶̣ 𝗰𝗵𝗲̂́𝘁 𝘃𝗮̀𝗼 𝘀𝗮́𝗻𝗴 𝗵𝗼̂𝗺 𝘀𝗮𝘂',
		advice: '𝗖𝗼̂́ 𝗴𝗮̆́𝗻𝗴 𝗾𝘂𝗮𝗻 𝘀𝗮́𝘁 𝘃𝗮̀ 𝗰𝘂̛́𝘂 𝘀𝗼̂́𝗻𝗴 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗯𝗶̣ 𝗵𝗮̣𝗶 👀',
		image: __dirname + "/image/Bodyguard.png"
	},
	Cupid: {
		score: -3,
		party: Party.VILLAGER,
		description:
			'𝗖𝘂𝗽𝗶𝗱 𝘁𝗵𝘂̛́𝗰 𝗱𝗮̣̂𝘆 𝗯𝘂𝗼̂̉𝗶 𝘁𝗼̂́𝗶 𝗻𝗴𝗮̀𝘆 𝟭 𝘃𝗮̀ 𝗰𝗵𝗼̣𝗻 𝟮 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝘁𝗿𝗼̛̉ 𝘁𝗵𝗮̀𝗻𝗵 𝗰𝗼𝘂𝗽𝗹𝗲 𝗰𝘂̉𝗮 𝗻𝗵𝗮𝘂 𝘃𝗮̀ 𝘀𝗲̃ 𝗯𝗶𝗲̂́𝘁 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗸𝗶𝗮 𝗰𝗵𝘂̛́𝗰 𝗻𝗮̆𝗻𝗴 𝗹𝗮̀ 𝗴𝗶̀. 𝗡𝗲̂́𝘂 𝟭 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗰𝗵𝗲̂́𝘁, 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗸𝗶𝗮 𝘀𝗲̃ 𝗰𝗵𝗲̂́𝘁 𝗻𝗴𝗮𝘆 𝗹𝗮̣̂𝗽 𝘁𝘂̛́𝗰',
		advice: '𝗢̂𝗻𝗴 𝘁𝗼̛ 𝗯𝗮̀ 𝗻𝗴𝘂𝘆𝗲̣̂𝘁 𝗾𝘂𝘆𝗲̂̀𝗻 𝗹𝘂̛̣𝗰 💘',
		image: __dirname + "/image/Cupid.png"
	},
	Evilseer: {
		score: -6,
		party: Party.WEREWOLF,
		description:
			'𝗠𝗼̂̃𝗶 𝗯𝘂𝗼̂̉𝗶 𝘁𝗼̂́𝗶, 𝗘𝘃𝗶𝗹𝘀𝗲𝗲𝗿 𝘀𝗲̃ 𝗰𝗵𝗼̣𝗻 𝟭 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗰𝗵𝗼̛𝗶 𝘃𝗮̀ 𝘅𝗲𝗺 𝘃𝗮𝗶 𝘁𝗿𝗼̀ 𝘃𝗮̀ 𝘁𝗿𝗼̛̉ 𝘁𝗵𝗮̀𝗻𝗵 𝗪𝗲𝗿𝗲𝘄𝗼𝗹𝗳 𝗸𝗵𝗶 𝗸𝗵𝗼̂𝗻𝗴 𝗰𝗼̀𝗻 𝗺𝗼̣̂𝘁 𝗰𝗼𝗻 𝘀𝗼́𝗶 𝗻𝗮̀𝗼',
		advice: '𝗖𝗼̂́ 𝗴𝗮̆́𝗻𝗴 𝗾𝘂𝗮𝗻 𝘀𝗮́𝘁 𝘃𝗮̀ 𝘁𝗶̀𝗺 𝗿𝗮 𝗻𝗵𝘂̛̃𝗻𝗴 𝗸𝗲̉ 𝗾𝘂𝗮𝗻 𝘁𝗿𝗼̣𝗻𝗴 🔎',
		image: __dirname + "/image/Evilseer.png"
	},
	Fruitbrute: {
		score: -3,
		party: Party.WEREWOLF,
		description:
			'𝗠𝗼̂̃𝗶 𝗯𝘂𝗼̂̉𝗶 𝘁𝗼̂́𝗶, 𝘁𝗵𝘂̛́𝗰 𝗱𝗮̣̂𝘆 𝗰𝘂̀𝗻𝗴 𝗻𝗵𝘂̛̃𝗻𝗴 𝗰𝗼𝗻 𝗦𝗼́𝗶 𝗸𝗵𝗮́𝗰. 𝗡𝗲̂́𝘂 𝗯𝗮̣𝗻 𝗹𝗮̀ 𝗰𝗼𝗻 𝗦𝗼́𝗶 𝗰𝘂𝗼̂́𝗶 𝗰𝘂̀𝗻𝗴 𝗰𝗼̀𝗻 𝘀𝗼̂́𝗻𝗴, 𝗯𝗮̣𝗻 𝗸𝗵𝗼̂𝗻𝗴 𝘁𝗵𝗲̂̉ 𝗰𝗵𝗼̣𝗻 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗰𝗵𝗼̛𝗶 𝗻𝗮̀𝗼 𝘃𝗮̀ 𝗮̆𝗻 𝘁𝗵𝗶̣𝘁 𝗵𝗼̣',
		advice: '𝗖𝗼̂́ 𝗴𝗮̆́𝗻𝗴 𝗴𝗶𝗲̂́𝘁 𝗵𝗲̂́𝘁 𝗱𝗮̂𝗻 𝗹𝗮̀𝗻𝗴 🐺',
		image: __dirname + "/image/Fruitbrute.png"
	},
	Goodseer: {
		score: +7,
		party: Party.VILLAGER,
		description: '𝗠𝗼̂̃𝗶 𝗯𝘂𝗼̂̉𝗶 𝘁𝗼̂́𝗶, 𝗡𝗵𝗮̀ 𝘁𝗶𝗲̂𝗻 𝘁𝗿𝗶 𝘀𝗲̃ 𝗰𝗵𝗼̣𝗻 𝟭 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗰𝗵𝗼̛𝗶 𝘃𝗮̀ 𝘀𝗼𝗶 𝗽𝗵𝗲',
		advice:
			'𝗖𝗼̂́ 𝗴𝗮̆́𝗻𝗴 𝗾𝘂𝗮𝗻 𝘀𝗮́𝘁 𝘃𝗮̀ 𝘁𝗶̀𝗺 𝗿𝗮 𝘀𝗼́𝗶 𝘁𝗿𝗼𝗻𝗴 𝗯𝘂𝗼̂̉𝗶 𝘁𝗼̂́𝗶, 𝗯𝗮𝗻 𝗻𝗴𝗮̀𝘆 𝗰𝗼̂́ 𝗴𝗮̆́𝗻𝗴 𝘁𝗵𝘂𝘆𝗲̂́𝘁 𝗽𝗵𝘂̣𝗰 𝗺𝗼̣𝗶 𝗻𝗴𝘂̛𝗼̛̀𝗶 🔮',
		image: __dirname + "/image/Goodseer.png"
	},
	Hunter: {
		score: +3,
		party: Party.VILLAGER,
		description:
			'𝗡𝗲̂́𝘂 𝗧𝗵𝗼̛̣ 𝗦𝗮̆𝗻 𝗰𝗵𝗲̂́𝘁 𝗯𝗼̛̉𝗶 𝗯𝗮̂́𝘁 𝗸𝗶̀ 𝗹𝗶́ 𝗱𝗼 𝗴𝗶̀, 𝗵𝗮̆́𝗻 𝘃𝗮̂̃𝗻 𝗰𝗼́ 𝘁𝗵𝗲̂̉ 𝗯𝗮̆́𝗻 𝟭 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗰𝗵𝗼̛𝗶 𝗸𝗵𝗮́𝗰',
		advice: '𝗖𝗵𝗮̆𝗺 𝗰𝗵𝘂́ 𝘁𝗶̀𝗺 𝗿𝗮 𝗦𝗼́𝗶 𝘃𝗮̀ 𝗯𝗮̆́𝗻 𝗻𝗼́ 🔫',
		image: __dirname + "/image/Hunter.png"
	},
	Investigator: {
		score: +7,
		party: Party.VILLAGER,
		description:
			'𝗠𝗼̂̃𝗶 𝗯𝘂𝗼̂̉𝗶 𝘁𝗼̂́𝗶, 𝗜𝗻𝘃𝗲𝘀𝘁𝗶𝗴𝗮𝘁𝗼𝗿 𝘀𝗲̃ 𝗰𝗵𝗼̣𝗻 𝟯 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝘃𝗮̀ 𝘀𝗲̃ 𝗰𝗼́ 𝗰𝗵𝘂̛́𝗰 𝗻𝗮̆𝗻𝗴 𝗯𝗶𝗲̂́𝘁 𝗿𝗮̆̀𝗻𝗴 𝗰𝗼́ 𝗶́𝘁 𝗻𝗵𝗮̂́𝘁 𝟭 𝘀𝗼́𝗶 𝘁𝗿𝗼𝗻𝗴 𝟯 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗮̂́𝘆',
		advice: '𝗩𝗮𝗶 𝘁𝗿𝗼̀ 𝗻𝗮̀𝘆 𝗿𝗮̂́𝘁 𝗺𝗮̣𝗻𝗵, 𝗵𝗮̃𝘆 𝘁𝗮̣̂𝗻 𝗱𝘂̣𝗻𝗴 𝗻𝗼́ ✝️',
		image: __dirname + "/image/Investigator.png"
	},
	Lycan: {
		score: -1,
		party: Party.VILLAGER,
		description:
			'𝗟𝘆𝗰𝗮𝗻 𝗺𝗮𝗻𝗴 𝘁𝗿𝗼𝗻𝗴 𝗺𝗶̀𝗻𝗵 𝗱𝗼̀𝗻𝗴 𝗺𝗮́𝘂 𝗰𝘂̉𝗮 𝗹𝗼𝗮̀𝗶 𝘀𝗼́𝗶 𝘃𝗮̀ 𝘅𝗲𝗺 𝗻𝗵𝘂̛ 𝗹𝗮̀ 𝗦𝗼́𝗶 𝗻𝗲̂́𝘂 𝗻𝗵𝘂̛ 𝗯𝗶̣ 𝗚𝗼𝗼𝗱𝘀𝗲𝗲𝗿 𝘀𝗼𝗶 𝗺𝗮̣̆𝗰 𝗱𝘂̀ 𝗸𝗵𝗼̂𝗻𝗴 𝗽𝗵𝗮̉𝗶',
		advice: '𝗗𝗲̂̃ 𝗯𝗶̣ 𝗹𝗮̀𝗻𝗴 𝗵𝗶𝗲̂̉𝘂 𝗹𝗮̂̀𝗺, 𝗵𝗮̃𝘆 𝗴𝗶𝗮̉𝗶 𝘁𝗵𝗶́𝗰𝗵 𝗵𝗼̣ 𝗿𝗼̃ 𝗿𝗮̀𝗻𝗴 🗣️',
		image: __dirname + "/image/Lycan.png"
	},
	Oldman: {
		score: 0,
		party: Party.VILLAGER,
		description:
			'𝗢𝗹𝗱𝗺𝗮𝗻 𝘀𝗲̃ 𝗰𝗵𝗲̂́𝘁 𝘃𝗮̀𝗼 𝗯𝘂𝗼̂̉𝗶 𝘁𝗼̂́𝗶 𝗻𝗴𝗮̀𝘆 𝘁𝗵𝘂̛́ 𝗫 (𝗫 = 𝘀𝗼̂́ 𝗹𝘂̛𝗼̛̣𝗻𝗴 𝘀𝗼́𝗶 𝗵𝗶𝗲̣̂𝗻 𝘁𝗮̣𝗶 𝘁𝗿𝗼𝗻𝗴 𝗴𝗮𝗺𝗲 +𝟭)',
		advice: '𝗕𝗮̂́𝘁 𝗻𝗴𝗼̛̀ 𝗰𝗵𝘂̛𝗮 𝗼̂𝗻𝗴 𝗱𝗮̀ 👴',
		image: __dirname + "/image/Oldman.png"
	},
	Tanner: {
		score: +1,
		party: Party.NEUTRAL,
		description: '𝗖𝗵𝗮́𝗻 𝗦𝗼̂́𝗻𝗴 𝗰𝗵𝗶̉ 𝘁𝗵𝗮̆́𝗻𝗴 𝗸𝗵𝗶 𝗮𝗻𝗵 𝘁𝗮 𝗯𝗶̣ 𝘁𝗿𝗲𝗼 𝗰𝗼̂̉',
		advice: '𝗛𝗮̃𝘆 𝗰𝗼̂́ 𝗴𝗮̆́𝗻𝗴 𝗯𝗶̣ 𝘁𝗿𝗲𝗼 𝗰𝗼̂̉ ☠️',
		image: __dirname + "/image/Tanner.png"
	},
	Villager: {
		score: +1,
		party: Party.VILLAGER,
		description:
			'𝗗𝗮̂𝗻 𝗹𝗮̀𝗻𝗴 𝗰𝘂̀𝗻𝗴 𝘃𝗼̛́𝗶 𝗻𝗵𝘂̛̃𝗻𝗴 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗰𝗼́ 𝗰𝗵𝘂̛́𝗰 𝗻𝗮̆𝗻𝗴 𝘁𝗶̀𝗺 𝗰𝗮́𝗰𝗵 𝗹𝗮̣̂𝗽 𝗹𝘂𝗮̣̂𝗻 𝘃𝗮̀ 𝘁𝗶̀𝗺 𝗸𝗶𝗲̂́𝗺 𝗿𝗮 𝗮𝗶 𝗹𝗮̀ 𝗦𝗼́𝗶 𝗮̂̉𝗻 𝗺𝗶̀𝗻𝗵 𝗱𝘂̛𝗼̛́𝗶 𝗹𝗼̛́𝗽 𝗻𝗴𝘂̛𝗼̛̀𝗶',
		advice:
			'𝗛𝗮̃𝘆 𝗹𝗮̀𝗺 𝘃𝗮𝗶 𝘁𝗿𝗼̀ 𝗱𝗮̂𝗻 𝗹𝗮̀𝗻𝗴 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 𝘁𝗿𝗼̛̉ 𝗻𝗲̂𝗻 𝗰𝗼́ 𝗶́𝗰𝗵, 𝗯𝗮̣𝗻 𝗰𝗼́ 𝘁𝗵𝗲̂̉ 𝘃𝗼𝘁𝗲 𝘁𝗿𝗲𝗼 𝗰𝗼̂̉ 𝗦𝗼́𝗶 𝗺𝗮̀ ⛓',
		image: __dirname + "/image/Villager.png"
	},
	Werewolf: {
		score: -6,
		party: Party.WEREWOLF,
		description:
			'𝗦𝗼́𝗶 𝘀𝗲̃ 𝗯𝗶𝗲̂́𝘁 𝗺𝗮̣̆𝘁 𝗻𝗵𝘂̛̃𝗻𝗴 𝗰𝗼𝗻 𝗸𝗵𝗮́𝗰 𝘃𝗮̀𝗼 𝗯𝘂𝗼̂̉𝗶 𝘁𝗼̂́𝗶 𝘁𝗵𝘂̛́ 𝗻𝗵𝗮̂́𝘁. 𝗠𝗼̂̃𝗶 𝗯𝘂𝗼̂̉𝗶 𝘁𝗼̂́𝗶 𝗻𝗴𝗮̀𝘆 𝘁𝗵𝘂̛́ 𝗵𝗮𝗶, 𝗦𝗼́𝗶 𝗽𝗵𝗮̉𝗶 𝘁𝗵𝗼̂́𝗻𝗴 𝗻𝗵𝗮̂́𝘁 𝟭 𝗻𝗮̣𝗻 𝗻𝗵𝗮̂𝗻 𝘃𝗮̀ 𝗴𝗶𝗲̂́𝘁 𝗵𝗼̣',
		advice: '𝗖𝗼̂́ 𝗴𝗮̆́𝗻𝗴 𝗴𝗶𝗲̂́𝘁 𝗵𝗲̂́𝘁 𝗽𝗵𝗲 𝗗𝗮̂𝗻 𝗟𝗮̀𝗻𝗴 🐺',
		image: __dirname + "/image/Werewolf.png"
	},
	Witch: {
		score: +4,
		party: Party.VILLAGER,
		description:
			'𝗣𝗵𝘂̀ 𝗧𝗵𝘂̉𝘆 𝗰𝗼́ 𝟮 𝗰𝗵𝘂̛́𝗰 𝗻𝗮̆𝗻𝗴 𝗹𝗮̀ 𝗰𝗵𝗼̣𝗻 𝟭 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝘀𝗮̆́𝗽 𝗰𝗵𝗲̂́𝘁 𝗰𝘂̛́𝘂 𝘀𝗼̂́𝗻𝗴 𝗵𝗼̣ 𝘃𝗮̀ 𝗴𝗶𝗲̂́𝘁 𝗰𝗵𝗲̂́𝘁 𝟭 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗺𝗮̀ 𝗣𝗵𝘂̀ 𝗧𝗵𝘂̉𝘆 𝗺𝘂𝗼̂́𝗻',
		advice: '𝗖𝗼́ 𝗾𝘂𝘆𝗲̂̀𝗻 𝗻𝗮̆𝗻𝗴 𝘁𝗿𝗼𝗻𝗴 𝘁𝗮𝘆 𝗻𝗲̂𝗻 𝗰𝗮̂̀𝗻 𝘀𝘂̛̉ 𝗱𝘂̣𝗻𝗴 𝗸𝗵𝗼̂𝗻 𝗻𝗴𝗼𝗮𝗻 𝗻𝗵𝗮̂́𝘁 𝗰𝗼́ 𝘁𝗵𝗲̂̉ 💉',
		image: __dirname + "/image/Witch.png"
	}
};
