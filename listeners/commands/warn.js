const Warning = require('../../models/warningModel');
const WarningThreshold = require('../../models/warningThresholdModel');
const Blacklist = require('../../models/blackListModel');

module.exports = {
    name: 'warn',
    description: 'The purpose of this command is to warn.',
    args: true,
    cooldown: 5,
    async execute(message, args) {
        if(!message.member.hasPermission('KICK_MEMBERS')) return;

        const matchedIDs = message.content.match(/(\s+)(\d+)/g);
        const noMentions = 'please mention someone to warn!';
        let reason;

        const warn = async (userArr, userArrIDs, reason) => {
            const realWarnMentions = async userNewArr => {
                for(const user in userNewArr) {
                    const guildMember = message.guild.members.get(userNewArr[user].id);
                    if(guildMember.hasPermission('KICK_MEMBERS')) return await message.reply('you cannot warn a mod!');

                    if(!guildMember) {
                        await message.reply(`${userNewArr[user].id} doesnt exist in this server anymore!`);
                        continue;
                    }

                    let warning = await Warning.findOne({ guildID: guildMember.guild.id, userID: guildMember.id });
                    if(!warning) {
                        warning = await Warning.create({
                            guildID: message.guild.id,
                            guildName: message.guild.name,
                            userID: guildMember.user.id,
                            userTag: guildMember.user.tag,
                            warnings: process.env.WARNING_INITIAL * 1
                        });
                    } else {
                        warning = await Warning.findOneAndUpdate({
                            guildID: message.guild.id,
                            userID: guildMember.user.id
                        }, {
                            guildName: message.guild.name,
                            userTag: guildMember.user.tag,
                            warnings: warning.warnings + 1
                        }, { upsert: true, new: true })
                    }

                    let warningThreshold = await WarningThreshold.findOne({ guildID: message.guild.id });
                    if(!warningThreshold) return await message.reply('cannot check for the warning threshold, please try again later!');
                    warningThreshold = warningThreshold.threshold;
                    warning = warning.warnings;

                    if(warning.warnings === warningThreshold) {
                        await message.channel.send(`<@${guildMember.user.id}>, you have reached \`${warning}\` warning(s) out of \`${warningThreshold}\`, you will be banned!`);

                        await Blacklist.create({
                            guildID: message.guild.id,
                            guildName: message.guild.name,
                            userID: guildMember.user.id,
                            userTag: guildMember.user.tag,
                            reason: reason.split(' ')[1]
                        });

                        return await guildMember.ban({
                            reason
                        });
                    }

                    await message.channel.send(`<@${guildMember.user.id}>, you have \`${warning}\` warning(s) out of \`${warningThreshold}\` for \`${reason.split(' ')[1]}\``);
                }
            };

            const realWarnIDs = async userNewIDsArray => {
                for(const user in userNewIDsArray) {
                    const guildMember = message.guild.members.get(userNewIDsArray[user]);

                    if(!guildMember) {
                        await message.reply(`${userNewIDsArray[user]} doesnt exist in this server anymore!`);
                        continue;
                    }

                    let warning = await Warning.findOne({ guildID: guildMember.guild.id, userID: guildMember.id });
                    if(!warning) {
                        warning = await Warning.create({
                            guildID: message.guild.id,
                            guildName: message.guild.name,
                            userID: guildMember.user.id,
                            userTag: guildMember.user.tag,
                            warnings: process.env.WARNING_INITIAL * 1
                        });
                    } else {
                        warning = await Warning.findOneAndUpdate({
                            guildID: message.guild.id,
                            userID: guildMember.user.id
                        }, {
                            guildName: message.guild.name,
                            userTag: guildMember.user.tag,
                            warnings: warning.warnings + 1
                        }, { upsert: true, new: true })
                    }

                    let warningThreshold = await WarningThreshold.findOne({ guildID: message.guild.id });
                    if(!warningThreshold) return await message.reply('cannot check for the warning threshold, please try again later!');
                    warningThreshold = warningThreshold.threshold;
                    warning = warning.warnings;

                    if(warning === warningThreshold) {
                        await message.channel.send(`<@${guildMember.user.id}>, you have reached \`${warning}\` warning(s) out of \`${warningThreshold}\`, you will be banned!`);

                        await Blacklist.create({
                            guildID: message.guild.id,
                            guildName: message.guild.name,
                            userID: guildMember.user.id,
                            userTag: guildMember.user.tag,
                            reason: reason.split(' ')[1]
                        });

                        return await guildMember.ban({
                           reason
                        });
                    }

                    await message.channel.send(`<@${guildMember.user.id}>, you have \`${warning}\` warning(s) out of \`${warningThreshold}\` for \`${reason.split(' ')[1]}\``);
                }
            };

            if(userArr[0]) {
                return await realWarnMentions(userArr);
            }

            return await realWarnIDs(userArrIDs);
        };

        reason = `${message.author.tag}: reason not supplied.`;

        if(message.mentions.users.array().length >= 1) {
            const mentionedArray = message.mentions.users.array();
            const lastElArr = args.slice(-1).pop();

            if(lastElArr && lastElArr.match(/^\w+/g)) reason = `${message.author.tag}: ${lastElArr}`;

            await warn(mentionedArray, false, reason);
        }
        else if(matchedIDs) {
            const newMatchedIDs = [];
            matchedIDs.forEach(el => newMatchedIDs.push(el.replace(/^\s+/g, '')));
            const lastElArr = args.slice(-1).pop();

            if(lastElArr && lastElArr.match(/^\w+/g)) reason = `${message.author.tag}: ${lastElArr}`;

            await warn(false, newMatchedIDs, reason);
        } else {
           return await message.reply(noMentions);
        }
    },
};
