/* eslint-disable no-unused-vars */
const Discord = module.require("discord.js");
const Util = require("../Util");

module.exports.run = async (gideon, message, args) => {
    if (message.guild.id !== '595318490240385037') return message.channel.send('This command only works at the Time Vault!\nhttps://discord.gg/h9SEQaU');
    if (!message.member.roles.has('602311948809273344')) return message.channel.send('You don\'t have the required permissions to use this command!');

    const emoji_ids = ['598886586284900354', '607658682246758445', '598886597244485654', '598886605641613353', '598886588545499186', '598886601476800513', '607657873534746634'];

    const auth = message.author.id;
    const flash = '596074712682070061';
    const arrow = '596075000151277568';
    const batwoman = '596075415898947584';
    const constantine = '596075638285139988';
    const legends = '596075305861513246';
    const supergirl = '596075165780017172';
    const blacklightning = '607633853527359488';
    const AV2020 = '610867040961560625';

    const filter = m => m.author.id === message.author.id;
    const collector = new Discord.MessageCollector(message.channel, filter, { time: 120000, errors: ['time'] });
    let roles_to_ping = [];

    await Util.TDM(message.guild, true);

    message.channel.send('Please react to mark the role(s) you want to ping.\nThen please post the news below.\nYou can optionally provide an image and a URL.\nSend \'cancel\' or \'stop\' to cancel.\nYou\'ve got 120 seconds.').then(message => {
        for (let emoji of emoji_ids) {
            message.react(emoji).then(s => {}, failed => console.log("Failed to react with " + emoji + ": " + failed));
        }
        
        const rfilter = (reaction, user) => emoji_ids.includes(reaction.emoji.id) && user.id == auth;

        const rcollector = message.createReactionCollector(rfilter, { time: 120000 });
    
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
            return message.reply('your news post has been cancelled! :white_check_mark:');
        }

        const news = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle(`Arrowverse News`)
        .setDescription(message.content)
        .setThumbnail(message.author.avatarURL)
        .addField('News posted by:', message.author)   
        .setTimestamp()
        .setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', gideon.user.avatarURL());

        if (message.attachments.size > 0) news.setImage(message.attachments.first().proxyURL);

        const tmvt = gideon.guilds.get('595318490240385037');
        if (!tmvt) {
            console.log('Couldn\'t get TV server when running news!');
            return message.channel.send('An error occurred, please try again later');
        }

        const news_channel = tmvt.channels.get('595944027208024085');
        if (!news_channel) {
            console.log('Couldn\'t get news channel when running news!');
            return message.channel.send('An error occurred, please try again later');
        }

        news_channel.send(news).then(async x => {
            message.channel.bulkDelete(3);
            if (roles_to_ping.length > 0) await news_channel.send(roles_to_ping.map(x => "<@&" + x + ">").join(" "));

            const g = gideon.guilds.get('474179239068041237');
            let sent = false;
            if (g) {
                try { 
                    await g.channels.get('511627290996637727').send(news);
                    sent = true;
                }
                catch (ex) {
                    console.log("An error occurred while sending news to other server");
                    Util.log("An error occurred while sending news to other server");
                }
            }
            
            message.reply(`Your news post has been sent to ${news_channel.toString()}${sent ? ' & ' + g.channels.get('511627290996637727').toString() : ''}! :white_check_mark:`);
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