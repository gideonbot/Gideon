import Discord from 'discord.js';
import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 */
export async function run(message) {
    message.channel.send(Util.Embed('Discord Permission Flags:', {
        description: Object.keys(Discord.Permissions.FLAGS).map(perms => `\`${perms}\``).join(' ')
    }, message.member));       
}

export const help = {
    name: ['flags', 'permflags'],
    type: 'misc',
    help_text: 'flags',
    help_desc: 'Displays Discord permission flags',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};