const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
    name: 'dog',
    description: 'The purpose of this command is to generate dog commands.',
    cooldown: 5,
    async execute(message, args) {
        let data = await fetch('https://random.dog/woof.json');
        data = await data.json();

        const dogEmbed = new Discord.RichEmbed()
            .setTitle('Here\'s a random dog!')
            .setColor('#00FF00')
            .setImage(data.url);

        await message.channel.send(dogEmbed);
    },
};
