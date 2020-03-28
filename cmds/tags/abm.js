const Discord = require("discord.js");
const Util = require("../../Util");
/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message) => {
    const tag = '**Linking Instagram posts of any Arrowverse fan account which contains leaks, spoilers or theories and any reports by websites such as \'TMZ\', \'We Got This Covered\' or any similar websites is strenghtly forbidden on this server.**\n**Posting links to YouTube videos of channels like \'Pagey\', \'TV Promos\', \'TheDCTVShow\' or similar channels is strengthly forbidden on this server**';
    message.channel.send(tag);
}

module.exports.help = {
    name: ["abm", "banned"],
    type: "tags",
    help_text: "abm",
    help_desc: "ABM Tag",
    owner: false,
    voice: false,
    timevault: true,
    roles: [],
    user_perms: [],
    bot_perms: []
}