const Discord = require("discord.js");
const Util = require("../../Util");
/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message) => {
    const tag = '**"Official sources" refers to any social media in association with the Arrowverse franchise or The CW Televison Network.**';
    message.channel.send(tag);
}

module.exports.help = {
    name: ["sources", "official sources"],
    type: "tags",
    help_text: "sources",
    help_desc: "Sources Tag",
    owner: false,
    voice: false,
    timevault: true,
    roles: [],
    user_perms: [],
    bot_perms: []
}