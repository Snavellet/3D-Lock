const Prefix = require('../models/prefixModel');

module.exports = async (guildID, guildName) => {
    let prefix = await Prefix.findOne({ guildID });

    if(!prefix) {
        prefix = await Prefix.create({
            guildID,
            guildName,
            prefix: process.env.DEFAULT_PREFIX
        });
    }

    prefix = prefix.prefix;

    return prefix;
};