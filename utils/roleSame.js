const Role = require('../models/roleModel');

module.exports = async (guildID, event, roleID) => {
    const role = await Role.findOne({ guildID, event });
    if(!role) return;

    return role.roleID === roleID;
};