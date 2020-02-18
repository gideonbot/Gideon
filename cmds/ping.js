const Discord = require("discord.js");
const Util = require("../Util");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message) => {
    const ping = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('The fastest bot alive!')
    .setDescription(`WebSocket ping: ${gideon.ws.ping.toFixed(2)} ms`)
    .setFooter(Util.config.footer, gideon.user.avatarURL());

    message.channel.send(ping);  
}

module.exports.help = {
    name: ["ping", "latency"],
    type: "misc",
    help_text: "ping",
    help_desc: "Displays the bot's ping"
}