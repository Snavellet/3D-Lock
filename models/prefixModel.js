const mongoose = require('mongoose');

const prefixModel = new mongoose.Schema({
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
    prefix: {
        type: String,
        required: [true, 'A guild needs a prefix!'],
        trim: true
    },
});

module.exports = mongoose.model('prefixes', prefixModel);
