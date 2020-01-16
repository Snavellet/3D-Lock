const errController = require('../../controllers/errorController');

module.exports = fn => {
    return guild => {
        fn(guild).catch(err => {
            err.type = 'guildCreateListener';
            errController(guild.client, err);
        });
    }
};
