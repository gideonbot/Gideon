const Discord = module.require("discord.js");

module.exports.run = async (gideon, message, args) => {
    const auth = message.author;

    function getUserFromMention(mention) {
        if (!mention) return;
    
        if (mention.startsWith('<@') && mention.endsWith('>')) {
            mention = mention.slice(2, -1);
    
            if (mention.startsWith('!')) {
                mention = mention.slice(1);
            }
    
            return gideon.users.get(mention);
        }
    }

    const user = getUserFromMention(args[0]);
		if (!user) {
			return message.channel.send('Please use a proper mention if you want to cuddle someone.');
		}

    const cuddle = new Discord.RichEmbed()
	.setColor('#2791D3')
    .setDescription(`${auth} you have cuddled ${user}!\n\nA Beebo-tastic cuddle always brigthens the mood!`)
	.setImage('https://i.imgur.com/IOpmt2j.gif')
    .setTimestamp()
    .setFooter('Gideon - The Arrowverse Bot | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

    message.channel.send(cuddle);
}

module.exports.help = {
    name: "cuddle"
}