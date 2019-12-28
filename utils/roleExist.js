const Discord = require('discord.js');
const Prefix = require('../models/prefixModel');

module.exports = async (guild, roleID, command) => {
  const exist = guild.roles.some(fn => fn.id === roleID);
  if(exist) return true;

  let members = guild.members.array();
  members = members.filter(fn => !fn.user.bot);
  members = members.filter(fn => fn.hasPermission('MANAGE_ROLES'));

  let prefix = await Prefix.findOne({ guildID: guild.id });
  prefix = prefix.prefix;

  const roleName = guild.roles.get(roleID).name;

  for(const i in members) {
    const invalidRoleEmbed = new Discord.RichEmbed()
        .setTitle(`Invalid Role! (${guild.name})`)
        .setDescription(`The role called **${roleName}** is invalid, it can be ***deleted**. Please say ${prefix}${command} [roleID] to set a new role.`)
        .setThumbnail(guild.iconURL)
        .setColor('#E02424')
        .setAuthor(members[i].user.username, members[i].user.avatarURL)
        .setFooter('Please read the rules and enjoy staying in the server!', 'https://papermilkdesign.com/images/emoji-clipart-iphone-1.jpg');

    await members[i].user.send(invalidRoleEmbed);
  }

  return false;
};