const GuildUtil = require('../../utils/GuildUtil');

module.exports = {
	name: 'botrole',
	description: 'The purpose of this command is to set the role for giving new bots.',
	args: true,
	cooldown: 5,
	async execute(message, args) {
		if(!message.member.hasPermission('MANAGE_ROLES')) return;

		let role = message.guild.roles.get(args[0]);
		const event = 'bot';

		await GuildUtil.roleManage(message, role, event);
	},
};
