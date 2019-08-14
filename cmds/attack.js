const Discord = module.require("discord.js");

module.exports.run = async (gideon, message, args) => {
    const auth = message.author;
    let atc = args[0];
    if(!atc) return message.channel.send("You must supply an attack and a victim!\nAvailable attacks: iceblast | lthrow | reverseflash | vibeblast | shootarrow | heatvision | stretchpunch | canarycry | batarang | sendtohell | thunderclap | elblast | fireblast");

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
        chosenattack = `you ice-blasted ${user}`;
        chosendesc = 'Hey, stranger. Well, we sure have a lot to talk about.';
        emote = ':snowflake:';
        attackgif = 'https://i.imgur.com/4snHPC9.gif';
    }   else if(atc.match(/(?:lthrow)/i)){
        chosenattack = `you threw a lightning bolt at ${user}`;
        chosendesc = 'Maybe this\'ll give you abs.';
        emote = ':zap:';
        attackgif = 'https://i.imgur.com/6ECd0ty.gif';
    }   else if(atc.match(/(?:reverseflash)/i)){
        chosenattack = `you reverse-flashed ${user}`;
        chosendesc = 'I\'m sorry.';
        emote = ':wave::skin-tone-2:';
        attackgif = 'https://i.imgur.com/h7orTAQ.gif';
    }   else if(atc.match(/(?:vibeblast)/i)){
        chosenattack = `you vibe-blasted ${user}`;
        chosendesc = 'Nothing.';
        emote = ':raised_hand_with_fingers_splayed::skin-tone-4:';
        attackgif = 'https://i.imgur.com/n5Is19c.gif';
    }   else if(atc.match(/(?:shootarrow)/i)){
        chosenattack = `you shot an arrow through ${user}`;
        chosendesc = 'You have failed this omelette!';
        emote = ':bow_and_arrow:';
        attackgif = 'https://i.imgur.com/De98uf0.gif';
    }   else if(atc.match(/(?:heatvision)/i)){
        chosenattack = `you used your heat vision on ${user}`;
        chosendesc = 'NJAAARRRRGHHHHHH!';
        emote = ':hotsprings:';
        attackgif = 'https://i.imgur.com/0WxrvMp.gif';
    }   else if(atc.match(/(?:stretchpunch)/i)){
        chosenattack = `you stretch-punched ${user}`;
        chosendesc = 'HAVE A GOOD NIGHT!';
        emote = ':punch::skin-tone-1:';
        attackgif = 'http://i.imgur.com/8suYrKa.gif';
    }   else if(atc.match(/(?:canarycry)/i)){
        chosenattack = `you used your Canary-Cry on ${user}`;
        chosendesc = 'I\'m the justice you can\'t run from!';
        emote = ':loudspeaker:';
        attackgif = 'https://i.imgur.com/PUf5GQL.gif';
    }   else if(atc.match(/(?:batarang)/i)){
        chosenattack = `you threw a batarang at ${user}`;
        chosendesc = 'SWOOOSH, CLANG, SWOOOSH';
        emote = ':bat:';
        attackgif = 'https://i.imgur.com/sDbgD6M.gif';
    }   else if(atc.match(/(?:sendtohell)/i)){
        chosenattack = `you sent ${user} to hell`;
        chosendesc = 'Show yourself, \'cause I\'m a nasty piece of work!';
        emote = ':fire:';
        attackgif = 'https://i.imgur.com/KvVXuyj.gif';
    }   else if(atc.match(/(?:thunderclap)/i)){
        chosenattack = `you used your thunderclap on ${user}`;
        chosendesc = 'BANGARANG!';
        emote = ':clap::skin-tone-1:';
        attackgif = 'https://i.imgur.com/4euvzox.gif';
    }   else if(atc.match(/(?:elblast)/i)){
        chosenattack = `you electro-blasted ${user}`;
        chosendesc = 'It\'s time that people know, that Black Lightning is back!';
        emote = ':zap:';
        attackgif = 'https://i.imgur.com/3Rj426N.gif';
    }   else if(atc.match(/(?:fireblast)/i)){
        chosenattack = `you fire-blasted ${user}`;
        chosendesc = 'FHOOM!';
        emote = ':fire:';
        attackgif = 'https://i.imgur.com/SNuMve9.gif';
    }   else {
        return message.channel.send('You must supply a valid attack!');
    }

    const attack = new Discord.MessageEmbed()
	.setColor('#2791D3')
    .setDescription(`**${emote}${auth} ${chosenattack}${emote}**\n\n${chosendesc}`)
	.setImage(attackgif)
    .setTimestamp()
    .setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', gideon.user.avatarURL())

    message.channel.send(attack);
}

module.exports.help = {
    name: "at"
}