const crypto = require('crypto');
const User = require('../models/userModel');

module.exports = async (guild, user) => {
    const verificationCode = crypto.randomBytes(process.env.VERIFICATION_CODE_SIZE * 1).toString('hex');

    await User.create({
        guildID: guild.id,
        guildName: guild.name,
        userID: user.id,
        userTag: user.tag,
        verificationCode,
        verificationExpire: Date.now() + process.env.VERIFICATION_EXPIRE * 60 * 1000
    });

    return verificationCode;
};