import Discord from 'discord.js';
import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 */
export async function run(message) {
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