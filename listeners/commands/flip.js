module.exports = {
    name: 'flip',
    description: 'The purpose of this command is to flip a coin and get whether heads or tails.',
    cooldown: 1,
    async execute(message) {
        const coin = ['heads', 'tails'];

        await message.reply(coin[Math.floor(Math.random() * coin.length)] + '.')
    },
};
