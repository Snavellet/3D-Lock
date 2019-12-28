const Role = require('../../models/roleModel');

module.exports = {
    name: 'botrole',
    description: 'The purpose of this command is to set the role for giving new bots.',
    args: true,
    cooldown: 5,
    async execute(message, args) {
        if(!message.member.hasPermission('MANAGE_ROLES')) return;

        let role = message.guild.roles.get(args[0]);

        if(!role) return await message.reply('invalid role ID, please try again.');

        role = await Role.create({
            guildID: message.guild.id,
            guildName: message.guild.name,
            roleID: role.id,
            roleName: role.name,
            event: 'bot'
        });

        await message.reply(`successfully set the role to <@&${role.roleID}>!`);
    },
};