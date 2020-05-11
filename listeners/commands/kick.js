module.exports = {
	name: 'kick',
	description: 'The purpose of this command is to kick people out of the server.',
	args: true,
	cooldown: 5,
	async execute(message, args) {
		if(!message.member.hasPermission('KICK_MEMBERS')) return;

		const matchedIDs = args.filter(el => message.guild.members.get(el));
		for(const i in args) {
			if(message.guild.members.get(args[i])) {
				delete args[i];
			}
		}
		const noMentions = 'please mention someone to kick!';
		const cannotKickModMessage = 'you cannot kick a mod!';
		const userDoesntExistMessage = 'doesn\'t exist in this server anymore!';
		let reason;

		const kickManage = async (guildMember, reason) => {
			await guildMember.kick(reason);

			await message.channel.send(`***${guildMember.user.tag}*** has been successfully kicked for \`${reason}\`.`);
		}

		const kick = async (userArr, userArrIDs, reason) => {
			const realKickMentions = async userNewArr => {
				for(const user in userNewArr) {
					const guildMember = message.guild.members.get(userNewArr[user].id);
					if(guildMember.hasPermission('KICK_MEMBERS')) return await message.reply(cannotKickModMessage);

					if(!guildMember) {
						await message.reply(`${userNewArr[user].id} ${userDoesntExistMessage}`);
						continue;
					}

					await kickManage(guildMember, reason);
				}
			};

			const realKickIDs = async userNewIDsArray => {
				for(const user in userNewIDsArray) {
					const guildMember = message.guild.members.get(userNewIDsArray[user]);
					if(guildMember.hasPermission('KICK_MEMBERS')) return await message.reply(cannotKickModMessage);

					if(!guildMember) {
						await message.reply(`${userNewIDsArray[user]} ${userDoesntExistMessage}`);
						continue;
					}

					await kickManage(guildMember, reason);
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

			reason = `${message.author.tag}: ${args.join(' ')}`;

			await kick(mentionedArray, false, reason);
		} else if(matchedIDs) {
			reason = `${message.author.tag}: ${args.join(' ')}`;

			await kick(false, matchedIDs, reason);
		} else {
			return await message.reply(noMentions);
		}
	},
};
