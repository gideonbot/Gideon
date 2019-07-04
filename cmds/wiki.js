const Discord = module.require("discord.js");
const snekfetch = require("snekfetch");

module.exports.run = async (gideon, message, args) => {
    const api = `https://arrow.fandom.com/api/v1/Articles/Details?ids=50&titles=${args.join('%20')}&abstract=500&width=200&height=200`;
    let term = args[0];
    if(!term) return message.channel.send("You must supply a search term!");

    snekfetch.get(api).then(r => {
        console.log(r.body);
        let body = r.body;
        const type = Object.values(body.items)[0];       
    
        if (!Object.keys(body.items).length) message.channel.send(`There was no result for ${args.join(' ')} on the Arrowverse Wiki!`).catch(console.error);         
        const wikiart = new Discord.RichEmbed()
	    .setColor('#2791D3')
	    .setTitle(type.title)
        .setDescription(type.abstract + `\n\n**[Click here to read the full article](<https://arrow.fandom.com${(type.url)} 'https://arrow.fandom.com${(type.url)}')**`)
	    .setThumbnail(type.thumbnail)
    	.setTimestamp()
    	.setFooter('Gideon - The Arrowverse Bot | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

        message.channel.send(wikiart); 
    });    
    
}

module.exports.help = {
    name: "wiki"
}