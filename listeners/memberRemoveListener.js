const User = require('../models/userModel');
const catchAsyncMember = require('../utils/catchAsync/catchAsyncMemberRemove');

module.exports = catchAsyncMember(async member => {
    const user = await User.findOne({ userID: member.user.id });

    if(user) {
        await User.findOneAndDelete({ userID: member.user.id});
    }
});