const Prefix = require('../../models/prefixModel');

module.exports = {
    name: 'prefix',
    description: 'The purpose of this command is to customize the prefix for the bot.',
    args: true,
    cooldown: 5,
    async execute(message, args) {
        if(!message.member.hasPermission('ADMINISTRATOR')) return;
        const guildPrefix = await Prefix.findOne({ guildID: message.guild.id });

        if(args[0] === guildPrefix.prefix) {
            return await message.reply('the prefix you gave me is currently used now.');
        }

        guildPrefix.prefix = args[0];
        await guildPrefix.save();

        await message.reply(`the prefix is successfully set to \`${guildPrefix.prefix}\`!`);
    },
};