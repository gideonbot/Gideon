const Discord = module.require("discord.js");


module.exports.run = async (gideon, message, args) => {
    const help = new Discord.RichEmbed()
	    .setColor('#2791D3')
	    .setTitle('__You can check the list of available commands below:__')
        .addField('!help', 'displays this message')  
        .addField('!wiki <term>', 'searches the Arrowverse Wiki for the given term')  
        .addField('!flash', 'fetches the latest EP from arrowverse.info (coming soon)')
        .addField('!arrow', 'fetches the latest EP from arrowverse.info (coming soon)')
        .addField('!supergirl', 'fetches the latest EP from arrowverse.info (coming soon)')
        .addField('!legends', 'fetches the latest EP from arrowverse.info (coming soon)')
        .addField('!batwoman', 'fetches the latest EP from arrowverse.info (coming soon)')
        .addField('!constantine', 'fetches the latest EP from arrowverse.info (coming soon)')
        .addField('Gideon, show me the future!', 'displays an easter egg')
    	.setTimestamp(`\n\n**[Click here to suggest a feature](${message.guild.channels.find("name", "feature-suggestions")})**`)
    	.setFooter('Gideon - The Arrowverse Bot | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

        message.channel.send(help);
}

module.exports.help = {
    name: "help"
}