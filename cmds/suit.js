const Discord = module.require("discord.js");
const delay = require('delay');

module.exports.run = async (gideon, message, args) => {      
    if(!args[0]) return message.channel.send("You must supply a character!");

    let kfsuit = 'https://i.imgur.com/0XI5gxr.jpg';
    let sgsuit = 'https://i.imgur.com/fZ5iQ9A.jpg';

    let kftitle = 'Killer Frost';
    let sgtitle = 'Supergirl';

    let kfdesc = 'This is Danielle Panabaker\'s new suit for The Flash Season 5!';
    let sgdesc = 'This is Melissa Benoist\'s new suit for Supergirl Season 5!';

    let suitimg;
    let suittle;
    let suitdesc;

    if(args[0].match(/(?:killer)/) && args[1].match(/(?:frost)/)){
        suitimg = kfsuit;
        suittle = kftitle;
        suitdesc = kfdesc;
    }   else if(args[0].match(/(?:supergirl)/)){
        suitimg = sgsuit;
        suittle = sgtitle;
        suitdesc = sgdesc;
    }   else{
        return message.channel.send('You must supply a valid character!');
    }

    const suit = new Discord.RichEmbed()
        .setColor('#2791D3')
        .setTitle(suittle)
        .setDescription(suitdesc)
        .setImage(suitimg)
        .setTimestamp()
        .setFooter('Gideon - The Arrowverse Bot | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

    message.channel.send(suit);  
}

module.exports.help = {
    name: "suit"
}