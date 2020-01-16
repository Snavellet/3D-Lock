const WarningThreshold = require('../../models/warningThresholdModel');

module.exports = {
    name: 'warnthres',
    description: 'The purpose of this command is to set the warning threshold.',
    args: true,
    cooldown: 5,
    async execute(message, args) {
        if(!message.member.hasPermission('ADMINISTRATOR')) return;

        let threshold = await WarningThreshold.findOne({
            guildID: message.guild.id
        });

        if(threshold && threshold.threshold === args[0]) {
            return await message.reply('that is the one that is currently set to.');
        }

        threshold = await WarningThreshold.findOneAndUpdate({
            guildID: message.guild.id
        }, {
            guildName: message.guild.name,
            threshold: args[0]
        }, { upsert: true, new: true });

        return await message.reply(`successfully set the warning threshold to \`${threshold.threshold}\`!`);
    }
};
