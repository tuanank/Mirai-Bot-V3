const Manager = require('./Manager');

module.exports = class GameManager extends Manager {
	constructor(games) {
		super();
		this.games = games;
	}

	import(games, clear = false) {
		if (clear) this.games = games;
		else Object.assign(this.games, games);
	}

	run(name, gameOptions) {
    	if(!gameOptions) return
		for (const item of this.items) {
			if(!item.participants) continue
			if (item.threadID == gameOptions.threadID) {
				const { sendMessage } = global.client.api
				return sendMessage(`[⚜️] ➜ 𝗫𝗶𝗻 𝗹𝗼̂̃𝗶, 𝗯𝗼𝘅 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 𝗵𝗶𝗲̣̂𝗻 𝗰𝗵𝗮̣𝘆 𝘁𝗿𝗼̀ 𝗰𝗵𝗼̛𝗶 𝗿𝗼̂̀𝗶 ${item.name}!`, gameOptions.threadID);
			}	
			if (item.participants && item.participants.includes(gameOptions.masterID)) {
				return sendMessage(`[⚜️] ➜ 𝗫𝗶𝗻 𝗹𝗼̂̃𝗶, 𝗯𝗮̣𝗻 𝗵𝗶𝗲̣̂𝗻 𝘁𝗿𝗼𝗻𝗴 𝘁𝗿𝗼̀ 𝗰𝗵𝗼̛𝗶 𝗿𝗼̂̀𝗶 ${item.name}!`, gameOptions.threadID);
			}
		}
		this.add(new this.games[name](gameOptions));
    
	}

	async clean(threadID) {
		const item = this.find({threadID});
		if (item) {
			try {
				await item.clean();
			} finally {
				this.delete({threadID});
			}
		}
	}

	findGameByName(name) {
		const game = this.games[name];
		return game ? game : null;
	}

	isValid(name) {
		// check if the game exists
		const game = this.findGameByName(name);
		return game ? true : false;
	}

	isPlaying(threadID) {
		// check if threadID is already playing a game
		const item = this.find({threadID});
		return item ? true : false;
	}

	playing(threadID) {
		// get current item that threadID is playing
		const item = this.find({threadID});
		return item ? item : null;
	}

	getList() {
		const list = [];
		for (const name in this.games) {
			list.push(name);
		}
		return list;
	}
};
