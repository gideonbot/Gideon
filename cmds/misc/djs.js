import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(message, args) {
    try {
        const source = 'https://raw.githubusercontent.com/discordjs/discord.js/docs/12.4.1.json';
        const queryString = encodeURI(args.join(' '));
        const api = `https://djsdocs.sorta.moe/v2/embed?src=${source}&q=${queryString}`;
        const body = await Util.fetchJSON(api);
        return message.channel.send({ embed: body });
    }

    catch (ex) {
        Util.log('Caught an exception while running djs.js: ' + ex.stack);
        return message.channel.send(Util.Embed('An error occurred while executing this command!', null, message.member));
    }
}

export const help = {
    name: 'djs',
    type: 'misc',
    help_text: 'djs <query>',
    help_desc: 'Searches discord.js docs',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {force: true},
    roles: [],
    user_perms: [],
    bot_perms: []
};