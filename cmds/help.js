const Discord = module.require("discord.js");


module.exports.run = async (gideon, message, args) => {
    const fsurl = 'https://discordapp.com/channels/595318490240385037/595935089070833708';

    const help = new Discord.RichEmbed()
	    .setColor('#2791D3')
	    .setTitle('__You can check the list of available commands below:__')
        .addField('!help', 'displays this message')  
        .addField('!wiki <term>', 'searches the Arrowverse Wiki for the given term')  
        .addField('!wiki <term>', 'searches the Arrowverse Wiki for the given term')  
        .addField('!flash | !arrow | !supergirl | !legends | !batwoman', 'fetches the latest EP from arrowverse.info (coming soon)')
        .addField('Gideon, show me the future!', 'displays an easter egg')
        .addField('!donate', 'displays info to support maintainance and hosting of Gideon')
        .addField('Feature Suggestions:', `**[Click here to suggest a feature](${fsurl} 'Time Vault - #feature-suggestions')**`)
        .setTimestamp()
    	.setFooter('Gideon - The Arrowverse Bot | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

        message.channel.send(help);
}

module.exports.help = {
    name: "help"
}