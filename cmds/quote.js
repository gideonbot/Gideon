const Discord = module.require("discord.js");


module.exports.run = async (gideon, message, args) => {

    const quote = new Discord.RichEmbed()
	    .setColor('#2791D3')
	    .setTitle('__You can check the list of available commands below:__')
        .setTimestamp()
    	.setFooter('Gideon - The Arrowverse Bot | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

        message.channel.send(quote);
}

module.exports.help = {
    name: "quote"
