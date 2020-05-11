const WarningThreshold = require('../models/warningThresholdModel');
const CatchAsync = require('../utils/CatchAsync');

module.exports = new CatchAsync(async guild => {
    await WarningThreshold.create({
        guildID: guild.id,
        guildName: guild.name,
        threshold: process.env.WARNING_INITIAL * 1
    });
}).guildCreate();
