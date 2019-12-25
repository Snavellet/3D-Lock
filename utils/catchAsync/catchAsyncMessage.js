const errController = require('../../controllers/errorController');

module.exports = fn => {
    return message => {
        fn(message).catch(err => {
            err.type = 'messageListener';
            errController(message.client, err);
        });
    }
};