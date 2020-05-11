const User = require('../models/userModel');
const CatchAsync = require('../utils/CatchAsync');

module.exports = new CatchAsync(async member => {
    if(member.user.bot) return;

    const user = await User.findOne({ guildID: member.guild.id, userID: member.user.id });

    if(user) {
        await User.findOneAndDelete({ userID: member.user.id});
    }
}).memberRemove();
