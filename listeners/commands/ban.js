const Blacklist = require('../../models/blackListModel');

module.exports = {
	name: 'ban',
	description: 'The purpose of this command is to ban people and blacklist them.',
	args: true,
	cooldown: 5,
	async execute(message, args) {
		if(!message.member.hasPermission('BAN_MEMBERS')) return;

		const matchedIDs = args.filter(el => message.guild.members.get(el));
		for(const i in args) {
			if(message.guild.members.get(args[i])) {
				delete args[i];
			}
		}
		const noMentions = 'please mention someone to ban!';
		const cannotBanModMessage = 'you cannot ban a mod!';
		const userDoesntExistMessage = 'does\'nt exist in this server anymore!';

		let reason;

		const banManage = async (guildMember, reason) => {
			await guildMember.ban({
				reason
			});

			await message.channel.send(`***${guildMember.user.tag}*** has been successfully banned for \`${reason}\`.`);
			await Blacklist.create({
				guildID: message.guild.id,
				guildName: message.guild.name,
				userID: guildMember.user.id,
				userTag: guildMember.user.tag,
				reason
			});
		}

		const ban = async (userArr, userArrIDs, reason) => {
			const realBanMentions = async userNewArr => {
				for(const user in userNewArr) {
					const guildMember = message.guild.members.get(userNewArr[user].id);

					if(!guildMember) {
						await message.reply(`${userNewArr[user].id} ${userDoesntExistMessage}`);
						continue;
					}

					if(guildMember && guildMember.hasPermission('BAN_MEMBERS')) return await message.reply(cannotBanModMessage);

					await banManage(guildMember, reason)
				}
			};

			const realBanIDs = async userNewIDsArray => {
				for(const user in userNewIDsArray) {
					const guildMember = message.guild.members.get(userNewIDsArray[user]);

					if(!guildMember) {
						await message.reply(`${userNewIDsArray[user]} ${userDoesntExistMessage}`);
						continue;
					}

					if(guildMember && guildMember.hasPermission('BAN_MEMBERS')) return await message.reply(cannotBanModMessage);

					await banManage(guildMember, reason);
				}
			};

			if(userArr[0]) {
				return await realBanMentions(userArr);
			}

			return await realBanIDs(userArrIDs);
		};

		reason = `${message.author.tag}: reason not supplied.`;

		if(message.mentions.users.array().length >= 1) {
			const mentionedArray = message.mentions.users.array();

			reason = `${message.author.tag}: ${args.join(' ')}`;

			await ban(mentionedArray, false, reason);
		} else if(matchedIDs) {
			reason = `${message.author.tag}: ${args.join(' ')}`;

			await ban(false, matchedIDs, reason);
		} else {
			return await message.reply(noMentions);
		}
	},
};
