module.exports = (player, index) => {
	if (player.world.items[index].died)
		throw new Error('[⚜️] ➜ 𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗰𝗵𝗼̛𝗶 𝗻𝗮̀𝘆 𝗰𝗵𝗲̂́𝘁 𝗿𝗼̂̀𝗶 ⚰️');
	return index;
};
