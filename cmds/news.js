const Discord = module.require("discord.js");

module.exports.run = async (gideon, message, args) => {
    if(message.guild.id !== '595318490240385037') return message.channel.send('This command only works at the Time Vault!\nhttps://discord.gg/h9SEQaU');
    if(!message.member.roles.has('602311948809273344')) return message.channel.send('You don\'t have the required permissions to use this command!');
  
    const auth = message.author.id;
    const flash = message.guild.roles.get('596074712682070061');
    const arrow = message.guild.roles.get('596075000151277568');
    const batwoman = message.guild.roles.get('596075415898947584');
    const constantine = message.guild.roles.get('596075638285139988');
    const legends = message.guild.roles.get('596075305861513246');
    const supergirl = message.guild.roles.get('596075165780017172');
    const blacklightning = message.guild.roles.get('607633853527359488');
    const AV2020 = message.guild.roles.get('610867040961560625');
    let flaping = '';
    let arping = '';
    let bwping = '';
    let ctping = '';
    let lgping = '';
    let sgping = '';
    let blping = '';
    let AV2020ping = '';
    const filter = m => m.author.id === message.author.id
    const collector = new Discord.MessageCollector(message.channel, filter, { time: 120000, errors: ['time'] });
    let avnews;
    let ping = false;

    async function edm() {
    flash.edit({ mentionable: true })
    .catch(console.error);

    arrow.edit({ mentionable: true })
    .catch(console.error);

    batwoman.edit({ mentionable: true })
    .catch(console.error);

    constantine.edit({ mentionable: true })
    .catch(console.error);

    legends.edit({ mentionable: true })
    .catch(console.error);

    supergirl.edit({ mentionable: true })
    .catch(console.error);

    blacklightning.edit({ mentionable: true })
    .catch(console.error);

    AV2020.edit({ mentionable: true })
    .catch(console.error);
    } 

    async function ddm() {
    flash.edit({ mentionable: false })
    .catch(console.error);

    arrow.edit({ mentionable: false })
    .catch(console.error);

    batwoman.edit({ mentionable: false })
    .catch(console.error);

    constantine.edit({ mentionable: false })
    .catch(console.error);

    legends.edit({ mentionable: false })
    .catch(console.error);

    supergirl.edit({ mentionable: false })
    .catch(console.error); 

    blacklightning.edit({ mentionable: false })
    .catch(console.error);

    AV2020.edit({ mentionable: false })
    .catch(console.error);
    } 

    await edm();

    message.channel.send('Please react to mark the role(s) you want to ping.\nThen please post the news below.\nYou can optionally provide an image and a URL.\nSend \'cancel\' or \'stop\' to cancel.\nYou\'ve got 120 seconds.')
    .then(function(message) {
        message.react('598886586284900354')
        .then(() => message.react('607658682246758445'))
        .then(() => message.react('598886597244485654'))
        .then(() => message.react('598886605641613353'))
        .then(() => message.react('598886588545499186'))
        .then(() => message.react('598886601476800513'))
        .then(() => message.react('607657873534746634'))
        //.then(() => message.react(''))
        .catch(() => console.error);       
        
        const rfilter = (reaction, user) => {
            return ['flashemblem',
                    'arrowlogo',
                    'houseofel',
                    'lotlogo',
                    'batwoman',
                    'constantineseal',
                    'blacklightning',
                    'AV2020'].includes(reaction.emoji.name) && user.id === auth;
        };
            
        const rcollector = message.createReactionCollector(rfilter, { time: 120000 });
    
        rcollector.on('collect', (reaction, reactionCollector) => {
            if(reaction) ping = true;

            console.log(`Collected ${reaction.emoji.name}`);
            if (reaction.emoji.name === 'flashemblem') {
                flaping = flash;
            }
            if (reaction.emoji.name === 'arrowlogo') {
                arping = arrow;
            }
            if (reaction.emoji.name === 'houseofel') {
                sgping = supergirl;
            }
            if (reaction.emoji.name === 'lotlogo') {
                lgping = legends;
            }
            if (reaction.emoji.name === 'batwoman') {
                bwping = batwoman;
            }
            if (reaction.emoji.name === 'constantineseal') {
                ctping = constantine;
            }
            if (reaction.emoji.name === 'blacklightning') {
                blping = blacklightning;
            }
            if (reaction.emoji.name === 'AV2020') {
                AV2020ping = AV2020;
            }
        });
    }); 

    collector.on('collect', message => {
        if (message.content === 'cancel' || message.content === 'stop'){
            message.channel.bulkDelete(3); 
            collector.stop();
            return message.reply('your news post has been cancelled!:white_check_mark:');
        }
        if (!avnews) {
            avnews = message.content;
        }

        const news = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle(`Arrowverse News`)
        .setDescription(avnews)
        .setThumbnail(message.author.avatarURL)
        .addField('News posted by:', message.author)   
        .setTimestamp()
        .setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', gideon.user.avatarURL())
        if (message.attachments.size > 0) news.setImage(message.attachments.first().url);  
        gideon.guilds.get('595318490240385037').channels.get('595944027208024085').send(news)
        .then(function(msgdl) {message.channel.bulkDelete(3);})
        .then(async function(avihmessage) {
            await gideon.guilds.get('474179239068041237').channels.get('511627290996637727').send(news);
            gideon.guilds.get('474179239068041237').channels.get('511627290996637727').send('This news was brought to you by:\nhttps://discord.gg/h9SEQaU');
        }).then(async function(pingmsg) {
        if(ping == true){
            await gideon.guilds.get('595318490240385037').channels.get('595944027208024085').send(`${flaping}${arping}${sgping}${lgping}${ctping}${bwping}${blping}`);
            };
        } ).then(function(sdmsg) {
            message.reply(`your news post has been sent to ${message.guild.channels.get('595944027208024085').toString()} & ${gideon.guilds.get('474179239068041237').channels.get('511627290996637727').toString()}!:white_check_mark:`);
            ddm();
            collector.stop();
        });
    })

    collector.on('end', (collected, reason) => {
        if(reason === 'time') return message.channel.send("You ran out of time!");
      });
    }

module.exports.help = {
    name: "news"
}