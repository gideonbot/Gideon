const Discord = require("discord.js");
const Util = require("../../Util");
/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message) => {
    if (message.guild.id !== '595318490240385037') return message.channel.send('This command only works at the Time Vault!\nhttps://discord.gg/h9SEQaU');
    const tag = '**Linking Instagram posts of any Arrowverse fan account which contains leaks, spoilers or theories and any reports by websites such as \'TMZ\', \'We Got This Covered\' or any similar websites is strenghtly forbidden on this server.**\n**Posting links to YouTube videos of channels like \'Pagey\', \'TV Promos\', \'TheDCTVShow\' or similar channels is strengthly forbidden on this server**';
    message.channel.send(tag);
}

module.exports.help = {
    name: ["abm", "banned"],
    type: "tags",
    help_text: "abm",
    help_desc: "ABM Tag"
}