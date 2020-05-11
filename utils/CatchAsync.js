const errController = require('../controllers/errorController');

class CatchAsync {
    fn;

    constructor(fn) {
        this.fn = fn;
    }

    guildCreate() {
        return guild => {
            this.fn(guild).catch(err => {
                err.type = 'guildCreateListener';
                errController(guild.client, err);
            });
        }
    }

    memberAdd() {
        return member => {
            this.fn(member).catch(err => {
                err.type = 'memberAddListener';
                errController(member.client, err);
            });
        }
    }

    memberRemove() {
        return member => {
            this.fn(member).catch(err => {
                err.type = 'memberRemoveListener';
                errController(member.client, err);
            });
        }
    }

    message() {
        return message => {
            this.fn(message).catch(err => {
                err.type = 'messageListener';
                errController(message.client, err);
            });
        }
    }
}

module.exports = CatchAsync;
