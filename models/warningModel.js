const mongoose = require('mongoose');

const warningSchema = new mongoose.Schema({
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
    warnings: {
        type: Number,
        maximum: 100,
        required: [true, 'The amount of warnings are required!']
    }
});

module.exports = mongoose.model('warning', warningSchema);
