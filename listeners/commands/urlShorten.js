const fetch = require('node-fetch');

module.exports = {
    name: 'urlshorten',
    description: 'The purpose of this command is to shorten URLs.',
    args: true,
    cooldown: 5,
    async execute(message, args) {
        const postData = {
            url: args[0]
        }

        let data = await fetch('https://rel.ink/api/links/', {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: { 'Content-Type': 'application/json' },
        });

        data = await data.json();

        if (Array.isArray(data.url)) {
            return message.reply(data.url[0]);
        }

        await message.reply(`here you go: https://rel.ink/${data.hashid}`)
    },
};
