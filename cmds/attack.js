const Discord = module.require("discord.js");

module.exports.run = async (gideon, message, args) => {
    const auth = message.author;
    let atc = args[0];
    if(!atc) return message.channel.send("You must supply an attack!");

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

    const user = getUserFromMention(atc);
		if (!user) {
			return message.channel.send('You must use a proper mention if you want to attack someone!');
        }
        
    let chosenattack = '';
    let chosendesc = '';

    const attack = new Discord.RichEmbed()
	.setColor('#2791D3')
    .setDescription(`**${auth} ${} ${user}!**\n\nA Beebo-tastic cuddle always brigthens the mood!`)
	.setImage('https://i.imgur.com/IOpmt2j.gif')
    .setTimestamp()
    .setFooter('Gideon - The Arrowverse Bot | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

    message.channel.send(attack);
}

module.exports.help = {
    name: "at"
}