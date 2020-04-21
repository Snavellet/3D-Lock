const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
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
	channelID: {
		type: String,
		required: [true, 'An channel ID is required!'],
		unique: [true, 'A channel ID is required to be unique!'],
		trim: true
	},
	channelName: {
		type: String,
		required: [true, 'An channel name is required!'],
		unique: [true, 'A channel name is required to be unique!'],
		trim: true
	},
	event: {
		type: String,
		trim: true,
		validator: {
			enum: ['verification'],
			message: 'It can be only verification!'
		}
	}
});

module.exports = mongoose.model('channel', channelSchema);
