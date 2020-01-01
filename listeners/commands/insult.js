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



        await message.reply(insult);
    },
};