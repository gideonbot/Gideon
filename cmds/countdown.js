const Discord = module.require("discord.js");
const snekfetch = require("snekfetch");

module.exports.run = async (gideon, message, args) => {
    const flashapi = 'https://api.github.com/repos/adrifcastr/Gideon';
    const arrowapi = 'https://api.github.com/repos/adrifcastr/Gideon';
    const supergirlapi = 'https://api.github.com/repos/adrifcastr/Gideon';
    const api = 'https://api.github.com/repos/adrifcastr/Gideon';
    const api = 'https://api.github.com/repos/adrifcastr/Gideon';

    snekfetch.get(api).then(r => {
        console.log(r.body);
        let body = r.body;   

        const countdown = new Discord.RichEmbed()
	    .setColor('#2791D3')
	    .setTitle()
        .setDescription()
	    .setThumbnail()
    	.setTimestamp()
    	.setFooter('Gideon - The Arrowverse Bot | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

        message.channel.send(countdown); 
    });       
}

module.exports.help = {
    name: "cd"
}