import Discord from 'discord.js';
import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 */
export async function run(message) {     
    const api = 'https://gideonbot.com/api/status';

    try {
        const body = await Util.fetchJSON(api); 
    
        message.channel.send(Util.CreateEmbed('Gideon API status:', {
            description: `${body.API.status}`,
            thumbnail: Util.config.avatar
        }, message.member));
    }
    
    catch (ex) {
        Util.log('Caught an exception while fetching API data: ' + ex.stack);
        return message.channel.send(Util.CreateEmbed('An error occurred while fetching github data!', null, message.member));
    }
}

export const help = {
    name: ['status', 'api'],
    type: 'stats',
    help_text: 'status',
    help_desc: 'Checks Gideon\'s API status',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};