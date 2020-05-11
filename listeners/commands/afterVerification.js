const GuildUtil = require('../../utils/GuildUtil');

module.exports = {
    name: 'aftver',
    description: 'The purpose of this command is to set the role for giving new members after verifying.',
    args: true,
    cooldown: 5,
    async execute(message, args) {
        if(!message.member.hasPermission('MANAGE_ROLES')) return;

        let role = message.guild.roles.get(args[0]);
        const event = 'afterVerification';

        await GuildUtil.roleManage(message, role, event);
    },
};