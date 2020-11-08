import Discord from 'discord.js';
import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(message, args) {
    const as = Util.Embed('You must supply valid input!', null, message.member);
    if (!args[0].match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/)) return message.channel.send(as);  

    const emoji = Discord.Util.parseEmoji(args[0]);

    if (!emoji) return message.channel.send(Util.Embed('I cannot access that emoji'));

    let url = `https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? 'gif' : 'png'}`;

    const embed = Util.Embed(`Info about \`${emoji.name}\` (ID: \`${emoji.id}\`)`, {
        thumbnail: url,
        fields: [
            {
                name: '❯ Info',
                value: 
                `• Identifier: \`<${args[0]}:${emoji.id}>\`\n
                 • Creation Date: \`${Discord.SnowflakeUtil.deconstruct(emoji.id).date.toUTCString()}\`\n
                 • URL: ${url}
                `
            }
        ]
    }, message.member);

    message.channel.send(embed);
}

export const help = {
    name: ['emoji', 'emote'],
    type: 'misc',
    help_text: 'emoji <emoji>',
    help_desc: 'Displays a GuildEmoji\'s info',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {force: true, amount: 1},
    roles: [],
    user_perms: [],
    bot_perms: []
};
