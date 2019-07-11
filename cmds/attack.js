const Discord = module.require("discord.js");

module.exports.run = async (gideon, message, args) => {
    const auth = message.author;
    let atc = args[0];
    if(!atc) return message.channel.send("You must supply an attack and a victim!");

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

    if(atc.match(/(?:iceblast)/)){
        chosenattack = 'you ice-blasted';
        chosendesc = '';
    }   else if(atc.match(/(?:lthrow)/)){
        chosenattack = 'you threw a lightning bolt at';
        chosendesc = '';
    }   else if(atc.match(/(?:reverseflash)/)){
        chosenattack = 'you reverse-flashed';
        chosendesc = '';
    }   else if(atc.match(/(?:vibeblast)/)){
        chosenattack = 'you vibe-blasted';
        chosendesc = '';
    }   else if(atc.match(/(?:heatvision)/)){
        chosenattack = 'you used your heat vis';
        chosendesc = '';
    }   else {
        return message.channel.send('You must supply a valid attack!');
    }

    const attack = new Discord.RichEmbed()
	.setColor('#2791D3')
    .setDescription(`**${auth} ${chosenattack} ${user}**\n\n${chosendesc}`)
	.setImage('https://i.imgur.com/IOpmt2j.gif')
    .setTimestamp()
    .setFooter('Gideon - The Arrowverse Bot | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

    message.channel.send(attack);
}

module.exports.help = {
    name: "at"
}