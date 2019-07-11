const Discord = module.require("discord.js");

module.exports.run = async (gideon, message, args) => {
    let user = args[0];
    if(!user) return message.channel.send("You must supply a user!");

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

    const donate = new Discord.RichEmbed()
	.setColor('#2791D3')
	.setTitle('Donations')
    .setDescription(``)
	.setImage('https://i.imgur.com/lWSoZQB.png')
    .setTimestamp()
    .setFooter('Gideon - The Arrowverse Bot | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

    message.channel.send(donate);
}

module.exports.help = {
    name: "cuddle"
}