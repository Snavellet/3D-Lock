const User = require('../models/userModel');
const catchAsyncMember = require('../utils/catchAsync/catchAsyncMemberRemove');

module.exports = catchAsyncMember(async member => {
    if(member.user.bot) return;

    const user = await User.findOne({ guildID: member.guild.id, userID: member.user.id });

    if(user) {
        await User.findOneAndDelete({ userID: member.user.id});
    }
});