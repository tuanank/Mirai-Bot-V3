const fs = require('fs');
const path = require('path');
const axios = require('axios');
const deepExtend = require('deep-extend');
const {Data} = require('./constant');
const {Party} = require('./enum');
const random = (start, end) => {
	return Math.floor(Math.random() * (end - start + 1) + start);
};

const exampleConfig = require('./gameConfig.example');
const exampleConfigPath = path.join(__dirname, 'gameConfig.example.js');
const configPath = path.join(process.cwd() + '/werewolfConfig.js');
let gameConfig;
if (!fs.existsSync(configPath)) {
	fs.writeFileSync(configPath, fs.readFileSync(exampleConfigPath));
	gameConfig = require(configPath);
} else {
	gameConfig = {...exampleConfig, ...require(configPath)};
}

const symbols = {
	0: '𝟘',
	1: '𝟙',
	2: '𝟚',
	3: '𝟛',
	4: '𝟜',
	5: '𝟝',
	6: '𝟞',
	7: '𝟟',
	8: '𝟠',
	9: '𝟡'
};

for (let i = 10; i <= 1000; i++) {
	let number = i;
	symbols[i] = '➜';
	while (number > 0) {
		symbols[i] = symbols[number % 10] + symbols[i];
		number = Math.floor(number / 10);
	}
}

const randomItem = arr => {
	return arr[random(0, arr.length - 1)];
};

const dataSetup = setup => {
	const roles = [];
	for (let role in setup.roles) {
		roles.push(...new Array(setup.roles[role]).fill(role));
	}
	return {
		name: setup.name,
		roles,
		org: setup
	};
};

const vietsub = (role) => {
	role = role.toLowerCase();
	role = role.replace('villager', '𝗗𝗮̂𝗻 𝗹𝗮̀𝗻𝗴 👨🏻‍🌾')
					.replace('werewolf', '𝗠𝗮 𝗦𝗼́𝗶 🐺')
					.replace('mayor', '𝗧𝗵𝗶̣ 𝗧𝗿𝘂̛𝗼̛̉𝗻𝗴 🤴🏻')
					.replace('diseased', '𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗕𝗲̣̂𝗻𝗵 🧟‍♀️')
					.replace('apprentice', '𝗧𝗶𝗲̂𝗻 𝗧𝗿𝗶 𝗧𝗮̣̂𝗽 𝗦𝘂̛̣ 🔮')
					.replace('minion', '𝗞𝗲̉ 𝗣𝗵𝗮̉𝗻 𝗕𝗼̣̂𝗶 🎭')
					.replace('bodyguard', '𝗕𝗮̉𝗼 𝗩𝗲̣̂ 🛡')
					.replace('cupid', '𝗧𝗵𝗮̂̀𝗻 𝗧𝗶̀𝗻𝗵 𝗬𝗲̂𝘂 👼')
					.replace('evilseer', '𝗘𝘃𝗶𝗹𝘀𝗲𝗲𝗿 🧛🏻‍♂️')
					.replace('fruitbrute', '𝗦𝗼́𝗶 𝗔̆𝗻 𝗖𝗵𝗮𝘆 🥕')
					.replace('goodseer', '𝗧𝗶𝗲̂𝗻 𝗧𝗿𝗶 🧝🏻‍♀️')
					.replace('hunter', '𝗧𝗵𝗼̛̣ 𝗦𝗮̆𝗻 🔫')
					.replace('investigator', '𝗧𝗵𝗮́𝗺 𝗧𝘂̛̉ 🕵🏻')
					.replace('lycan', '𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗦𝗼́𝗶 🐾')
					.replace('oldman', '𝗢̂𝗻𝗴 𝗚𝗶𝗮̀ 👴')
					.replace('tanner', '𝗖𝗵𝗮́𝗻 𝗦𝗼̂́𝗻𝗴 😑')
					.replace('witch', '𝗣𝗵𝘂̀ 𝗧𝗵𝘂̉𝘆 🧙🏻')
					.replace('pacifist', '𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗛𝗼𝗮̀ 𝗕𝗶̀𝗻𝗵 🏳️')
					.replace('neutral', '𝗧𝗿𝘂𝗻𝗴 𝗟𝗮̣̂𝗽 🗽')
	return role.toUpperCase();
}

const guide = role => {
	const { createReadStream } = require('fs-extra')
	const roleName = role.constructor.name;
	const {party, description, advice, image} = Data[roleName];
	let partyName;
	for (partyName in Party) if (party == Party[partyName]) break;
	return (
		{
			body: 
				`[⚜️] ➜ 𝗕𝗔̣𝗡 𝗟𝗔̀ [ ${vietsub(roleName)} ]\n` +
				`[⚜️] ➜ 𝗣𝗵𝗲: ${partyName} (𝘃𝗮̂̃𝗻 𝗰𝗼́ 𝘁𝗵𝗲̂̉ 𝗯𝗶̣ 𝘁𝗵𝗮𝘆 𝘁𝗵𝗮̀𝗻𝗵 𝗸𝗵𝗮́𝗰)\n` +
				`[⚜️] ➜ 𝗠𝗼̂ 𝘁𝗮̉: ${description}\n` +
				`[⚜️] ➜ 𝗟𝗼̛̀𝗶 𝗸𝗵𝘂𝘆𝗲̂𝗻: ${advice}`,
			attachment: createReadStream(image)
		}
	);
};

module.exports = {
	gameConfig,
	symbols,
	randomItem,
	dataSetup,
	guide,
	vietsub
};
