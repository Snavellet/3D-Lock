const fetch = require('node-fetch');

module.exports = {
    name: 'insult',
    description: 'The purpose of this command is to insult you',
    cooldown: 5,
    async execute(message, args) {
        const roasts = [
            { "number": 1, "roast": "I'd offer you some gum but your smiles got plenty of it." },
            { "number": 2, "roast": "Repeat after me: semen is not hair gel." },
            { "number": 3, "roast": "Your body fat is about as evenly distributed as wealth in the US economy." },
            { "number": 4, "roast": "You're like dobby from harry potter, only people won't be sad when you die in the seventh book." },
            { "number": 5, "roast": "If I asked you about your cock it wouldn't be a very long conversation." },
            { "number": 6, "roast": "You have the kinds of looks that make people talk about your personality." },
            { "number": 7, "roast": "You look like the result of pressing random on the character creation menu." },
            { "number": 8, "roast": "You look like the after picture of a meth ad." },
            { "number": 9, "roast": "Even the shower doesn't want to see you naked." },
            { "number": 10, "roast": "I bet you wear a nose ring because no one wants to put one on your finger." },
            { "number": 11, "roast": "When the airforce needs extra landing space they should just rent out your forehead." },
            { "number": 12, "roast": "If laughter is the best medicine, your face must be curing the world." },
            { "number": 13, "roast": "The only way you will ever get laid is if you crawl up a chickens ass and wait." },
            { "number": 14, "roast": "It looks like your face caught fire and someone tried to put it out with a hammer." },
            { "number": 15, "roast": "Your family tree must be a cactus because everyone on it is a prick." },
            { "number": 16, "roast": "Save your breath - youre going to need it to blow up your date." },
            { "number": 17, "roast": "Your proof evolution can go in reverse." },
            { "number": 18, "roast": "When you were born, the doctor came out to the waiting room and said to your dad, \"I'm very sorry. We did everything we could. But he pulled through.\"" },
            { "number": 19, "roast": "You've got less meat in your pants than there is in a vegetarian restaurant." },
            { "number": 20, "roast": "I wasn't born with enough middle fingers to let you know how I feel about you." },
            { "number": 21, "roast": "Your birth certificate is an apology letter from the condom factory." },
            { "number": 22, "roast": "You're about as useful as a vibrator with no batteries." },
            { "number": 23, "roast": "Fake hair, fake nails, fake smile. Are you sure you weren't made in China?" },
            { "number": 24, "roast": "Mirrors can't talk, and lucky for you they can't laugh either." },
            { "number": 25, "roast": "I'd say you're funny, but looks aren't everything." },
            { "number": 26, "roast": "You must have been born on a highway because thats where most accidents happen." },
            { "number": 27, "roast": "When I see your face theres not a thing I would change... Except for the direction im walking in." },
            { "number": 28, "roast": "Your so ugly when you popped out the doctor said aww what a treasure and your mom said yeah lets bury it." },
            { "number": 29, "roast": "I hear when you were a child your mother wanted to hire somebody to take care of you, but the mafia wanted too much." },
            { "number": 30, "roast": "You're so fat the only letters of the alphabet you know are KFC." },
            { "number": 31, "roast": "The only positive thing about you is your HIV status." },
            { "number": 32, "roast": "You're like STDs, nobody wants you, everyone hates you and it proves your parents should have used protection." },
            { "number": 33, "roast": "The only way I'd lay naked with you would be in a mass grave." },
            { "number": 34, "roast": "You're the cum your mother should have swallowed." },
            { "number": 35, "roast": "I heard your mom got fired from her job at the sperm bank - the boss caught her drinking on the job." },
            { "number": 36, "roast": "You should wear a condom on your head because if you're gonna act like a dick you might as well dress like one!" },
            { "number": 37, "roast": "Twinkle twinkle little star, I want to hit you with my car, Throw you off a cliff so high, I hope you break your neck and die." },
            { "number": 38, "roast": "Some babies were dropped on their heads but you were clearly thrown at a wall." },
            { "number": 39, "roast": "Roses are red, shit is brown, shut the fuck up, and sit the fuck down." },
            { "number": 40, "roast": "I see you were so impressed with your first chin that you added two more." },
            { "number": 41, "roast": "Twinkle twinkle little whore, close your legs, they're not a door." },
            { "number": 42, "roast": "I guess those penis enlargement pills are working - you're twice the dick you were yesterday!" },
            { "number": 43, "roast": "Twinkle Twinkle little slut, name a guy you haven't fucked, was he skinny, was he tall, Nevermind you did them all." },
            { "number": 44, "roast": "I failed a spelling test because they asked me how to spell 'bitch' and I wrote down your name." },
            { "number": 45, "roast": "You're like a light switch, even a little kid can turn you on." },
            { "number": 46, "roast": "I don't see any dicks in the general vicinity... So I'm wondering why you keep opening your fucking mouth." },
            { "number": 47, "roast": "Who lit the fuse on your tampon?" },
            { "number": 48, "roast": "Twinkle twinkle little slut, You like dick inside your butt." },
            { "number": 49, "roast": "The last time I saw a face like yours I fed it a banana." },
            { "number": 50, "roast": "Roses are red, violets are blue. I have five fingers and the middle one is for you." },
            { "number": 51, "roast": "I'd like to kick you in the teeth but why improve your looks?" },
            { "number": 52, "roast": "At least there's one good thing about your body. It isn't as ugly as your face." },
            { "number": 53, "roast": "Your the reason the gene pool needs a lifeguard." },
            { "number": 54, "roast": "Your not yourself today, I noticed the improvement immediately." },
            { "number": 55, "roast": "You\'re the reason your dad drinks." },
            { "number": 56, "roast": "Is your butt jealous of the amount of shit that just came out of your mouth?" },
            { "number": 57, "roast": "You\'d be suicidal if you felt as bad as you look." },
            { "number": 58, "roast": "Your lips keep moving but I don\'t speak stupid." },
            { "number": 59, "roast": "Calling you an idiot would be an insult to all stupid people." },
            { "number": 60, "roast": "Brains aren\'t everything, in fact in your case their nothing." },
            { "number": 61, "roast": "I know your not as stupid as you look, Nobody could be!" },
            { "number": 62, "roast": "You\'re kind of like Rapunzel except instead of letting down your hair, you let down everyone in your life." },
            { "number": 63, "roast": "You have more dick in your personality than you do in your pants." },
            { "number": 64, "roast": "I\'m sorry your dad beat you instead of cancer." },
            { "number": 65, "roast": "You\'re so fat you need cheat codes to play Wii Fit." },
            { "number": 66, "roast": "The only thing that goes erect when I'm near you is my middle finger." },
            { "number": 67, "roast": "Stop bullying fat people, they have enough on their plate." },
            { "number": 68, "roast": "If I were your mirror I would commit suicide." },
            { "number": 69, "roast": "Being a dick to everyone won\'t make yours any bigger." },
            { "number": 70, "roast": "Your face could scare the shit out of a toilet." },
            { "number": 71, "roast": "They say people get what they deserve. In your case it\'s a participation trophy." },
            { "number": 72, "roast": "Anyone willing to fuck you is just too lazy to masturbate." },
            { "number": 73, "roast": "Your so stupid I don\'t have the time or the crayons to explain this to you." },
            { "number": 74, "roast": "Your face looks like something I would draw with my non dominant hand." },
            { "number": 75, "roast": "If my dog had your face I would shave his ass and teach him to walk backwards." },
            { "number": 76, "roast": "If your IQ was multipled by anything it would still be 0." },
            { "number": 77, "roast": "At least Hitler killed himself." },
            { "number": 78, "roast": "I\'d agree with you but then we\'d both be wrong." },
            { "number": 79, "roast": "When you were born your mom threw you out the window and the window threw you back." },
            { "number": 80, "roast": "You're about as useful as Anne Frank's drum set." },
            { "number": 81, "roast": "If I wanted to kill myself I'd climb your ego and jump to your IQ." },
            { "number": 82, "roast": "I would burn you but burning trash is bad for the environment." },
            { "number": 83, "roast": "I haven\'t seen you run that fast since Twinkies went on sale!" },
            { "number": 84, "roast": "You were so ugly that when you were born the doctor put tinted windows on your incubator." },
            { "number": 85, "roast": "Everything that comes out of your mouth is a lie, everything that goes in is a cock." },
            { "number": 86, "roast": "I heard you received a brain transplant but it rejected your body." },
            { "number": 87, "roast": "The only reason your partner likes your dick is because they were taught to enjoy the little things in life." },
            { "number": 88, "roast": "Someone once said your as pretty as a picture... I agree I would love to hang you." },
            { "number": 89, "roast": "Your like Mondays, everyone hates you." },
            { "number": 90, "roast": "The 80\'s called, they want their haircut back." },
            { "number": 91, "roast": "You must\'ve been born at a pound because you're a son of a bitch." },
            { "number": 92, "roast": "It\'s better to let someone think you are an idiot then to open your mouth and prove it." },
            { "number": 93, "roast": "I guess you prove that even god makes mistakes sometimes." },
            { "number": 94, "roast": "I\'m jealous of people that don\'t know you!" },
            { "number": 95, "roast": "You\'re so dumb that you got hit by a parked car." },
            { "number": 96, "roast": "I bet your brain feels as good as new, seeing that you never use it." },
            { "number": 97, "roast": "What\'s the difference between you and eggs? Eggs get laid and you don\'t." },
            { "number": 98, "roast": "If you\'re gonna be a smartass, first you have to be smart. Otherwise you\'re just an ass." },
            { "number": 99, "roast": "At least when I do a handstand my stomach doesn\'t hit me in the face." },
            { "number": 135, "roast": "I don\'t exactly hate you, but if you were on fire and I had water, I\'d drink it." },
            { "number": 101, "roast": "God made you as an example of what not to do." },
            { "number": 102, "roast": "You're proof that God has a sense of humor." },
            { "number": 103, "roast": "You\'re so fat you could sell shade." },
            { "number": 104, "roast": "You\'ll never be the man your mother is." },
            { "number": 105, "roast": "Which sexual position produces the ugliest children? Ask your mother." },
            { "number": 106, "roast": "I thought of you today. It reminded me to take the garbage out." },
            { "number": 107, "roast": "You\'re so ugly when you look in the mirror, your reflection looks away." },
            { "number": 108, "roast": "Gay? I\'m straighter than the pole your mom dances on." },
            { "number": 109, "roast": "I just stepped in something that was smarter than you and smelled better too." },
            { "number": 110, "roast": "I can\'t help imagining how much awesomer the world would be if your dad had just pulled out." },
            { "number": 111, "roast": "Good story, but in what chapter do you shut the fuck up?" },
            { "number": 112, "roast": "I was pro life. Then I met you." },
            { "number": 113, "roast": "I\'d tell you to go fuck yourself, but that would be cruel and unusual punishment." },
            { "number": 114, "roast": "You stare at frozen juice cans because they say, \"concentrate\"." },
            { "number": 115, "roast": "You have the perfect face for radio." },
            { "number": 116, "roast": "You\'re so ugly you make blind kids cry." },
            { "number": 117, "roast": "Nice shirt, what brand is it? Clearance?" },
            { "number": 118, "roast": "Don\'t you need a license to be that ugly?" },
            { "number": 119, "roast": "One more wrinkle and you\'d pass for a prune." },
            { "number": 120, "roast": "You\'re so dumb, your dog teaches you tricks." },
            { "number": 121, "roast": "You\'re the reason they invented double doors!" },
            { "number": 122, "roast": "Hold on, I\'ll go find you a tampon." },
            { "number": 123, "roast": "You prefer three left turns to one right turn." },
            { "number": 124, "roast": "You conserve toilet paper by using both sides." },
            { "number": 125, "roast": "What did you have for breakfast? Bitch Flakes?" },
            { "number": 126, "roast": "You're so stupid you tried to wake a sleeping bag." },
            { "number": 127, "roast": "You're so stupid, you'd trip over a cordless phone." },
            { "number": 128, "roast": "I called your boyfriend gay and he hit me with his purse!" },
            { "number": 129, "roast": "You're so stupid, it takes you an hour to cook minute rice." },
            { "number": 130, "roast": "Don't feel sad, don't feel blue, Frankenstein was ugly too." },
            { "number": 131, "roast": "If I wanted a bitch I'd have bought a dog." },
            { "number": 132, "roast": "You shouldn't play hide and seek, no one would look for you." },
            { "number": 133, "roast": "You're so ugly, when you threw a boomerang it didn't come back." },
            { "number": 134, "roast": "The clothes you wear are so ugly even a scarecrow wouldn't wear them." },
            { "number": 135, "roast": "You're so ugly, when you got robbed, the robbers made you wear their masks." }
            //{ "number": 136, "roast": "You're not completely useless, you can always serve as a bad example." }
        ];

        // let insult = await fetch('https://evilinsult.com/generate_insult.php?lang=en&type=json');
        // insult = await insult.json();
        // insult = insult.insult;
        // insult = insult.toLowerCase();
        const insult = roasts[Math.ceil(Math.random() * roasts.length)].roast;

        const checkOwner = userId => {
            return userId === process.env.BOT_OWNER_ID;
        }

        if (args.length > 1) {
            return message.reply('one by one please!')
        }

        if (message.guild.members.get(args[0])) {
            if (checkOwner(message.guild.members.get(args[0]).id)) {
                await message.react('🖕');
                return message.reply('you cannot insult my owner idiot!');
            }
            return message.channel.send(`<@${args[0]}>, ${insult}`);
        }

        if (message.mentions.users.array().length > 0) {
            if (checkOwner(message.mentions.users.array()[0].id)) {
                await message.react('🖕');
                return message.reply('you cannot insult my owner idiot!');
            }
            return message.channel.send(`<@${message.mentions.users.array()[0].id}>, ${insult}`);
        }

        await message.reply(insult);
    },
};
