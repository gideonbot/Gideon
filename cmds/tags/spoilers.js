const Discord = require("discord.js");
const Util = require("../../Util");
/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message) => {
    const tag = '**All spoilers must be marked as such by using \'||\' at the beginning and ending, or by ticking \'Mark as spoiler\' (this applies to all channels).**\n**Everything that has aired on TV or has been posted by official sources is not considered as spoiler.**\n**Talk about newly aired episodes outside of the DCTV channels must be marked as spoiler for at least 24 hours.**';
    message.channel.send(tag);
}

module.exports.help = {
    name: ["spoilers", "spoiler"],
    type: "tags",
    help_text: "spoilers",
    help_desc: "Spoilers Tag",
    owner: false,
    timevault: true,
    roles: [],
    user_perms: [],
    bot_perms: []
}