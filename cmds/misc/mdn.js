import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 */
export async function run(message, args) {
   /* const searchtearm = encodeURIComponent(args.join(''));
    const embed = await Util.fetchJSON('https://mdn.gideonbot.com/embed?q=' + searchtearm).catch(ex => Util.log(ex));
    if (embed.code === 404) return message.reply('There was no result for `' + args.join('') + '`.');
    message.channel.send({ embed: embed });*/

    let string = '[enumerable](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/propertyIsEnumerable) [own properties](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)';
    for (const match of string.matchAll(/\[(.*?)\]\((.*?)\)/g)) {
        string = string.replace(match[2], 'https://developer.mozilla.org' + match[2]);
    }
    console.log(string);
}
export const help = {
    name: 'mdn',
    type: 'misc',
    help_text: 'mdn <search term>',
    help_desc: 'Fetches info from MDN',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};