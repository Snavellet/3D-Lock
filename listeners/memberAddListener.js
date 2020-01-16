const Discord = require('discord.js');
const Role = require('../models/roleModel');
const roleExist = require('../utils/roleExist');
const catchAsyncMember = require('../utils/catchAsync/catchAsyncMemberAdd');
const getPrefix = require('../utils/getPrefix');
const generateCode = require('../utils/generateVerificationCode');
const Blacklist = require('../models/blackListModel');

module.exports = catchAsyncMember(async member => {
    if(member.user.bot) {
        const role = await Role.findOne({ guildID: member.guild.id, event: 'bot'});
        if(!role || !await roleExist(member.guild, role.roleID, 'botrole')) return;

        return await member.addRole(role.roleID, `${member.guild.name} Bot AutoRole Process`);
    }

    const blacklistedUser = await Blacklist.findOne({ guildID: member.guild.id, userID: member.user.id });
    if(blacklistedUser) {
        return await member.ban({
            days: 7,
            reason: `Blacklisted: ${blacklistedUser.reason}`
        });
    }

    const role = await Role.findOne({ guildID: member.guild.id, event: 'beforeVerification' });
    await member.setRoles([role.roleID], `${member.guild.name} AutoRole Process`);

    const prefix = await getPrefix(member.guild.id, member.guild.name);
    const verificationCode = await generateCode(member.guild, member.user);

    const welcomeEmbed = new Discord.RichEmbed()
        .setTitle(`Welcome To ${member.guild.name}!`)
        .setDescription(`Please type \`${prefix}verify ${verificationCode}\` in the unverified channel to verify, please do it quickly, because the code will ***expire*** in **${process.env.VERIFICATION_EXPIRE} minutes**.`)
        .setThumbnail(member.guild.iconURL)
        .setColor('#44C26E')
        .setAuthor(member.user.username, member.user.avatarURL)
        .setFooter('Please read the rules and enjoy staying in the server!', 'https://papermilkdesign.com/images/emoji-clipart-iphone-1.jpg');

    await member.user.send(welcomeEmbed);
    await member.user.send(`For ***mobile*** users, please say \`${prefix}verify ${verificationCode}\` to verify, remember this code ***expires*** in **${process.env.VERIFICATION_EXPIRE} minutes**.`);
});
