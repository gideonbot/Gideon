import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 */
export async function run(message) {
    const role = message.guild.me.roles.cache.first().toString();
    message.channel.send(Util.CreateEmbed('Discord mentions syntax:', {
        description: '`Do NOT ignore <>! They are part of the syntax!`\n\n`<@userid>` => <@595328879397437463>\n`<@&roleid>` => ' + role + '\n`<#channelid>` => ' + message.channel.toString() + '\n`<:emojiname:emojiid>` => <:timevault:686676561298063361>\n`<a:emojiname:emojiid>` => <a:siren:669518972407775265>',
    }, message.member));       
}

export const help = {
    name: 'mentions',
    type: 'misc',
    help_text: 'mentions',
    help_desc: 'Displays Discord mentions syntax',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};