const Discord = require('discord.js');
const fs = require('fs');
const catchAsyncMessage = require('../utils/catchAsync/catchAsyncMessage');
const getPrefix = require('../utils/getPrefix');
const cooldowns = new Discord.Collection();

const client = require('../app');
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync(`${__dirname}/commands`).filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}


module.exports = catchAsyncMessage(async message => {
	if(message.author.id === message.client.id) return;
	if(message.channel.type === 'dm' || message.author.bot) return;

	const prefix = await getPrefix(message.guild.id, message.guild.name);

	if(!message.content.startsWith(prefix)) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	if(!client.commands.has(commandName)) return;

	const command = client.commands.get(commandName);

	if(command.args && !args.length) {
		return message.channel.send(`You didn't provide any arguments, <@${message.author.id}>!`);
	}

	if(!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if(timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if(now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	await command.execute(message, args);
});
