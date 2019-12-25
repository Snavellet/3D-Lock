const { connect } = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: 'config.env' });

const logger = require('./utils/logger');
const client = require('./app');

(async () => {
    try {
        await connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true,
            useUnifiedTopology: true
        });

        logger.info('DB connection successful!')
    } catch (err) {
        logger.error(`There is an connecting to DB, ${err}`);
    }
})();

(async () => {
    try {
        await client.login(process.env.TOKEN);
    } catch (err) {
        logger.error(`There is an error logging in, ${err}`);
    }
})();