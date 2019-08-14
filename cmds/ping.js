const Discord = module.require("discord.js");

module.exports.run = async (gideon, message, args) => {
    const ping = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('The fastest bot alive!')
        .setDescription(`${gideon.ping} ms`)
        .setTimestamp()
        .setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', gideon.user.avatarURL())

        message.channel.send(ping);  
}

module.exports.help = {
    name: "ping"
}