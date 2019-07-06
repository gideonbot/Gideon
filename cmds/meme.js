const Discord = module.require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports.run = async (gideon, message, args) => {  
     __parentDir = path.dirname(module.parent.filename);
    var files = fs.readdirSync(__parentDir + '/avm');
    let chosenFile = files[Math.floor(Math.random() * files.length)]
    const chsm = new Discord.Attachment(chosenFile);
    const meme = new Discord.RichEmbed()
	    .setColor('#2791D3')
	    .setImage(chosenFile)
    	.setTimestamp()
    	.setFooter('Gideon - The Arrowverse Bot | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

    message.channel.send(meme);
}

module.exports.help = {
    name: "meme"
}