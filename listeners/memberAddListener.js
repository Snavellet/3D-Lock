const Discord = require('discord.js');
const Channel = require('../models/channelModel');
const Role = require('../models/roleModel');
const GuildUtil = require('../utils/GuildUtil');
const CatchAsync = require('../utils/CatchAsync');
const Blacklist = require('../models/blackListModel');

module.exports = new CatchAsync(async member => {
	if(member.user.bot) {
		const role = await Role.findOne({ guildID: member.guild.id, event: 'bot' });
		if(!role) return;
		role.id = role.roleID;
		const guildUtil = new GuildUtil(member.guild, role);
		if(!await guildUtil.roleExist('botrole')) return;

		return await member.addRole(role.roleID, `${member.guild.name} Bot AutoRole Process`);
	}

	const blacklistedUser = await Blacklist.findOne({ guildID: member.guild.id, userID: member.user.id });
	if(blacklistedUser) {
		return await member.ban({
			reason: `Blacklisted: ${blacklistedUser.reason}`
		});
	}

	const role = await Role.findOne({ guildID: member.guild.id, event: 'beforeVerification' });
	await member.setRoles([role.roleID], `${member.guild.name} AutoRole Process`);

	const guildUtil = new GuildUtil(member.guild);
	const prefix = await guildUtil.getPrefix();
	const verificationCode = await guildUtil.generateVerificationCode(member.user);

	const event = 'verification';
	const verificationChannel = await Channel.findOne({
		guildID: member.guild.id,
		event
	});

	if(!verificationChannel) return;
	const channel = member.guild.channels.get(verificationChannel.channelID);
	if(!channel) return;

	const welcomeEmbed = new Discord.RichEmbed()
		.setTitle(`Welcome To ${member.guild.name}!`)
		.setDescription(`Please type \`${prefix}verify ${verificationCode}\` in the unverified channel to verify, please do it quickly, because the code will ***expire*** in **${process.env.VERIFICATION_EXPIRE} minutes**.`)
		.setThumbnail(member.guild.iconURL)
		.setColor('#44C26E')
		.setAuthor(member.user.username, member.user.avatarURL)
		.setFooter('Please read the rules and enjoy staying in the server!', 'https://papermilkdesign.com/images/emoji-clipart-iphone-1.jpg');

	try {
		await member.user.send(welcomeEmbed);
		await member.user.send(`For ***mobile*** users, please say \`${prefix}verify ${verificationCode}\` to verify, remember this code ***expires*** in **${process.env.VERIFICATION_EXPIRE} minutes**.`);
	} catch(e) {
		await channel.send(`Fallback: <@${member.id}>, please say \`${prefix}verify ${verificationCode}\` to verify, remember this code ***expires*** in **${process.env.VERIFICATION_EXPIRE} minutes**.`);
	}
}).memberAdd();
