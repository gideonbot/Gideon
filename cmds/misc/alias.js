import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(message, args) {
    let cmd = process.gideon.commands.get(args[0].toLocaleLowerCase());
    const customprefix = process.gideon.getGuild.get(message.guild.id);

    if (cmd) {
        const embed = Util.CreateEmbed(`Available aliases for: "${args[0]}"`, null, message.member);
        
        if (Array.isArray(cmd.help.name) && cmd.help.name.length > 1) {
            embed.setDescription(cmd.help.name.map(alias => `\`${customprefix.prefix + alias}\``).join(' '));
        }
        else {
            embed.setDescription('No aliases available!');
        }

        message.channel.send(embed);
    }

    else return message.channel.send(`Command "${args[0]}" does not exist!`);
}

export const help = {
    name: ['alias', 'synonym'],
    type: 'misc',
    help_text: 'alias <command>',
    help_desc: 'Displays a commands aliases',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {force: true, amount: 1},
    roles: [],
    user_perms: [],
    bot_perms: []
};