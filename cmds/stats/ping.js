const Discord = require("discord.js");
const Util = require("../../Util");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message) => {
    message.channel.send(Util.CreateEmbed('The fastest bot alive!', {description: `WebSocket ping: ${gideon.ws.ping.toFixed(2)} ms`}));  
}

module.exports.help = {
    name: ["ping", "latency"],
    type: "stats",
    help_text: "ping",
    help_desc: "Displays the bot's ping",
    owner: false,
    timevault: false,
    roles: [],
    user_perms: [],
    bot_perms: []
}