const logger = require('../utils/logger');

module.exports = client => {
    return async () => {
        logger.info(`Logged in successfully as ${client.user.tag}.`);

        await client.user.setPresence( { status: 'online', game: {type: 'WATCHING', name: 'this server'}, afk: false } )
    }
};