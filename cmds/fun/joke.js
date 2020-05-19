import Discord from 'discord.js';
import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(message, args) {
    let type = 'Any';

    let types = {
        Programming: ['prog', 'program', 'programming'],
        Miscellaneous: ['miscellaneous', 'misc'],
        Dark: ['dark'],
    };

    if (args.length > 0) {
        let p_type = args[0].toLowerCase();
        for (let key in types) {
            if (types[key].includes(p_type)) type = key;
        }
    }

    const url = 'https://sv443.net/jokeapi/v2/joke/' + type + '?type=single';
    const body = await Util.fetchJSON(url);

    message.channel.send(Util.CreateEmbed('Category: ' + body.category, {
        description: body.joke
    }, message.member));       
}

export const help = {
    name: ['joke', 'gag'],
    type: 'misc',
    help_text: 'joke',
    help_desc: 'Displays a random joke',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};