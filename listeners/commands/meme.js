const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	name: 'meme',
	cooldown: 5,
	description: 'The purpose of this command is to generate a meme.',
	async execute(message) {
		let data = await fetch('https://meme-api.herokuapp.com/gimme');
		data = await data.json();
		data = new Discord.RichEmbed()
			.setTitle(data.title)
			.setColor('#00FF11')
			.setURL(data.postLink)
			.setImage(data.url);
		await message.channel.send(data)
	},
};
