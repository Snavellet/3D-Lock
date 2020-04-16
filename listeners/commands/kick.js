module.exports = {
	name: 'kick',
	description: 'The purpose of this command is to kick people out of the server.',
	args: true,
	cooldown: 5,
	async execute(message, args) {
		if(!message.member.hasPermission('KICK_MEMBERS')) return;

		const matchedIDs = message.content.match(/(\s+)(\d+)/g);
		const noMentions = 'please mention someone to kick!';
		let reason;

		const kick = async (userArr, userArrIDs, reason) => {
			const realKickMentions = async userNewArr => {
				for(const user in userNewArr) {
					const guildMember = message.guild.members.get(userNewArr[user].id);
					if(guildMember.hasPermission('KICK_MEMBERS')) return await message.reply('you cannot kick a mod!');

					if(!guildMember) {
						await message.reply(`${userNewArr[user].id} doesnt exist in this server anymore!`);
						continue;
					}

					await guildMember.kick(reason);

					await message.channel.send(`***${guildMember.user.tag}*** has been successfully kicked for \`${reason}\`.`);
				}
			};

			const realKickIDs = async userNewIDsArray => {
				for(const user in userNewIDsArray) {
					const guildMember = message.guild.members.get(userNewIDsArray[user]);
					if(guildMember.hasPermission('KICK_MEMBERS')) return await message.reply('you cannot kick a mod!');

					if(!guildMember) {
						await message.reply(`${userNewIDsArray[user]} doesnt exist in this server anymore!`);
						continue;
					}

					await guildMember.kick();

					await message.channel.send(`***${guildMember.user.tag}*** has been successfully kicked for \`${reason}\`.`);
				}
			};

			if(userArr[0]) {
				return await realKickMentions(userArr);
			}

			return await realKickIDs(userArrIDs);
		};

		reason = `${message.author.tag}: reason not supplied.`;

		if(message.mentions.users.array().length >= 1) {
			const mentionedArray = message.mentions.users.array();
			const lastElArr = args.slice(-1).pop();

			if(lastElArr && lastElArr.match(/^\w+/g)) reason = `${message.author.tag}: ${lastElArr}`;

			await kick(mentionedArray, false, reason);
		} else if(matchedIDs) {
			const newMatchedIDs = [];
			matchedIDs.forEach(el => newMatchedIDs.push(el.replace(/^\s+/g, '')));
			const lastElArr = args.slice(-1).pop();

			if(lastElArr && lastElArr.match(/^\w+/g)) reason = `${message.author.tag}: ${lastElArr}`;

			await kick(false, newMatchedIDs, reason);
		} else {
			return await message.reply(noMentions);
		}
	},
};
