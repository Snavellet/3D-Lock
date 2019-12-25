const generateCode = require('../utils/generateVerificationCode');
const Discord = require('discord.js');
const Role = require('../models/roleModel');
const catchAsyncMember = require('../utils/catchAsync/catchAsyncMemberAdd');
const getPrefix = require('../utils/getPrefix');

module.exports = catchAsyncMember(async member => {
    const role = await Role.findOne({ event: 'beforeVerification' });
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
});