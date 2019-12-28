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
    roleID: {
        type: String,
        trim: true,
        required: [true, 'A role ID is required!'],
        unique: [true, 'A role ID is required to be unique!']
    },
    roleName: {
        type: String,
        trim: true,
        required: [true, 'A role name is required!']
    },
    event: {
        type: String,
        trim: true,
        validator: {
            enum: ['beforeVerification', 'afterVerification', 'bot'],
            message: 'It can be only memberAdd, memberLeft and bot!'
        }
    }
});

module.exports = mongoose.model('roles', prefixModel);
