import Discord from 'discord.js';
/**
 * @param {Discord.Message} message
 */
export async function run(message) {
    const tag = '**Linking Instagram posts of any Arrowverse fan account which contains leaks, spoilers or theories and any reports by websites such as \'TMZ\', \'We Got This Covered\' or any similar websites is strenghtly forbidden on this server.**\n**Posting links to YouTube videos of channels like \'Pagey\', \'TV Promos\', \'TheDCTVShow\' or similar channels is strengthly forbidden on this server**';
    message.channel.send(tag);
}

export const help = {
    name: ['content', 'banned'],
    type: 'tags',
    help_text: 'content',
    help_desc: 'Content Tag',
    owner: false,
    voice: false,
    timevault: true,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};