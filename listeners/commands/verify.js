const User = require('../../models/userModel');
const Role = require('../../models/roleModel');
const roleExistCheck = require('../../utils/roleExist');
const getPrefix = require('../../utils/getPrefix');
const generateCode = require('../../utils/generateVerificationCode');

module.exports = {
	name: 'verify',
	description: 'The purpose of this command is to verify people who have just joined the server with a verification code.',
	args: true,
	cooldown: 5,
	async execute(message, args) {
		let role = await Role.findOne({ guildID: message.guild.id, event: 'beforeVerification' });
		if(!role || !await roleExistCheck(message.guild, role.roleID, 'autorole')) return await message.reply('please contact the admins for assistance, I cannot check whether you are unverified.');
		if(!message.member.roles.has(role.roleID)) return;

		const user = await User.findOne({ guildID: message.guild.id, userID: message.author.id });

		const invalidMessage = async (message, verificationCode) => {
			await message.reply('your code is either **invalid** or it has **expired**, I will send you a new one.')
			const prefix = await getPrefix(message.member.guild.id, message.member.guild.name);
			return message.channel.send(`Please say \`${prefix}verify ${verificationCode}\` to verify again, remember this code ***expires*** in **${process.env.VERIFICATION_EXPIRE} minutes**.`);
		}

		if(!user) {
			const verificationCode = await generateCode(message.guild, message.author);
			return await invalidMessage(message, verificationCode);
		}

		if(args[0] !== user.verificationCode || Date.now() > user.verificationExpire) {
			const verificationCode = user.updateVerificationCode();
			await user.save();
			return await invalidMessage(message, verificationCode);
		}

		role = await Role.findOne({ guildID: message.guild.id, event: 'afterVerification' });
		if(!role || !await roleExistCheck(message.guild, role.roleID, 'aftver')) return await message.reply('please contact the admins for assistance, the after verification is not set yet.');

		await User.findOneAndDelete({ guildID: message.guild.id, userID: message.author.id });

		await message.reply(`you have successfully verified, you will be transferred in ${process.env.TRANSFER_AFTER_VERIFICATION} seconds.`);
		setTimeout(async () => {
			await message.member.setRoles([role.roleID], `${message.guild.name} After Verification Role Process`);
		}, process.env.TRANSFER_AFTER_VERIFICATION * 1000);
	}
};
