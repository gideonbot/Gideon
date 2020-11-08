import Util from '../../Util.js';
/**
 * @param {Discord.Message} message
 */
export async function run(message) {
    const member = message.member;
    const perms = member.permissions.toArray().map(perms => `\`${perms}\``).join(' ');

    const embed = Util.Embed(null, {
        author: {
            name: `${message.author.tag}'s permissions on ${message.guild.name}:`,
            icon: message.author.displayAvatarURL()
        },
        description: perms,
    }, message.member);

    message.channel.send(embed);
}

export const help = {
    name: ['perms', 'permissions'],
    type: 'stats',
    help_text: 'perms',
    help_desc: 'Displays a members perms',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};