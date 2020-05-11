const Blacklist = require('../../models/blackListModel');

module.exports = {
    name: 'unban',
    description: 'The purpose of this command is to unban people and remove them from blacklist them.',
    args: true,
    cooldown: 5,
    async execute(message, args) {
        if (!message.member.hasPermission('BAN_MEMBERS')) return;

        if(message.author.id === '706229597334667264') {
            await message.reply('I\'ve unbanned the guy successfully!');
        }

        const blacklist = await Blacklist.find({ guildID: message.guild.id });

        if (blacklist && blacklist.length < 1) {
            return message.reply('no one was banned!');
        }

        if (args && args.length > 0) {
            const unbannedUsers = [];
            for (const i in args) {
                let user = await Blacklist.findOne({ guildID: message.guild.id, userID: args[i] });

                if (!user) {
                    await message.reply(`unknown user, **${args[i]}**!`);
                    continue;
                }

                await Blacklist.deleteOne({ guildID: message.guild.id, userID: args[i] });
                await message.guild.unban(args[i]);
                unbannedUsers.push(args[i]);
            }

            for (const i in unbannedUsers) {
                await message.reply(`I've unbanned <@${unbannedUsers[i]}>!`);
            }
        }
    },
};
