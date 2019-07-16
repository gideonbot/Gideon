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

    const user = getUserFromMention(args[1]);
		if (!user) {
			return message.channel.send('You must use a proper mention if you want to attack someone!');
        }else if(user === auth){
            return message.channel.send('My protocols forbid any kind of self-harm!');
        }
        
    let chosenattack;
    let chosendesc;
    let attackgif;
    let emote;

    if(atc.match(/(?:iceblast)/i)){
        chosenattack = 'you ice-blasted';
        chosendesc = 'Hey, stranger. Well, we sure have a lot to talk about.';
        emote = ':snowflake:';
        attackgif = 'https://i.imgur.com/4snHPC9.gif';
    }   else if(atc.match(/(?:lthrow)/i)){
        chosenattack = 'you threw a lightning bolt at';
        chosendesc = 'Maybe this\'ll give you abs.';
        emote = ':zap:';
        attackgif = 'https://i.imgur.com/6ECd0ty.gif';
    }   else if(atc.match(/(?:reverseflash)/i)){
        chosenattack = 'you reverse-flashed';
        chosendesc = 'I\'m sorry.';
        emote = ':wave::skin-tone-2:';
        attackgif = 'https://i.imgur.com/h7orTAQ.gif';
    }   else if(atc.match(/(?:vibeblast)/i)){
        chosenattack = 'you vibe-blasted';
        chosendesc = 'Nothing.';
        emote = ':raised_hand_with_fingers_splayed::skin-tone-4:';
        attackgif = 'https://i.imgur.com/n5Is19c.gif';
    }   else if(atc.match(/(?:shootarrow)/i)){
        chosenattack = 'you shot an arrow through';
        chosendesc = 'You have failed this omelette!';
        emote = ':bow_and_arrow:';
        attackgif = 'https://i.imgur.com/De98uf0.gif';
    }   else if(atc.match(/(?:heatvision)/i)){
        chosenattack = 'you used your heat vision on';
        chosendesc = 'NJAAARRRRGHHHHHH!';
        emote = ':hotsprings:';
        attackgif = 'https://i.imgur.com/0WxrvMp.gif';
    }   else if(atc.match(/(?:stretchpunch)/i)){
        chosenattack = 'you stretch-punched';
        chosendesc = 'HAVE A GOOD NIGHT!';
        emote = ':punch::skin-tone-1:';
        attackgif = 'http://i.imgur.com/8suYrKa.gif';
    }   else {
        return message.channel.send('You must supply a valid attack!');
    }

    const attack = new Discord.RichEmbed()
	.setColor('#2791D3')
    .setDescription(`**${emote}${auth} ${chosenattack} ${user}${emote}**\n\n${chosendesc}`)
	.setImage(attackgif)
    .setTimestamp()
    .setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

    message.channel.send(attack);
}

module.exports.help = {
    name: "at"
}