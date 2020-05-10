import Discord from 'discord.js';
import Util from '../../Util.js';

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(gideon, message, args) {
    const url = 'https://sv443.net/jokeapi/v2/joke/Any?type=single';
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