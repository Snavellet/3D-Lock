const User = require('../../models/userModel');
const Role = require('../../models/roleModel');
const GuildUtil = require('../../utils/GuildUtil');

module.exports = {
	name: 'verify',
	description: 'The purpose of this command is to verify people who have just joined the server with a verification code.',
	args: true,
	cooldown: 5,
	async execute(message, args) {
		let role = await Role.findOne({ guildID: message.guild.id, event: 'beforeVerification' });
		const contactMessage = '\'please contact the admins for assistance, I cannot check whether you are' +
			' unverified.\'';
		if(!role) return await message.reply(contactMessage);
		role.id = role.roleID;
		let guildUtil = new GuildUtil(message.guild, role);
		if(!await guildUtil.roleExist('autorole')) return await message.reply(contactMessage);

		if(!message.member.roles.has(role.roleID)) return;

		const user = await User.findOne({ guildID: message.guild.id, userID: message.author.id });

		const invalidMessage = async (message, verificationCode) => {
			await message.reply('your code is either **invalid** or it has **expired**, I will send you a new one.')
			const prefix = await guildUtil.getPrefix();
			return message.channel.send(`Please say \`${prefix}verify ${verificationCode}\` to verify again, remember this code ***expires*** in **${process.env.VERIFICATION_EXPIRE} minutes**.`);
		}

		if(!user) {
			const verificationCode = await new GuildUtil(message.guild).generateVerificationCode(message.author);
			return await invalidMessage(message, verificationCode);
		}

		if(args[0] !== user.verificationCode || Date.now() > user.verificationExpire) {
			const verificationCode = user.updateVerificationCode();
			await user.save();
			return await invalidMessage(message, verificationCode);
		}

		role = await Role.findOne({ guildID: message.guild.id, event: 'afterVerification' });
		if(!role) return await message.reply(contactMessage);
		role.id = role.roleID;
		guildUtil = new GuildUtil(message.guild, role);
		if(!await guildUtil.roleExist('aftver')) return await message.reply(contactMessage);

		await User.findOneAndDelete({ guildID: message.guild.id, userID: message.author.id });

		await message.reply(`you have successfully verified, you will be transferred in ${process.env.TRANSFER_AFTER_VERIFICATION} seconds.`);
		setTimeout(async () => {
			await message.member.setRoles([role.roleID], `${message.guild.name} After Verification Role Process`);
		}, process.env.TRANSFER_AFTER_VERIFICATION * 1000);
	}
};
