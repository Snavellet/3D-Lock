const notifyOwnerError = require('../utils/notifyOwnerError');
const logger = require('../utils/logger');

module.exports = (client, err) => {
    logger.error(`There was an error in ${err.type}.\nMessage: ${err.message}, \nStackTrace: ${err.stack}`);
    return notifyOwnerError(client, err)
        .catch(err => logger.error(err));
};