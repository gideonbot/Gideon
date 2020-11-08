import Util from '../../Util.js';
import stringSimilarity from 'string-similarity';

/**
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(message, args) {
    const prefix = process.gideon.getGuild.get(message.guild.id).prefix;
    const match = stringSimilarity.findBestMatch(args[0].toLowerCase(), process.gideon.commands.map(x => Array.isArray(x.help.name) ? x.help.name[0].toLowerCase() : x.help.name.toLowerCase())).bestMatch;
    const cmd = process.gideon.commands.get(match.target);

    if (cmd) {
        const embed = Util.Embed(`Results for: "${args[0]}"`, null, message.member);
        
        if (Array.isArray(cmd.help.name) && cmd.help.name.length > 1) {
            embed.setDescription(`\`${prefix + cmd.help.name[0]}\``);
        }
        else {
            embed.setDescription(`\`${prefix + cmd.help.name}\``);
        }

        message.channel.send(embed);
    }

    else return message.channel.send(`No result found for "${args[0]}"!`);
}

export const help = {
    name: ['search', 'find'],
    type: 'misc',
    help_text: 'search <command>',
    help_desc: 'Searches for a command',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {force: true, amount: 1},
    roles: [],
    user_perms: [],
    bot_perms: []
};