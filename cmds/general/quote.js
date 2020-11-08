import Util from '../../Util.js';
import gideonapi from 'gideon-api';

/**
 * @param {Discord.Message} message
 */
export async function run(message) {
    const quote = await gideonapi.quote();
    return message.channel.send(Util.Embed(null, {description: '**' + quote.text + '**', thumbnail: quote.img}, message.member));
}

export const help = {
    name: 'quote',
    type: 'fun',
    help_text: 'quote',
    help_desc: 'Displays a random quote',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};