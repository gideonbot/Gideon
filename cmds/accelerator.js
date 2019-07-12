const Discord = module.require("discord.js");

module.exports.run = async (gideon, message, args) => {      
    message.channel.send("Engaging S.T.A.R. Labs. particle accelerator...").delay(2000);
    message.channel.send("3").delay(2000);
    message.channel.send("2").delay(2000);
    message.channel.send("1").delay(2000);
    message.channel.send("ALERT SYSTEM FAILURE");

    const explosion = new Discord.RichEmbed()
        .setColor('#2791D3')
        .setImage('https://i.imgur.com/opCbZTn.gif')
        .setTimestamp()
        .setFooter('Gideon - The Arrowverse Bot | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

        message.channel.send(explosion);  
}

module.exports.help = {
    name: "accelerator"
}