const Discord = require('discord.js');
const Prefix = require('../models/prefixModel');
const crypto = require('crypto');
const User = require('../models/userModel');
const Role = require('../models/roleModel');

class GuildUtil {
    guild;
    role;

    constructor(guild, role = null) {
        this.guild = guild;
        this.role = role;
    }

    async getPrefix() {
        let prefix = await Prefix.findOne({ guildID: this.guild.id });

        if(!prefix) {
            prefix = await Prefix.create({
                guildID: this.guild.id,
                guildName: this.guild.name,
                prefix: process.env.DEFAULT_PREFIX
            });
        }

        prefix = prefix.prefix;

        return prefix;
    }

    async generateVerificationCode(user) {
        const verificationCode = crypto.randomBytes(process.env.VERIFICATION_CODE_SIZE * 1).toString('hex');

        await User.create({
            guildID: this.guild.id,
            guildName: this.guild.name,
            userID: user.id,
            userTag: user.tag,
            verificationCode,
            verificationExpire: Date.now() + process.env.VERIFICATION_EXPIRE * 60 * 1000
        });

        return verificationCode;
    }

    async createAndUpdateRoles(event) {
        const newRoleObj = this.giveNewRoleObj();
        return Role.findOneAndUpdate({
            guildID: this.guild.id,
            event
        }, {
            guildID: this.guild.id,
            guildName: this.guild.name,
            roleID: newRoleObj.id,
            roleName: newRoleObj.name,
            event
        }, { upsert: true, new: true });
    }

    giveNewRoleObj() {
        return {
            name: (this.role.name && this.guild.roles.array().filter(el => el.name === this.role.name).length >= 1) ? this.role.roleName: this.role.name,
            id: !this.guild.roles.get(this.role.id) ? this.role.roleID : this.role.id
        }
    }

    async roleExist(command) {
        const newRoleObj = this.giveNewRoleObj();
        // previous this.role.id which is causing the error
        const exist = this.guild.roles.some(fn => fn.id === newRoleObj.id);
        if(exist) return true;

        let members = this.guild.members.array();
        members = members.filter(fn => !fn.user.bot);
        members = members.filter(fn => fn.hasPermission('MANAGE_ROLES'));

        const prefix = await this.getPrefix();

        const roleName = this.guild.roles.get(newRoleObj.id).name;

        for(const i in members) {
            const invalidRoleEmbed = new Discord.RichEmbed()
                .setTitle(`Invalid Role! (${this.guild.name})`)
                .setDescription(`The role called **${roleName}** is invalid, it can be ***deleted**. Please say ${prefix}${command} [roleID] to set a new role.`)
                .setThumbnail(this.guild.iconURL)
                .setColor('#E02424')
                .setAuthor(members[i].user.username, members[i].user.avatarURL)
                .setFooter('Please read the rules and enjoy staying in the server!', 'https://papermilkdesign.com/images/emoji-clipart-iphone-1.jpg');

            await members[i].user.send(invalidRoleEmbed);
        }

        return false;
    }

    async roleSame(event) {
        const newRoleObj = this.giveNewRoleObj();
        const role = await Role.findOne({ guildID: this.guild.id, event });
        if(!role) return;

        return role.roleID === newRoleObj.id;
    }

    static async roleManage(message, role, event) {
        if(!role) return await message.reply('invalid role ID, please try again.');

        const guildUtil = new GuildUtil(message.guild, role);

        if(await guildUtil.roleSame(event)) {
            return await message.reply('that\'s the role that is currently set to!');
        }

        role = await guildUtil.createAndUpdateRoles(event);

        await message.reply(`successfully set the role to <@&${role.roleID}>!`);
    }
}

module.exports = GuildUtil;
