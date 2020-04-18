import Discord from 'discord.js';
import Util from '../../Util.js';

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(gideon, message, args) {
    message.channel.send(Util.CreateEmbed('Discord Permission Flags:', {
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