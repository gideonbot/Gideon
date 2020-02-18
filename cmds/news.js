const Discord = require("discord.js");
const Util = require("../Util");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message) => {
    if (message.guild.id !== '595318490240385037') return message.channel.send('This command only works at the Time Vault!\nhttps://discord.gg/h9SEQaU');
    if (!message.member.roles.cache.has('602311948809273344')) return message.channel.send('You don\'t have the required permissions to use this command!');

    const emoji_ids = ['598886586284900354', '607658682246758445', '598886597244485654', '598886605641613353', '598886588545499186', '598886601476800513', '607657873534746634', '634764613434474496', '638489255169228830', '668513166380105770'];

    const auth = message.author.id;

    const role_ids = {
        flashemblem: '596074712682070061',
        arrowlogo: '596075000151277568',
        houseofel: '596075165780017172',
        lotlogo: '596075305861513246',
        batwoman: '596075415898947584',
        constantineseal: '596075638285139988',
        blacklightning: '607633853527359488',
        canaries: '610867040961560625',
        supesnlois: '638486598203473958',
        stargirl: '658355462055395358'
    }

    const f = m => m.author.id === message.author.id;
    const collector = message.channel.createMessageCollector(f, {time: 120 * 1000});
    let roles_to_ping = [];

    let cvmen = false; 
    if (gideon.cvmt) cvmen = true, gideon.cvmt = false; //if CVM is enabled, turn true, then off

    message.channel.send('Please react to mark the role(s) you want to ping.\nThen please post the news below.\nYou can optionally provide an image and a URL.\nSend \'cancel\' or \'stop\' to cancel.\nYou\'ve got 120 seconds.').then(async message => {
        for (let emoji of emoji_ids) {
            message.react(emoji).then(() => {}, failed => console.log("Failed to react with " + emoji + ": " + failed));
        }

        await Util.TRM(message.guild, true);

        const rfilter = (reaction, user) => emoji_ids.includes(reaction.emoji.id) && user.id === auth;

        const rcollector = message.createReactionCollector(rfilter, {time: 120000});
    
        rcollector.on('collect', reaction => {
            if (reaction.emoji.name in role_ids) roles_to_ping.push(role_ids[reaction.emoji.name]);
        });
    }); 

    collector.on('collect', async message => {
        try {
            let match = await Util.ABM_Test(message);
            collector.stop();
            Util.log("ABM **in news** triggered by: " + message.author.tag + " (" + match + ")");
            return;
        }
        catch (ex) {console.log(ex);}

        if (message.content.toLowerCase() === 'cancel' || message.content.toLowerCase() === 'stop') {
            await message.channel.bulkDelete(3); 
            collector.stop();
            return message.reply('your news post has been cancelled! :white_check_mark:');
        }

        const news = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle(`Arrowverse News`)
        .setDescription(message.content)
        .setThumbnail(message.author.avatarURL())
        .addField('News posted by:', message.author)
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        if (message.attachments.size > 0) news.setImage(message.attachments.first().proxyURL);

        const tmvt = gideon.guilds.cache.get('595318490240385037');
        if (!tmvt) {
            console.log('Couldn\'t get TV server when running news!');
            Util.log('Couldn\'t get TV server when running news!');

            const er = new Discord.MessageEmbed()
            .setColor('#2791D3')
            .setTitle('An error occurred, please try again later!')
            .setFooter(Util.config.footer, gideon.user.avatarURL());
            return message.channel.send(er);
        }

        const news_channel = tmvt.channels.cache.get('595944027208024085');
        if (!news_channel) {
            console.log('Couldn\'t get news channel when running news!');
            Util.log('Couldn\'t get news channel when running news!');

            const er = new Discord.MessageEmbed()
            .setColor('#2791D3')
            .setTitle('An error occurred, please try again later!')
            .setFooter(Util.config.footer, gideon.user.avatarURL());
            return message.channel.send(er);
        }

        //<@&NUMBER> is how roles are represented | NUMBER - role id
        let roles_ping_msg = roles_to_ping.length > 0 ? roles_to_ping.map(x => "<@&" + x + ">").join(" ") : null;
        news_channel.send(roles_ping_msg, {embed: news}).then(async () => {
            await Util.delay(200);
            await message.channel.bulkDelete(3);
            
            message.reply(`Your news post has been sent to ${news_channel.toString()}! :white_check_mark:`);
            await Util.TRM(message.guild, false);
            if (cvmen) gideon.cvmt = true;
            collector.stop();
        });
    });

    collector.on('end', (collected, reason) => {
        if (reason === 'time') return message.reply("You ran out of time!");
    });
}

module.exports.help = {
    name: "news",
    type: "admin",
    help_text: "news",
    help_desc: "News Team can use this to post news"
}