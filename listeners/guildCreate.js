const WarningThreshold = require('../models/warningThresholdModel');
const catchAsyncGuild = require('../utils/catchAsync/catchAsyncGuildCreate');

module.exports = catchAsyncGuild(async guild => {
    await WarningThreshold.create({
        guildID: guild.id,
        guildName: guild.name,
        threshold: process.env.WARNING_INITIAL * 1
    });
});
