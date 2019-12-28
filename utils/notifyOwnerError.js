const fs = require('fs');
const mkdirp = require('mkdirp-promise');
const path = require('path');
const { promisify } = require("es6-promisify");
const Discord = require('discord.js');
const getDirName = require('path').dirname;

module.exports = async (client, err) => {
    const owner = client.users.get(process.env.BOT_OWNER_ID);
    const filePath = path.join(__dirname, '/stackTrace/stackTrace.txt');

    const writeFile = async (path, contents, option) => {
        await mkdirp(getDirName(path));
        await promisify(fs.writeFile)(path, contents, option);
    };

    await writeFile(filePath, err.stack, 'utf8');

    const errorEmbed = new Discord.RichEmbed()
        .setAuthor(owner.username, owner.avatarURL)
        .setColor('#E02424')
        .setTitle('There was an error in the bot!')
        .addField('Error Message', err.message)
        .setFooter('I hope you fix the error, you are the best bot maker!', 'https://img.icons8.com/cotton/2x/error--v1.png')
        .setThumbnail('https://cdn.iconscout.com/icon/free/png-512/notification-error-827051.png')
        .attachFile(filePath);

    await owner.send(errorEmbed);
};