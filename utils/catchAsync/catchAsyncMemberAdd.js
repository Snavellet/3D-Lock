const errController = require('../../controllers/errorController');

module.exports = fn => {
    return member => {
        fn(member).catch(err => {
            err.type = 'memberAddListener';
            errController(member.client, err);
        });
    }
};