const roleCreateAndUpdate = require('../../utils/createAndUpdateRoles');
const roleSame = require('../../utils/roleSame');

module.exports = {
    name: 'botrole',
    description: 'The purpose of this command is to set the role for giving new bots.',
    args: true,
    cooldown: 5,
    async execute(message, args) {
        if(!message.member.hasPermission('MANAGE_ROLES')) return;

        let role = message.guild.roles.get(args[0]);
        const event = 'bot';

        if(!role) return await message.reply('invalid role ID, please try again.');
        if(await roleSame(message.guild.id, event, role.id)) {
            return await message.reply('that\'s the role that is currently set to!');
        }

        role = await roleCreateAndUpdate(message.guild, role, event);

        await message.reply(`successfully set the role to <@&${role.roleID}>!`);
    },
};
