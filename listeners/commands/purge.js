module.exports = {
	name: 'purge',
	description: 'The purpose of this command is to delete multiple messages in a channel.',
	cooldown: 5,
	args: true,
	async execute(message, args) {
		if(!message.member.hasPermission('MANAGE_MESSAGES')) return;
		if(args[0] && !isNaN(args[0])) {
			if(args[0] > 100) return message.reply('I cannot purge more then **100** messages!');

			const purgeMessages = async message => {
				await message.delete();
				await message.channel.bulkDelete((args[0] * 1));
				const purged = await message.channel.send(`I have purged **${args[0]}** message(s)!`);

				setTimeout(async () => {
					await purged.delete();
				}, 2000);
			}

			const filter = msg => msg.author.id === message.author.id;
			const confirmation = await message.channel.send(`**Confirmation:** \`y\` for yes and \`n\` for no.`);
			const collected = await message.channel.awaitMessages(filter, {
				max: 1,
				time: 3000,
				errors: ['time ran out!']
			});

			if(collected.first().content.toLowerCase() === 'y') {
				await confirmation.delete();
				await collected.first().delete();
				await purgeMessages(message);
			} else if(collected.first().content.toLowerCase() === 'n') {
				await confirmation.delete();
				await collected.first().delete();
				await collected.first().reply('ok canceled!');
			} else {
				await confirmation.delete();
				await collected.first().delete();
				await collected.first().reply('timed out, you didn\'t answer correctly!')
			}
		}
	},
};
