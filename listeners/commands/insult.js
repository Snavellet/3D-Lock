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

        if (message.mentions.users.array().length > 0) {
            return await message.channel.send(`<@${message.mentions.users.array()[0].id}>, ${insult}`);
        }

        await message.reply(insult);
    },
};
