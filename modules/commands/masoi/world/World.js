const Ability = require('../ability');
const {FunnyDeaths} = require('../constant');
const {Party, DeathType} = require('../enum');
const Gang = require('../gang');
const {Death} = require('../type');
const {gameConfig, symbols, randomItem, vietsub} = require('../helper');
const History = require('../History');
const Manager = require('../Manager')
const asyncWait = async time => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve();
		}, time);
	});
};
module.exports = class World extends Manager {
	constructor(options) {
		super();
		const {game} = options;
		this.game = game;
		this.history = new History();
		this.ddAlive = new Array(this.items.length).fill(true);
		this.gangs = [];
		this.isEnd = false;
		this.winners = [];
	}

	// 	 ____ ___  ____  _____
	//  / ___/ _ \|  _ \| ____|
	// | |  | | | | |_) |  _|
	// | |__| |_| |  _ <| |___
	//  \____\___/|_| \_\_____|

	async onNight() {
		this.history.new('night');
		// starting night
		const movementBefore = {};
		for (const gang of this.gangs) {
			movementBefore[gang.constructor.name] = (
				await gang.onNight(movementBefore)
			).flat();
			// .filter(movement => movement.value != null);
			// this.history.add(
			// 	gang.constructor.name,
			// 	await gang.onNight(this.history.last().data)
			// );
		}

		// night ending
		const listDeaths = [];
		// const {data} = this.history.last();
		for (const gang of this.gangs) {
			await gang.nightend(movementBefore[gang.constructor.name], listDeaths);
		}

		// handle death
		for (const death of listDeaths) {
			const player = this.items[death.index];
			if (!player.died) await player.die(death);
		}
	}

	async onMorning() {
		this.history.new('morning');
		const dies = [],
			reborns = [];
		const status = this.items.map(player => !player.died);
		for (let i = 0; i < status.length; i++) {
			if (this.ddAlive[i] != status[i]) {
				status[i] ? reborns.push(i) : dies.push(i);
			}
		}
		this.ddAlive = status;
		await new Promise(resolve => setTimeout(resolve, 5000));
		await this.game.sendMessage(
			'[⚜️] ➜ 𝗧𝗿𝗼̛̀𝗶 𝘀𝗮́𝗻𝗴 𝗿𝗼̂̀𝗶 𝗱𝗮̣̂𝘆 𝗻𝗮̀𝗼 𝗰𝗮́𝗰 𝗲𝗺 ☀️\n' +
				(dies.length > 0
					? `[⚜️] ➜ 𝗦𝗼̂́ 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝘁𝘂̛̉ 𝘁𝗿𝗮̣̂𝗻 𝘁𝗼̂́𝗶 𝗾𝘂𝗮 (${dies.length} 𝗻𝗴𝘂̛𝗼̛̀𝗶): ${dies
						.map(index => this.items[index].name)
						.join(', ')}\n`
					: '[⚜️] ➜ 𝗠𝗼̣̂𝘁 𝗯𝘂𝗼̂̉𝗶 𝘁𝗼̂́𝗶 𝘁𝗵𝗮̣̂𝘁 𝗹𝗮̀ 𝗯𝗶̀𝗻𝗵 𝘆𝗲̂𝗻 𝗸𝗵𝗼̂𝗻𝗴 𝗰𝗼́ 𝗮𝗶 𝗰𝗵𝗲̂́𝘁 𝗰𝗮̉ 💫\n')
		);
		await this.game.sendStatus();
		await this.game.sendMessage(
			this.game.timing({
				message: '[⚜️] ➜ 𝗚𝗶𝗮̂𝘆 𝗽𝗵𝘂́𝘁 𝘁𝗿𝗮𝗻𝗵 𝗹𝘂𝗮̣̂𝘁 𝗱𝗶𝗲̂̃𝗻 𝗿𝗮, 𝗚𝗲́𝘁 𝗴𝗼̂',
				time: gameConfig.timeout.DISCUSS
			})
		);
		await asyncWait(gameConfig.timeout.DISCUSS);
	}

	async onLynch() {
		this.history.new('lynch');
		await this.game.sendMessage(
			this.game.timing({
				message: '[⚜️] ➜ 𝗛𝗲̂́𝘁 𝗴𝗶𝗼̛̀ 𝘁𝗿𝗮𝗻𝗵 𝗹𝘂𝗮̣̂𝗻, 𝘃𝘂𝗶 𝗹𝗼̀𝗻𝗴 𝗸𝗶𝗲̂̉𝗺 𝘁𝗿𝗮 𝗶𝗻𝗯𝗼𝘅 𝘃𝗼𝘁𝗲 𝘁𝗿𝗲𝗼 𝗰𝗼̂̉',
				time: gameConfig.timeout.VOTEKILL,
				left: false
			})
		);

		const alives = this.items.filter(player => !player.died);
		const votes = await Promise.all(
			alives.map(player => player.request(Ability.VoteLynch))
		);
		const filteredVotes = votes.filter(vote => vote.value != null);
		const voteChart = [];

		for (const vote of filteredVotes) {
			const votedIndex = Number(vote.value) - 1;
			const index = voteChart.findIndex(item => item.index == votedIndex);
			const roleVote = (this.items[vote.index]).constructor.name
			if (index != -1 && roleVote == 'Mayor') voteChart[index].amount++;
			if(index != -1 && roleVote == 'Pacifist') voteChart[index].amount--
			if (index != -1 && roleVote != 'Pacifist') {
				voteChart[index].amount++;
			}
			else {
				if(roleVote == 'Mayor') {
					voteChart.push({
						index: votedIndex,
						amount: 2
					});
				}
				else if(roleVote == 'Pacifist') {
					voteChart.push({
						index: votedIndex,
						amount: -1
					});
				}
				else {
					voteChart.push({
						index: votedIndex,
						amount: 1
					});
				}
				
			}
		}
		if (voteChart.length == 0) {
			await this.game.sendMessage('[⚜️] ➜ 𝗦𝗲̃ 𝗸𝗵𝗼̂𝗻𝗴 𝗰𝗼́ 𝗮𝗶 𝗯𝗶̣ 𝘁𝗿𝗲𝗼 𝗰𝗼̂̉ 𝘁𝗿𝗼𝗻𝗴 𝗵𝗼̂𝗺 𝗻𝗮𝘆 !');
			await new Promise(resolve => setTimeout(resolve, 2000));
			await this.game.sendMessage(`[⚜️] ➜ 𝗧𝗿𝗼̛̀𝗶 𝘁𝗼̂́𝗶 𝗿𝗼̂̀𝗶 𝗼̂𝗻𝗴 𝗰𝗵𝗮́𝘂 𝗼̛𝗶 𝗵𝗮̃𝘆 𝗹𝗲̂𝗻 𝗴𝗶𝘂̛𝗼̛̀𝗻𝗴 𝘃𝗮̀ 𝗻𝗴𝘂̉ 𝗻𝗮̀𝗼 🌑\n[⚜️] ➜ 𝗖𝗮́𝗰 𝗰𝗵𝘂̛́𝗰 𝗻𝗮̆𝗻𝗴 𝗵𝗮̃𝘆 𝗹𝗮̀𝗺 𝘃𝗶𝗲̣̂𝗰 𝗰𝘂̉𝗮 𝗺𝗶̀𝗻𝗵 𝗻𝗮̀𝗼 ⚔\n[⚜️] ➜ 𝗗𝗮̂𝗻 𝗹𝗮̀𝗻𝗴 𝗵𝗮̃𝘆 𝗰𝗮̂̉𝗻 𝘁𝗵𝗮̣̂𝗻 𝗻𝗵𝘂̛̃𝗻𝗴 𝗰𝗼𝗻 𝗦𝗼́𝗶 𝗵𝘂𝗻𝗴 𝘁𝗮̀𝗻 🐺`);
			return;
		}
		voteChart.sort((a, b) => b.amount - a.amount);

		let replyMsg = '[⚜️] ➜ 𝗞𝗲̂́𝘁 𝗾𝘂𝗮̉ 𝗱𝗮𝗻𝗵 𝘀𝗮́𝗰𝗵 𝘃𝗼𝘁𝗲 𝘁𝗿𝗲𝗼 𝗰𝗼̂̉: \n';
		for (let i = 0; i < voteChart.length; i++) {
			const vote = voteChart[i];
			if(vote.amount == -1) continue
			replyMsg += `${symbols[i + 1]}. ${this.items[vote.index].name}:  ${
				vote.amount
			}${
				i == 0 && (voteChart.length == 1 || voteChart[1].amount < vote.amount)
					? ' 💔'
					: ''
			}\n`;
		}
		await this.game.sendMessage(replyMsg);

		if (voteChart.length > 1 && voteChart[0].amount == voteChart[1].amount) {
			await this.game.sendMessage(
				'[⚜️] ➜ 𝗦𝗲̃ 𝗸𝗵𝗼̂𝗻𝗴 𝗰𝗼́ 𝗮𝗶 𝗯𝗶̣ 𝘁𝗿𝗲𝗼 𝗰𝗼̂̉ 𝘁𝗿𝗼𝗻𝗴 𝗵𝗼̂𝗺 𝗻𝗮𝘆 (𝗵𝘂𝗲̂̀)'
			);
		} else {
			const {index, amount} = voteChart[0];
			const percent = amount / votes.length;
			const player = this.items[index];
			if (percent >= 0.5) {
				await player.die(new Death(filteredVotes, player, DeathType.LYNCH));
				await this.game.sendMessage(
					`[⚜️] ➜ 𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗰𝗵𝗼̛𝗶 ${player.name} 𝘃𝘂̛̀𝗮 ${randomItem(FunnyDeaths)} 💀`
				);
				await asyncWait(1000);
				await this.game.sendStatus();
			} else {
				const need = Math.ceil(votes.length / 2) - amount;
				await this.game.sendMessage(
					`[⚜️] ➜ 𝗦𝗼̂́ 𝗹𝘂̛𝗼̛̣𝗻𝗴 𝗽𝗵𝗶𝗲̂́𝘂 𝘃𝗼𝘁𝗲 𝘁𝗵𝗶𝗲̂́𝘂 ${player.name} (𝗵𝗶𝗲̣̂𝗻 𝘁𝗮̣𝗶: ${amount}, 𝗰𝗮̂̀𝗻 𝘁𝗵𝗲̂𝗺: ${need} 𝗽𝗵𝗶𝗲̂́𝘂 !)`
				);
			}
		}
		if(!this.isEnd) 
			await this.game.sendMessage(`[⚜️] ➜ 𝗧𝗿𝗼̛̀𝗶 𝘁𝗼̂́𝗶 𝗿𝗼̂̀𝗶 𝗼̂𝗻𝗴 𝗰𝗵𝗮́𝘂 𝗼̛𝗶 𝗵𝗮̃𝘆 𝗹𝗲̂𝗻 𝗴𝗶𝘂̛𝗼̛̀𝗻𝗴 𝘃𝗮̀ 𝗻𝗴𝘂̉ 𝗻𝗮̀𝗼 🌑\n[⚜️] ➜ 𝗖𝗮́𝗰 𝗰𝗵𝘂̛́𝗰 𝗻𝗮̆𝗻𝗴 𝗵𝗮̃𝘆 𝗹𝗮̀𝗺 𝘃𝗶𝗲̣̂𝗰 𝗰𝘂̉𝗮 𝗺𝗶̀𝗻𝗵 𝗻𝗮̀𝗼 ⚔\n[⚜️] ➜ 𝗗𝗮̂𝗻 𝗹𝗮̀𝗻𝗴 𝗵𝗮̃𝘆 𝗰𝗮̂̉𝗻 𝘁𝗵𝗮̣̂𝗻 𝗻𝗵𝘂̛̃𝗻𝗴 𝗰𝗼𝗻 𝗦𝗼́𝗶 𝗵𝘂𝗻𝗴 𝘁𝗮̀𝗻 🐺`);
	}

	async startLoop() {
		for (const key in Gang) {
			const gang = new Gang[key]({world: this});
			if (gang.items.length > 0) this.gangs.push(gang);
		}

		const tasks = [this.onNight, this.onMorning, this.onLynch];
		let indexTask = 0;
		let result;
		while (!this.isEnd) {
			try {
				result = await tasks[indexTask].bind(this)(result);
				indexTask++;
				if (indexTask >= tasks.length) indexTask = 0;
			} catch (err) {
				console.log(err);
				this.game.sendMessage(
					`[⚜️] ➜ 𝗚𝗮̣̆𝗽 𝗹𝗼̂̃𝗶 𝘁𝗿𝗼𝗻𝗴 𝗾𝘂𝗮́ 𝘁𝗿𝗶̀𝗻𝗵 𝘅𝘂̛̉ 𝗹𝗶́ 𝗴𝗮𝗺𝗲! 𝗩𝘂𝗶 𝗹𝗼̀𝗻𝗴 𝘅𝗲𝗺 𝗰𝗼𝗻𝘀𝗼𝗹𝗲 😿`
				);
			}
			const tmp = this.whoWin();
			if (tmp != -1) this.endGame(tmp);
		}

		let rep = '[⚜️] ➜ 𝗧𝗿𝗼̀ 𝗰𝗵𝗼̛𝗶 𝗸𝗲̂́𝘁 𝘁𝗵𝘂́𝗰 !\n';

		if (this.winners.length == 0) {
			// force end
			rep += '[⚜️] ➜ 𝗞𝗵𝗼̂𝗻𝗴 𝗮𝗶 𝗴𝗶𝗮̀𝗻𝗵 𝗰𝗵𝗶𝗲̂́𝗻 𝘁𝗵𝗮̆́𝗻𝗴 (𝗯𝘂𝗼̣̂𝗰 𝗱𝘂̛̀𝗻𝗴)\n';
		} else {
			const parties = this.winners.map(player => player.party);
			const queryParty = parties[0];
			if (
				queryParty != Party.NEUTRAL &&
				parties.filter(party => party == queryParty).length == parties.length
			) {
				for (let partyName in Party) {
					if (queryParty != Party[partyName]) continue;
					rep += `[⚜️] ➜ 𝗣𝗵𝗲 [ ${partyName} ] 𝘃𝘂̛̀𝗮 𝗴𝗶𝗮̀𝗻𝗵 𝗰𝗵𝗶𝗲̂́𝗻 𝘁𝗵𝗮̆́𝗻𝗴 👑\n`;
					break;
				}
			} else {
				this.winners.map(player =>
					player.sendMessage(
						'[⚜️] ➜ 𝗖𝗵𝘂́𝗰 𝗺𝘂̛̀𝗻𝗴, 𝗯𝗮̣𝗻 𝘃𝘂̛̀𝗮 𝗱𝗮̀𝗻𝗵 𝗰𝗵𝗶𝗲̂́𝗻 𝘁𝗵𝗮̆́𝗻𝗴\n𝗛𝗮̃𝘆 𝗴𝗶𝗮̉𝗶 𝘁𝗵𝗶́𝗰𝗵 𝘃𝗼̛́𝗶 𝗺𝗼̣𝗶 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝘃𝗶̀ 𝘀𝗮𝗼 𝘁𝗵𝗮̆́𝗻𝗴 𝗻𝗵𝗲́ !'
					)
				);
				rep += `[⚜️] ➜ ${this.winners
					.map(player => player.name)
					.join(', ')} 𝘃𝘂̛̀𝗮 𝗴𝗶𝗮̀𝗻𝗵 𝗰𝗵𝗶𝗲̂́𝗻 𝘁𝗵𝗮̆́𝗻𝗴 💓\n`;
			}
		}
		const group = {};
		for (const player of this.items) {
			if (!group[player.constructor.name])
				group[player.constructor.name] = [player.name];
			else {
				group[player.constructor.name].push(player.name);
			}
		}
		let roleReveal = '';
		for (const role in group) {
			roleReveal += `${vietsub(role)}: ${group[role].join(', ')}\n`;
		}
		roleReveal = roleReveal
		rep +=
			'[⚜️] ➜ 𝗡𝗵𝘂̛ 𝗰𝗵𝘂́𝗻𝗴 𝘁𝗮 𝗯𝗶𝗲̂́𝘁, 𝘃𝗮𝗶 𝘁𝗿𝗼̀ 𝗰𝘂̉𝗮 𝘁𝘂̛̀𝗻𝗴 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗹𝗮̀:  . . .\n' + roleReveal;
		await this.game.sendMessage(rep);
		await global.gameManager.clean(this.game.threadID);
		await this.game.sendMessage('[⚜️] ➜ 𝗗𝗼̣𝗻 𝗱𝗲̣𝗽 𝗯𝗮̀𝗻 𝗰𝗵𝗼̛𝗶 𝘁𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴 ✅');
	}
	filterP() {
		const out = [];
		for (const player of this.items) {
			if (player.died) out.push(player);
		}
		return this.items.filter(e => e.died);
	}

	whoWin() {
		const winners = [];
		for (const player of this.items) {
			if (player.isWin() === true) winners.push(player);
		}
		return winners.length > 0 ? winners : -1;
	}

	endGame(winners = []) {
		if (this.isEnd) return;
		this.isEnd = true;
		this.winners = winners;
	}
};
