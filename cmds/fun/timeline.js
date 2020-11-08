import Util from '../../Util.js';
import gideonapi from 'gideon-api';

/**
 * @param {Discord.Message} message
 */
export async function run(message) {
    const timeline = await gideonapi.timeline();
    return message.channel.send(Util.Embed('Timeline change detected!', {description: timeline, image: 'https://i.imgur.com/qWN3luc.gif'}, message.member));
}

export const help = {
    name: 'timeline',
    type: 'fun',
    help_text: 'timeline',
    help_desc: 'Scans for changes in the timeline',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};
