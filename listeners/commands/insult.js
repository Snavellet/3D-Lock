const fetch = require('node-fetch');

module.exports = {
    name: 'insult',
    description: 'The purpose of this command is to insult you',
    cooldown: 5,
    async execute(message, args) {
        let insult = await fetch('https://evilinsult.com/generate_insult.php?lang=en&type=json');
        insult = await insult.json();
        insult = insult.insult;
        insult = insult.toLowerCase();

        const checkOwner = userId => {
            return userId === process.env.BOT_OWNER_ID;
        }

        if (args.length > 1) {
            return message.reply('one by one please!')
        }

        if (message.guild.members.get(args[0])) {
            if (checkOwner(message.guild.members.get(args[0]).id)) {
                await message.react('🖕');
                return message.reply('you cannot insult my owner idiot!');
            }
            return message.channel.send(`<@${args[0]}>, ${insult}`);
        }

        if (message.mentions.users.array().length > 0) {
            if (message.mentions.users.array()[0].id) {
                await message.react('🖕');
                return message.reply('you cannot insult my owner idiot!');
            }
            return message.channel.send(`<@${message.mentions.users.array()[0].id}>, ${insult}`);
        }

        await message.reply(insult);
    },
};
