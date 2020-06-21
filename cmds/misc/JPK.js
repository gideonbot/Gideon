import Discord from 'discord.js';
import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(message, args) {
    if (!process.env.IMG_CL) {
        Util.log('Missing env variable for JPK command!');
        return message.channel.send(Util.CreateEmbed('This command is currently not available', null, message.member));
    }
    
    const customprefix = process.gideon.getGuild.get(message.guild.id);
    const jpkArray = ['FqCwt1J', '8bFXk0z', '2yz4RWt', 'kxpGHYM', 'f8mENXa', 'Xy2SoEw', 'UcPxCV5', 'JhTWxoJ', 'eLugrZD'];
    const jpkas = Util.CreateEmbed('You can choose an album!', {description: 'Currently available:'}, message.member)
        .addField(`${customprefix.prefix}JPK`, 'All Albums (except NSFW)')
        .addField(`${customprefix.prefix}JPK GN`, 'General')
        .addField(`${customprefix.prefix}JPK TF`, 'The Flash')
        .addField(`${customprefix.prefix}JPK BS`, 'Black Sails')
        .addField(`${customprefix.prefix}JPK AKOW`, 'Another Kind of Wedding')
        .addField(`${customprefix.prefix}JPK NW`, 'Nearlyweds')
        .addField(`${customprefix.prefix}JPK DM`, 'Deep Murder')
        .addField(`${customprefix.prefix}JPK TSC`, 'The Secret Circle')
        .addField(`${customprefix.prefix}JPK ILBAL`, 'I Love Bekka & Lucy')
        .addField(`${customprefix.prefix}JPK FS5GR`, 'The Flash - S5 Gag Reel')
        .addField(`${customprefix.prefix}JPK NSFW`, 'NSFW');

    let rjpka;

    if (!args[0]) rjpka = jpkArray[Math.floor(Math.random() * jpkArray.length)];
    else if (args[0].match(/(?:help)/i)) return message.channel.send(jpkas);
    else if (args[0].match(/(?:gn)/i)) rjpka = 'FqCwt1J';
    else if (args[0].match(/(?:tf)/i)) rjpka = 'JhTWxoJ';
    else if (args[0].match(/(?:bs)/i)) rjpka = '2yz4RWt';
    else if (args[0].match(/(?:akow)/i)) rjpka = '8bFXk0z';
    else if (args[0].match(/(?:nw)/i)) rjpka = 'Xy2SoEw';
    else if (args[0].match(/(?:dm)/i)) rjpka = 'kxpGHYM';
    else if (args[0].match(/(?:tsc)/i)) rjpka = 'UcPxCV5';
    else if (args[0].match(/(?:ilbal)/i)) rjpka = 'f8mENXa';
    else if (args[0].match(/(?:fs5gr)/i)) rjpka = 'eLugrZD';
    else if (args[0].match(/(?:nsfw)/i)) {
        if (message.author.id !== process.gideon.owner) {
            if (!message.channel.nsfw) {
                process.gideon.emit('commandRefused', message, 'NSFW_REQUIRED');
                return message.channel.send(Util.CreateEmbed('This command requires a NSFW channel!', { image: 'https://i.imgur.com/JvmFASl.gif' }, message.member));
            }
        }
        return Util.IMG('AwPimhP', message, true);
    }
    else return message.channel.send(Util.CreateEmbed(`${args[0]} is not a valid argument! (jpk help)`, null, message.member)); 

    Util.IMG(rjpka, message);
}

export const help = {
    name: 'jpk',
    type: 'misc',
    help_text: 'jpk [help]/[album]',
    help_desc: 'Displays a random JPK gif',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: true,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};