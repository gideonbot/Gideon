const Discord = module.require("discord.js");
const delay = require('delay');

module.exports.run = async (gideon, message, args) => {      
    if(!args[0]) return message.channel.send("You must supply a character!");

    let kfsuit = 'https://i.imgur.com/0XI5gxr.jpg';
    let sgsuit = 'https://i.imgur.com/fZ5iQ9A.jpg';
    let flasuit = 'https://i.imgur.com/2JDfNlE.jpg';
    let arsuit = 'https://i.imgur.com/NsnDVC1.jpg';
    let bwsuit = 'https://i.imgur.com/2vkMLrp.jpg';

    let kftitle = 'Killer Frost';
    let sgtitle = 'Supergirl';
    let flatitle = 'The Flash';
    let artitle = 'The Green Arrow';
    let bwtitle = 'Batwoman';

    let kfdesc = 'This is Danielle Panabaker\'s new suit for The Flash Season 6!';
    let sgdesc = 'This is Melissa Benoist\'s new suit for Supergirl Season 5!';
    let fladesc = 'This is Grant Gustin\'s new suit for The Flash Season 6!';
    let ardesc = 'This is Stephen Amell\'s new suit for Arrow Season 8!';
    let bwdesc = 'This is Ruby Rose\'s new suit for Batwoman Season 1!';

    let suitimg;
    let suittle;
    let suitdesc;

    if(args[0].match(/(?:killer)/i) && args[1].match(/(?:frost)/i)){
        suitimg = kfsuit;
        suittle = kftitle;
        suitdesc = kfdesc;
    }   else if(args[0].match(/(?:supergirl)/i)){
        suitimg = sgsuit;
        suittle = sgtitle;
        suitdesc = sgdesc;
    }   else if(args[0].match(/(?:flash)/i)){
        suitimg = flasuit;
        suittle = flatitle;
        suitdesc = fladesc;
    }   else if(args[0].match(/(?:arrow)/i)){
        suitimg = arsuit;
        suittle = artitle;
        suitdesc = ardesc;
    }   else if(args[0].match(/(?:batwoman)/i)){
        suitimg = bwsuit;
        suittle = bwtitle;
        suitdesc = bwdesc;
    }   else{
        return message.channel.send('You must supply a valid character!');
    }

    const suit = new Discord.RichEmbed()
        .setColor('#2791D3')
        .setTitle(suittle)
        .setDescription(suitdesc)
        .setImage(suitimg)
        .setTimestamp()
        .setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

    message.channel.send(suit);  
}

module.exports.help = {
    name: "suit"
}