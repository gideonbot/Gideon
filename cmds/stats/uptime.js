import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 */
export async function run(message) {
    message.channel.send(Util.Embed('Enter Flashtime!', {description: Util.secondsToDifferenceString(process.gideon.uptime / 1000, { enableSeconds: true })}, message.member));
}

export const help = {
    name: 'uptime',
    type: 'stats',
    help_text: 'uptime',
    help_desc: 'Displays the bot\'s uptime',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};