const fetch = require('node-fetch');

module.exports = {
    name: 'catfact',
    description: 'The purpose of this command is to generate cat commands.',
    cooldown: 5,
    async execute(message) {
        let data = await fetch('https://cat-fact.herokuapp.com/facts/random');
        data = await data.json();

        await message.channel.send(data.text);
    },
};
