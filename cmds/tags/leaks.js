const Discord = require("discord.js");
const Util = require("../../Util");
/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message) => {
    const tag = '**Leaks of any kind must be marked as spoiler aswell, and also be clearly declared as leaks at the beginning of the message.**\n**"Leak" refers to any information regarding the plot or any other type of content of any upcoming Arrowverse episode.**\n**Theories do count as leaks aswell and therefore mustn\'t be posted without the above mentioned steps of clarification.**';
    message.channel.send(tag);
}

module.exports.help = {
    name: ["leaks", "leak"],
    type: "tags",
    help_text: "leaks",
    help_desc: "Leaks Tag",
    owner: false,
    voice: false,
    timevault: true,
    roles: [],
    user_perms: [],
    bot_perms: []
}