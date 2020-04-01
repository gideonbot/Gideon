const Discord = require("discord.js");
const Util = require("../../Util");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message, args) => {
    message.channel.send('https://discord.new/EDWFjQqYu8Zs');
}

module.exports.help = {
    name: "template",
    type: "general",
    help_text: "template",
    help_desc: "Sends a Time Vault template",
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
}