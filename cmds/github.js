const Discord = module.require("discord.js");
const snekfetch = require("snekfetch");

module.exports.run = async (gideon, message, args) => {
    const api = 'https://api.github.com/repos/adrifcastr/Gideon';
    let term = args[0];
    if(!term) return message.channel.send("You must supply a search term!");

    snekfetch.get(api).then(r => {
        console.log(r.body);
        let body = r.body;
        const type = Object.values(body.items)[0];       
             
        const github = new Discord.RichEmbed()
	    .setColor('#2791D3')
	    .setTitle(type.title)
        .setDescription(type.abstract + `\n\n**[Click here to read the full article](https://arrow.fandom.com${url} 'https://arrow.fandom.com${url}')**`)
	    .setThumbnail(type.thumbnail)
    	.setTimestamp()
    	.setFooter('Gideon - The Arrowverse Bot | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

        message.channel.send(github); 
    });    
    
}

module.exports.help = {
    name: "github"
}