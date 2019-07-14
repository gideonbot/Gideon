const Discord = module.require("discord.js");

module.exports.run = async (gideon, message, args) => {
    const ping = new Discord.RichEmbed()
        .setColor('#2791D3')
        .setTitle('The fastest bot alive!')
        .setDescription(`${gideon.ping} ms`)
        .setTimestamp()
        .setFooter('Gideon - The Arrowverse Bot | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

        message.channel.send(ping);  
}

module.exports.help = {
    name: "ping"
}