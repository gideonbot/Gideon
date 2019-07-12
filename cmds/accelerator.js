const Discord = module.require("discord.js");
const delay = require('delay');

module.exports.run = async (gideon, message, args) => {      
    message.channel.send("Engaging S.T.A.R. Labs. particle accelerator...");
    await delay (1000);
    message.channel.send("3");
    message.channel.send("2");
    message.channel.send("1");
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