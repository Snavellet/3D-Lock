const Role = require('../models/roleModel');

module.exports = (guild, role, event) => {
    return Role.findOneAndUpdate({
        guildID: guild.id,
        event
    }, {
        guildID: guild.id,
        guildName: guild.name,
        roleID: role.id,
        roleName: role.name,
        event
    }, { upsert: true, new: true });
};