const Discord = require("discord.js");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message) => {
    if (gideon.user.typingIn(message.channel)) message.channel.stopTyping(true);
    else message.channel.startTyping();
}

module.exports.help = {
    name: ["type", "typing"],
    type: "owner",
    help_text: "type <:gideon:686678560798146577>",
    help_desc: "Toggles typing",
    owner: true,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
}