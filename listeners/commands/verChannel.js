const Channel = require('../../models/channelModel');

module.exports = {
	name: 'verchannel',
	description: 'The purpose of this command is to set the fallback channel if a user disabled DMs for verification',
	args: true,
	cooldown: 5,
	async execute(message, args) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return;
		const event = 'verification';
		const verChannel = await Channel.findOne({ guildID: message.guild.id, event });
		const channel = message.guild.channels.get(args[0]);

		if(!channel) return message.reply('invalid channel!');

		if(!verChannel) {
			await Channel.create({
				guildID: message.guild.id,
				guildName: message.guild.name,
				channelID: args[0],
				channelName: message.guild.channels.get(args[0]).name,
				event
			});

			return message.reply(`I've successfully set the fallback channel to <#${args[0]}>!`);
		}

		if(args[0] === verChannel.channelID) return message.reply(`that is the channel that is currently set to!`)

		verChannel.channelID = args[0];
		verChannel.guildName = message.guild.name;
		await verChannel.save();
		await message.reply(`I've updated the fallback channel to <#${verChannel.channelID}>!`);
	}
};
