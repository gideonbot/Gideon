const Discord = require("discord.js");
const Util = require("../../Util");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message) => {
    message.channel.send(Util.CreateEmbed('Discord Permission Flags:', {
        description: Object.keys(Discord.Permissions.FLAGS).map(perms => `\`${perms}\``).join(' ')
    }));       
}

module.exports.help = {
    name: ["flags", "permflags"],
    type: "misc",
    help_text: "flags",
    help_desc: "Displays Discord permission flags",
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
}