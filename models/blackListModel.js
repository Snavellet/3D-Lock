const mongoose = require('mongoose');

const blackListSchema = new mongoose.Schema({
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
    reason: {
        type: String,
        required: [true, 'A reason is required!'],
        trim: true
    }
});

module.exports = mongoose.model('blacklist', blackListSchema);
