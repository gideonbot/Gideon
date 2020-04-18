import Discord from 'discord.js';
import Util from '../../Util.js';
/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(gideon, message, args) {
    const tag = 'If you have ever made a joke about your age, go delete it now, and don\'t make any more.\nTrust & Safety can and will disable your account for any mention of being underage.\nhttps://www.reddit.com/r/discordapp/comments/cm4787/psa_dont_joke_about_being_underage_on_discord';
    message.channel.send(tag);
}

export const help = {
    name: ['underage', 'agejokes'],
    type: 'tags',
    help_text: 'underage',
    help_desc: 'Underage Tag',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
}