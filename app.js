const Discord = require('discord.js');
const messageListener = require('./listeners/message');
const readyListener = require('./listeners/ready');
const memberAddListener = require('./listeners/memberAddListener');
const memberRemoveListener = require('./listeners/memberRemoveListener');

const client = new Discord.Client();

client.on('ready', readyListener(client));
client.on('message', messageListener);
client.on('guildMemberAdd', memberAddListener);
client.on('guildMemberRemove', memberRemoveListener);

module.exports = client;
