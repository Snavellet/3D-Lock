const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');
const logger = require('./logger');

module.exports = async (client, err) => {
    const owner = client.users.get(process.env.BOT_OWNER_ID);
    const filePath = path.join(__dirname, '/stackTrace/stackTrace.txt');

    fs.writeFile(filePath, err.stack, 'utf8', err => {
        if(err) logger.error(err);
    });

    const errorEmbed = new Discord.RichEmbed()
        .setAuthor(owner.username, owner.avatarURL)
        .setColor('#45A6CC')
        .setTitle('There was an error in the bot!')
        .addField('Error Message', err.message)
        .setFooter('I hope you fix the error, you are the best bot maker!', 'https://img.icons8.com/cotton/2x/error--v1.png')
        .setThumbnail('https://cdn.iconscout.com/icon/free/png-512/notification-error-827051.png')
        .attachFile(filePath);

    await owner.send(errorEmbed);
};