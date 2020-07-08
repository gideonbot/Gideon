/**
 * @param {Discord.Message} message
 */
export async function run(message) {
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