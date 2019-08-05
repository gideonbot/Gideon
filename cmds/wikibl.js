const Discord = module.require("discord.js");
const fetch = require('node-fetch');

module.exports.run = async (gideon, message, args) => {
    const api = `https://blacklightning.fandom.com/api/v1/Articles/Details?ids=50&titles=${args.join('%20')}&abstract=500&width=200&height=200`;
    let term = args[0];
    if(!term) return message.channel.send("You must supply a search term!");

        const body = await fetch(api).then(res => res.json());
        
        const article = Object.values(body.items)[1];       
        if (!Object.keys(body.items).length) return message.channel.send(`There was no result for ${args.join(' ')} on the Arrowverse Wiki!\nPlease note that this command is case sensitive!`).catch(console.error);
        const url = article.url.replace(/\(/g, '%28').replace(/\)/g, '%29');       
               
        const wikiart = new Discord.RichEmbed()
	    .setColor('#2791D3')
	    .setTitle(article.title)
        .setDescription(article.abstract + `\n\n**[Click here to read the full article](https://arrow.fandom.com${url} 'https://arrow.fandom.com${url}')**`)
	    .setThumbnail(article.thumbnail)
    	.setTimestamp()
    	.setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png')

        message.channel.send(wikiart); 
   
}

module.exports.help = {
    name: "wikibl"
}