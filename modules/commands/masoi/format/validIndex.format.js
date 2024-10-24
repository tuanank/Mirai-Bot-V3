module.exports = (player, value) => {
	const number = Number(value);
	if (isNaN(number)) return
	if (number < 1 || number > player.world.items.length)
		throw new Error('[⚜️] ➜ 𝗕𝗮̣𝗻 𝗰𝗮̂̀𝗻 𝗻𝗵𝗮̣̂𝗽 𝗰𝗼𝗻 𝘀𝗼̂́ 𝘁𝗿𝗼𝗻𝗴 𝗸𝗵𝗼𝗮̉𝗻𝗴 𝗾𝘂𝗮̉𝗻 𝘁𝗿𝗼̀ 𝗰𝗵𝗼 !');
	return number - 1;
};
