import Discord from 'discord.js';
import Util from '../../Util.js';
import gideonapi from 'gideon-api';

/**
 * @param {Discord.Message} message
 */
export async function run(message) {
    try {
        const quote = await gideonapi.quote();
        message.channel.send(Util.CreateEmbed(null, {description: '**' + quote.text + '**', thumbnail: quote.img}, message.member));
    }

    catch (ex) {
        Util.log('An error occurred while trying to fetch a quote: ' + ex.stack);

        return message.channel.send(Util.CreateEmbed('Failed to fetch a quote, please try again later!', null, message.member));
    }
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