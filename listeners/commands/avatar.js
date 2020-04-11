const Discord = require('discord.js');

module.exports = {
    name: 'avatar',
    description: 'The purpose of this command is to ban people and blacklist them.',
    args: true,
    cooldown: 5,
    async execute(message, args) {
        if (args.length > 1) {
            return message.reply('one by one please!')
        }

        const generateEmbed = user => {
            return new Discord.RichEmbed()
                .setTitle(`${user.username}'s avatar`)
                .setColor('#32c95b')
                .setImage(user.avatarURL);
        }

        const avatarMember = message.guild.members.get(args[0]);

        if (avatarMember) {
            return message.channel.send(generateEmbed(avatarMember.user));
        }

        const avatarMemberMentions = message.mentions.users.array();

        if (avatarMemberMentions.length > 0) {
            return message.channel.send(generateEmbed(avatarMemberMentions[0]));
        }
    },
};
