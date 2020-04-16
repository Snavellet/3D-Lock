const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'joke',
    description: 'The purpose of this command is to generate dog commands.',
    cooldown: 3,
    async execute(message, args) {
        let data = await fetch('https://official-joke-api.appspot.com/jokes/programming/random');
        data = await data.json();
        data = data[0];

        let jokeEmbed = new Discord.RichEmbed()
            .setTitle('Setup')
            .setColor('#00FF00')
            .setDescription(data.setup)

        await message.channel.send(jokeEmbed);

        setTimeout(async () => {
            jokeEmbed = new Discord.RichEmbed()
                .setTitle('Punchline')
                .setColor('#00FF00')
                .setDescription(data.punchline);

            await message.channel.send(jokeEmbed);
        }, 2000);
    },
};
