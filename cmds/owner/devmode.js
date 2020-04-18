import Discord from 'discord.js';

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(gideon, message, args) {
    if (gideon.user.tag !== 'gideon-dev#4623') return;

    const channel = gideon.guilds.cache.get('595318490240385037').channels.cache.get('669243069878501385');
    const role = gideon.guilds.cache.get('595318490240385037').roles.cache.get('595334594149220368');

    if (channel.permissionsFor(role).has('VIEW_CHANNEL')) {
        message.reply('devmode enabled! :white_check_mark:');
        channel.permissionOverwrites.get(role.id).update({
            VIEW_CHANNEL: false
        }).catch(ex => console.log(ex));
    }

    else {
        message.reply('devmode disabled! :white_check_mark:');
        channel.permissionOverwrites.get(role.id).update({
            VIEW_CHANNEL: true
        }).catch(ex => console.log(ex));
    }

}

export const help = {
    name: 'devmode',
    type: 'owner',
    help_text: 'devmode',
    help_desc: 'Toggles devmode',
    owner: true,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};