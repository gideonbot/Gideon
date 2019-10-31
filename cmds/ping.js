const Discord = module.require("discord.js");

module.exports.run = async (gideon, message, args) => {
    const ping = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('The fastest bot alive!')
    .setDescription(`WebSocket ping: ${gideon.ws.ping.toFixed(2)} ms`)
    .setTimestamp()
    .setFooter(Util.config.footer, gideon.user.avatarURL());

    message.channel.send(ping);  
}

module.exports.help = {
    name: "ping"
}