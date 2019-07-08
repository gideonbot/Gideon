const Discord = module.require("discord.js");
const tvmaze = require("fs");

module.exports.run = async (gideon, message, args) => {  
    
    const meme = new Discord.RichEmbed()
        .setColor('#2791D3')
        .attachFile(attachment)
        .setImage(`attachment://${chosenFile}`)
        .setTimestamp()
        .setFooter('Gideon - The Arrowverse Bot | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

        message.channel.send(meme);
}

module.exports.help = {
    name: "meme"
}