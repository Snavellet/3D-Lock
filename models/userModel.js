const crypto = require('crypto');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    guildID: {
        type: String,
        required: [true, 'A guild ID is required!'],
        trim: true
    },
    guildName: {
        type: String,
        required: [true, 'A guild name is required!'],
        trim: true
    },
   userID: {
       type: String,
       required: [true, 'An user ID is required!'],
       unique: [true, 'An user ID is required to be unique!'],
       trim: true
   },
    userTag: {
        type: String,
        required: [true, 'An user tag is required!'],
        unique: [true, 'An user ID is required to be unique!'],
        trim: true
    },
    verificationCode: {
        type: String,
        required: [true, 'A verification code is required!'],
        unique: [true, 'A verification code is required to be unique!'],
        trim: true
    },
    verificationExpire: {
        type: Date,
        required: [true, 'A expiration date for the verificationCode is required!'],
        trim: true
    }
});

userSchema.methods.updateVerificationCode = function() {
    const verificationCode = crypto.randomBytes(16).toString('hex');

    this.verificationCode = verificationCode;
    this.verificationExpire = Date.now() + Date.now() + process.env.VERIFICATION_EXPIRE * 60 * 1000;

    return verificationCode;
};

module.exports = mongoose.model('users', userSchema);
