const mongoose = require('mongoose');

const warningThresholdSchema = new mongoose.Schema({
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
    threshold: {
        type: Number,
        maximum: 15,
        required: [true, 'The limit for warnings are required!']
    }
});

module.exports = mongoose.model('warning-threshold', warningThresholdSchema);
