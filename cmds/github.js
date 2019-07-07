const Discord = module.require("discord.js");
const snekfetch = require("snekfetch");

module.exports.run = async (gideon, message, args) => {
    const api = 'https://api.github.com/repos/adrifcastr/Gideon';

    snekfetch.get(api).then(r => {
        console.log(r.body);
        let body = r.body;   
             
        const github = new Discord.RichEmbed()
	    .setColor('#2791D3')
	    .setTitle(body.name)
        .setDescription(body.description + `\n**Owner`)
	    .setThumbnail(body.owner.avatar_url)
    	.setTimestamp()
    	.setFooter('Gideon - The Arrowverse Bot | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

        message.channel.send(github); 
    });    
    
}

module.exports.help = {
    name: "github"
}