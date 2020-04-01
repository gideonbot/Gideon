const Discord = require("discord.js");
const Util = require("../../Util");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message, args) => {
    const ia = Util.CreateEmbed('You must supply a valid show!', {description: 'Available shows:\n**flash**\n**legends**'});

    if (!args[0]) return message.channel.send(ia);   
    const flashopening = 'https://cdn.discordapp.com/attachments/595934699285905409/674586782494621696/YouCut_20200205_130726276.mp4';
    const lotopening = 'https://cdn.discordapp.com/attachments/595934804378386442/674611602577817621/YouCut_20200205_144514668.mp4';
    
    if (args[0].match(/(?:flash)/i)) return message.channel.send(flashopening);
    if (args[0].match(/(?:legends)/i)) return message.channel.send(lotopening);
    else return message.channel.send(ia);
}

module.exports.help = {
    name: ["opening", "intro"],
    type: "general",
    help_text: "opening",
    help_desc: "Sends the specified opening",
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
}