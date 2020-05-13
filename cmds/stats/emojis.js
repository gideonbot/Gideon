import Discord from 'discord.js';
import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 */
export async function run(message) {     
    const guild = message.guild;
    const emojis = guild.emojis.cache.map(emojis => emojis.toString()).join(' ');
    const escaped = Util.truncate(emojis, 1024, true);
    const rawurls = guild.emojis.cache.map(x => x.toString() + ' - ' + `[URL](${x.url} '${x.url}')` + '').join(' ');
    const urls = Util.truncate(rawurls, 1024, true);

    const embed = Util.CreateEmbed(null, {
        fields: [
            {
                name: '❯ Emojis:',
                value: emojis
            },
            {
                name: '❯ Escaped Emojis:',
                value: `\`${escaped}\``
            },
            {
                name: '❯ Emoji URL\'s:',
                value: urls
            },
        ]
    }, message.member);

    message.channel.send(embed);
}

export const help = {
    name: ['emojis', 'emotes'],
    type: 'stats',
    help_text: 'emojis',
    help_desc: 'Get a list of guild emojis',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};