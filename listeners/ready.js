const User = require('../models/userModel');
const Role = require('../models/roleModel');
const Prefix = require('../models/prefixModel');
const logger = require('../utils/logger');

module.exports = client => {
	return async () => {
		logger.info(`Logged in successfully as ${client.user.tag}.`);

		const mainServer = client.guilds.get(process.env.MAIN_SERVER);
		let roleID = await Role.findOne({ guildID: mainServer.id, event: 'beforeVerification' });
		roleID = roleID.roleID;

		let prefix = await Prefix.findOne({ guildID: mainServer.id });
		prefix = prefix.prefix;

		const stopBypass = async (allUsers, member) => {
			const verificationCode = allUsers.updateVerificationCode();
			await allUsers.save();

			await member.setRoles([roleID], 'Bypassing Verification Is Restricted');
			await member.user.send(`Please say \`${prefix}verify ${verificationCode}\` to verify again, remember this code ***expires*** in **${process.env.VERIFICATION_EXPIRE} minutes**.`);
		};

		setInterval(async () => {
			const allUsers = await User.find({ guildID: mainServer.id });

			for(const i in allUsers) {
				const member = mainServer.members.get(allUsers[i].userID);
				if(!member) return;
				if(member.roles.array().length > 2) {
					await stopBypass(allUsers[i], member);
					continue;
				}

				if(member.roles.some(role => role.id === roleID)) continue;

				await stopBypass(allUsers[i], member);
			}

		}, 30000);


		await client.user.setPresence({
			status: 'online',
			game: { type: 'WATCHING', name: 'this server' },
			afk: false
		});
	}
};
