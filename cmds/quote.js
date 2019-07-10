const Discord = module.require("discord.js");
const snekfetch = require("snekfetch");

module.exports.run = async (gideon, message, args) => {

    const api = `https://arrow.fandom.com/api/v1/Articles/Details?ids=50&titles=${args.join('%20')}&abstract=500&width=200&height=200`;

    snekfetch.get(api).then(r => {
        console.log(r.body);
        let body = r.body;
        const type = Object.values(body.items)[0];         
               
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