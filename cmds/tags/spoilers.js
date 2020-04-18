import Discord from 'discord.js';
import Util from '../../Util.js';
/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(gideon, message, args) {
    const tag = '**All spoilers must be marked as such by using \'||\' at the beginning and ending, or by ticking \'Mark as spoiler\' (this applies to all channels).**\n**Everything that has aired on TV or has been posted by official sources is not considered as spoiler.**\n**Talk about newly aired episodes outside of the DCTV channels must be marked as spoiler for at least 24 hours.**';
    message.channel.send(tag);
}

export const help = {
    name: ['spoilers', 'spoiler'],
    type: 'tags',
    help_text: 'spoilers',
    help_desc: 'Spoilers Tag',
    owner: false,
    voice: false,
    timevault: true,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
}