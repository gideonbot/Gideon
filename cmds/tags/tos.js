import Discord from 'discord.js';
import Util from '../../Util.js';
/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(gideon, message, args) {
    const tag = 'Discord Developer Terms of Service: https://discordapp.com/developers/docs/legal\nToS Q&A summary: https://gist.github.com/meew0/a3168b8fbb02d5a5456a06461b9e829e';
    message.channel.send(tag);
}

export const help = {
    name: ['tos', 'termsofservice'],
    type: 'tags',
    help_text: 'tos',
    help_desc: 'ToS Tag',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};