const logger = require('../utils/logger');

module.exports = client => {
    return () => {
        logger.info(`Logged in successfully as ${client.user.tag}.`);
    }
};