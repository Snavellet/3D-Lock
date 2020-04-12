const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'cat',
    description: 'The purpose of this command is to generate cat images.',
    cooldown: 5,
    async execute(message, args) {
        let data = await fetch('https://api.thecatapi.com/v1/images/search');
        data = await data.json();
        data = data[0].url;
        data = new Discord.RichEmbed()
            .setTitle('Here\'s a random cat!')
            .setColor('#00FF00')
            .setImage(data);

        return message.channel.send(data);
    },
};
