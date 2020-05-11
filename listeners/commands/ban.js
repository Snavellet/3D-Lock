const Blacklist = require('../../models/blackListModel');

module.exports = {
	name: 'ban',
	description: 'The purpose of this command is to ban people and blacklist them.',
	args: true,
	cooldown: 5,
	async execute(message, args) {
		if(!message.member.hasPermission('BAN_MEMBERS')) return;

		const matchedIDs = message.content.match(/(\s+)(\d+)/g);
		const noMentions = 'please mention someone to ban!';
		const cannotBanModMessage = 'you cannot ban a mod!';

		let reason;

		const banUser = async (guildMember, reason) => {
			await guildMember.ban({
				reason
			});

			await message.channel.send(`***${guildMember.user.tag}*** has been successfully banned for \`${reason}\`.`);
			await Blacklist.create({
				guildID: message.guild.id,
				guildName: message.guild.name,
				userID: guildMember.user.id,
				userTag: guildMember.user.tag,
				reason: reason.split(' ').join(' ')
			});
		}

		const ban = async (userArr, userArrIDs, reason) => {
			const realBanMentions = async userNewArr => {
				for(const user in userNewArr) {
					const guildMember = message.guild.members.get(userNewArr[user].id);

					if(!guildMember) {
						await message.reply(`${userNewArr[user].id} doesnt exist in this server anymore!`);
						continue;
					}

					if(guildMember && guildMember.hasPermission('BAN_MEMBERS')) return await message.reply(cannotBanModMessage);

					await banUser(guildMember, reason)
				}
			};

			const realBanIDs = async userNewIDsArray => {
				for(const user in userNewIDsArray) {
					const guildMember = message.guild.members.get(userNewIDsArray[user]);

					if(!guildMember) {
						await message.reply(`${userNewIDsArray[user]} doesnt exist in this server anymore!`);
						continue;
					}

					if(guildMember && guildMember.hasPermission('BAN_MEMBERS')) return await message.reply(cannotBanModMessage);

					await banUser(guildMember, reason);
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
			const lastElArr = args.slice(-1).pop();

			if(lastElArr && lastElArr.match(/^\w+/g)) reason = `${message.author.tag}: ${lastElArr}`;

			await ban(mentionedArray, false, reason);
		} else if(matchedIDs) {
			const newMatchedIDs = [];
			matchedIDs.forEach(el => newMatchedIDs.push(el.replace(/^\s+/g, '')));
			const lastElArr = args.slice(-1).pop();

			if(lastElArr && lastElArr.match(/^\w+/g)) reason = `${message.author.tag}: ${lastElArr}`;

			await ban(false, newMatchedIDs, reason);
		} else {
			return await message.reply(noMentions);
		}
	},
};
