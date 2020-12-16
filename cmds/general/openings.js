import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(message, args) {
    const ia = Util.Embed('You must supply a valid show!', {description: 'Available shows:\n**flash**\n**legends**\n**lucifer**'}, message.member);

    if (!args[0]) return message.channel.send(ia);   
    const flashopening = 'https://cdn.discordapp.com/attachments/595934699285905409/674586782494621696/YouCut_20200205_130726276.mp4';
    const lotopening = 'https://cdn.discordapp.com/attachments/595934804378386442/674611602577817621/YouCut_20200205_144514668.mp4';
    const luciferopening = 'https://cdn.discordapp.com/attachments/679864620864765983/705423144361656370/lucifer.mp4';
    
    if (args[0].match(/(?:flash)/i)) return message.channel.send(flashopening);
    else if (args[0].match(/(?:legends)/i)) return message.channel.send(lotopening);
    else if (args[0].match(/(?:lucifer)/i)) return message.channel.send(luciferopening);
    else return message.channel.send(ia);
}

export let help = {
    name: 'op',
    type: 'general',
    help_text: 'op',
    help_desc: 'Sends the specified opening',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};