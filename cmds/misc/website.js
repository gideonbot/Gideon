const Discord = require("discord.js");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message) => {      
    message.channel.send('https://gideonbot.co.vu');
}

module.exports.help = {
    name: ['website', 'web', 'url', 'homepage'],
    type: "misc",
    help_text: "website",
    help_desc: "Displays a link to Gideon's homepage",
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
}