/* eslint-disable no-unused-vars */
const Discord = module.require("discord.js");
const Util = require("../Util");

module.exports.run = async (gideon, message, args) => {
    if (message.guild.id !== '595318490240385037') return message.channel.send('This command only works at the Time Vault!\nhttps://discord.gg/h9SEQaU');
    if (!message.member.roles.has('602311948809273344')) return message.channel.send('You don\'t have the required permissions to use this command!');

    const role_ids = [ '596074712682070061', '596075000151277568', '596075415898947584', '596075638285139988', '596075305861513246', '596075165780017172', '607633853527359488', '610867040961560625' ];
    const emoji_ids = [ '598886586284900354', '607658682246758445', '598886597244485654', '598886605641613353', '598886588545499186', '598886601476800513', '607657873534746634' ];

    const auth = message.author.id;
    const flash = '596074712682070061';
    const arrow = '596075000151277568';
    const batwoman = '596075415898947584';
    const constantine = '596075638285139988';
    const legends = '596075305861513246';
    const supergirl = '596075165780017172';
    const blacklightning = '607633853527359488';
    const AV2020 = '610867040961560625';
    let flaping = '';
    let arping = '';
    let bwping = '';
    let ctping = '';
    let lgping = '';
    let sgping = '';
    let blping = '';
    let AV2020ping = '';
    const filter = m => m.author.id === message.author.id;
    const collector = new Discord.MessageCollector(message.channel, filter, { time: 120000, errors: ['time'] });
    let avnews;
    let ping = false;

    await Util.TDM(message.guild, true);

    message.channel.send('Please react to mark the role(s) you want to ping.\nThen please post the news below.\nYou can optionally provide an image and a URL.\nSend \'cancel\' or \'stop\' to cancel.\nYou\'ve got 120 seconds.').then(message => {
        for (let emoji of emoji_ids) {
            message.react(emoji).then(s => {}, failed => console.log("Failed to react with " + emoji + ": " + failed));
        }
        
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

        let roles_to_ping = [];
    
        rcollector.on('collect', (reaction, reactionCollector) => {
            console.log(`Collected ${reaction.emoji.name}`);
            if (reaction.emoji.name === 'flashemblem') roles_to_ping.push(flash);
            if (reaction.emoji.name === 'arrowlogo') roles_to_ping.push(arrow);
            if (reaction.emoji.name === 'houseofel') roles_to_ping.push(supergirl);
            if (reaction.emoji.name === 'lotlogo') roles_to_ping.push(legends);
            if (reaction.emoji.name === 'batwoman') roles_to_ping.push(batwoman);
            if (reaction.emoji.name === 'constantineseal') roles_to_ping.push(constantine);
            if (reaction.emoji.name === 'blacklightning') roles_to_ping.push(blacklightning);
            if (reaction.emoji.name === 'AV2020') roles_to_ping.push(AV2020);
        });
    }); 

    collector.on('collect', message => {
        if (message.content === 'cancel' || message.content === 'stop') {
            message.channel.bulkDelete(3); 
            collector.stop();
            return message.reply('your news post has been cancelled!:white_check_mark:');
        }

        if (!avnews) avnews = message.content;

        const news = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle(`Arrowverse News`)
        .setDescription(avnews)
        .setThumbnail(message.author.avatarURL)
        .addField('News posted by:', message.author)   
        .setTimestamp()
        .setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', gideon.user.avatarURL());

        if (message.attachments.size > 0) news.setImage(message.attachments.first().proxyURL);

        gideon.guilds.get('595318490240385037').channels.get('595944027208024085').send(news).then(async msgdl => {
            message.channel.bulkDelete(3);
            if (roles_to_ping.length > 0) await gideon.guilds.get('595318490240385037').channels.get('595944027208024085').send(roles_to_ping.map(x => "<@&" + x + ">").join(" "));
            message.reply(`your news post has been sent to ${message.guild.channels.get('595944027208024085').toString()} & ${gideon.guilds.get('474179239068041237').channels.get('511627290996637727').toString()}! :white_check_mark:`);
            Util.TDM(message.guild, false);
            collector.stop();
        });
    });

    collector.on('end', (collected, reason) => {
        if (reason === 'time') return message.channel.send("You ran out of time!");
      });
    }

module.exports.help = {
    name: "news"
}