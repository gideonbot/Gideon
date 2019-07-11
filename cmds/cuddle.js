const Discord = module.require("discord.js");

module.exports.run = async (gideon, message, args) => {
    const user = message.author;
    const user = getUserFromMention(args[0]);
		if (!user) {
			return message.reply('Please use a proper mention if you want to see someone else\'s avatar.');
		}

    function getUserFromMention(mention) {
        if (!mention) return;
    
        if (mention.startsWith('<@') && mention.endsWith('>')) {
            mention = mention.slice(2, -1);
    
            if (mention.startsWith('!')) {
                mention = mention.slice(1);
            }
    
            return client.users.get(mention);
        }
    }

    const cuddle = new Discord.RichEmbed()
	.setColor('#2791D3')
	.setTitle('Donations')
    .setDescription(``)
	.setImage('https://i.imgur.com/IOpmt2j.gif')
    .setTimestamp()
    .setFooter('Gideon - The Arrowverse Bot | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

    message.channel.send(cuddle);
}

module.exports.help = {
    name: "cuddle"
}