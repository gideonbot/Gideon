const Discord = module.require("discord.js");
const snekfetch = require("snekfetch");

module.exports.run = async (gideon, message, args) => {
    const api = `https://dc.fandom.com/api/v1/Articles/AsSimpleJson?id=317389`;

    snekfetch.get(api).then(r => {
        console.log(r.body);
        let body = r.body;
        let type = body.sections[0].content;
        let min = 0;
        let max = res.images.length - 1;
        let ranum = Math.floor(Math.random()*(max - min + 1)) + min;
        let ravm = res.images[ranum].link;
        console.log(ravm);

                 
        console.log(type);
               
        const quote = new Discord.RichEmbed()
	    .setColor('#2791D3')
    	.setTimestamp()
    	.setFooter('Gideon - The Arrowverse Bot | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

        message.channel.send(wikiart); 
    });      
}

module.exports.help = {
    name: "quote"
}