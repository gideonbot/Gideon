const Discord = module.require("discord.js");

module.exports.run = async (gideon, message, args) => {
    if(!gideon.guilds.get('595318490240385037')) return message.channel.send('This command only works at the Time Vault!\nhttps://discord.gg/h9SEQaU');
    if(!message.member.roles.has('602311948809273344')){
        return message.channel.send('You don\'t have the required permissions to use this command!');
    }   else{
    const auth = message.author.id;
    let flash = message.guild.roles.get('596074712682070061');
    let arrow = message.guild.roles.get('596075000151277568');
    let batwoman = message.guild.roles.get('596075415898947584');
    let constantine = message.guild.roles.get('596075638285139988');
    let legends = message.guild.roles.get('596075305861513246');
    let supergirl = message.guild.roles.get('596075165780017172');
    let flaping = '';
    let arping = '';
    let bwping = '';
    let ctping = '';
    let lgping = '';
    let sgping = '';
    const filter = m => m.author.id === message.author.id
    const collector = new Discord.MessageCollector(message.channel, filter, { time: 120000, errors: ['time'] });
    const rfilter = (reaction, user) => {
        return ['⚡', '🏹', '🌌', '⌛', '🦇', '🔥'].includes(reaction.emoji.name) && user.id === auth;
    };
    const rcollector = message.createReactionCollector(rfilter, { time: 120000 });
    let avnews;
    let ping = false;
    
    function edm() {
        flash.edit({ mentionable: true })
        .then(r => console.log(r.mentionable))
        .catch(console.error);

        arrow.edit({ mentionable: true })
        .then(r => console.log(r.mentionable))
        .catch(console.error);

        batwoman.edit({ mentionable: true })
        .then(r => console.log(r.mentionable))
        .catch(console.error);

        constantine.edit({ mentionable: true })
        .then(r => console.log(r.mentionable))
        .catch(console.error);

        legends.edit({ mentionable: true })
        .then(r => console.log(r.mentionable))
        .catch(console.error);

        supergirl.edit({ mentionable: true })
        .then(r => console.log(r.mentionable))
        .catch(console.error); 
     } 

    function ddm() {
        flash.edit({ mentionable: false })
        .then(r => console.log(r.mentionable))
        .catch(console.error);

        arrow.edit({ mentionable: false })
        .then(r => console.log(r.mentionable))
        .catch(console.error);

        batwoman.edit({ mentionable: false })
        .then(r => console.log(r.mentionable))
        .catch(console.error);

        constantine.edit({ mentionable: false })
        .then(r => console.log(r.mentionable))
        .catch(console.error);

        legends.edit({ mentionable: false })
        .then(r => console.log(r.mentionable))
        .catch(console.error);

        supergirl.edit({ mentionable: false })
        .then(r => console.log(r.mentionable))
        .catch(console.error); 
     } 

    message.channel.send('Please react to mark the role(s) you want to ping.\nThen please post the news below.\nYou can optionally provide an image and a URL\nYou\'ve got 120 seconds.')
    .then(function(message) {
        message.react('⚡')
			.then(() => message.react('🏹'))
			.then(() => message.react('🌌'))
			.then(() => message.react('⌛'))
			.then(() => message.react('🦇'))
			.then(() => message.react('🔥'))
            .catch(() => console.error);       
        
            rcollector.on('collect', (reaction, reactionCollector) => {
                if(reaction) ping = true;
                console.log(ping);
                console.log(`Collected ${reaction.emoji.name}`);
                if (reaction.emoji.name === '⚡') {
                    console.log('flash');
                    flaping = flash;
                }
                if (reaction.emoji.name === '🏹') {
                    console.log('arrow');
                    arping = arrow;
                }
                if (reaction.emoji.name === '🌌') {
                    console.log('supergirl');
                    sgping = supergirl;
                }
                if (reaction.emoji.name === '⌛') {
                    console.log('legends');
                    lgping = legends;
                }
                if (reaction.emoji.name === '🦇') {
                    console.log('batwoman');
                    bwping = batwoman;
                }
                if (reaction.emoji.name === '🔥') {
                    console.log('constantine');
                    ctping = constantine;
                }
            });
    }); 

    collector.on('collect', message => {
        if (message.content === 'cancel' || message.content === 'stop'){
            message.delete(); 
            collector.stop();
            rcollector.stop();
            return message.channel.send('News post cancelled!:white_check_mark:');
        }
        if (!avnews) {
            avnews = message.content;
        }

        message.delete();
        
        const news = new Discord.RichEmbed()
        .setColor('#2791D3')
        .setTitle(`Arrowverse News`)
        .setDescription(avnews)
        .setThumbnail(message.author.avatarURL)
        .addField('News posted by:', message.author)   
        .setTimestamp()
        .setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png')
        if (message.attachments.size > 0) news.setImage(message.attachments.first().url)  

        gideon.guilds.get('595318490240385037').channels.get('595944027208024085').send(news)
        .then(function(message) {
        if(ping === true){
            edm();
            gideon.guilds.get('595318490240385037').channels.get('595944027208024085').send(`${flaping}${arping}${bwping}${ctping}${lgping}${sgping}`);
            ddm();
            };
        } );
        
        message.channel.send(`Your news post has been sent to ${message.guild.channels.get('595944027208024085').toString()}!:white_check_mark:`);
        collector.stop();
        rcollector.stop();
    })

    collector.on('end', (collected, reason) => {
        if(reason === 'time') message.channel.send("You ran out of time!");
      });
    }
}

module.exports.help = {
    name: "news"
}