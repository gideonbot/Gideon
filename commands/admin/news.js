import Util from '../../Util.js';
import Akairo from 'discord-akairo';
const Command = Akairo.Command;

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */

class News extends Command {
    constructor() {
        super('news', {
            aliases: ['news', 'updates'],
            category: 'admin',
            channel: 'guild'
        });
    }

    async exec(message) {
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
        };

        const f = m => m.author.id === message.author.id;
        const collector = message.channel.createMessageCollector(f, {time: 120 * 1000});
        let roles_to_ping = [];

        let cvmen = false; 
        let cvm = this.client.getGuild.get(message.guild.id);

        if (cvm.cvmval === 1) {
            cvmen = true;
            cvm.cvmval = 0,
            this.client.setGuild.run(cvm);
        } 

        message.channel.send('Please react to mark the role(s) you want to ping.\nThen please post the news below.\nYou can optionally provide an image and a URL.\nSend \'cancel\' or \'stop\' to cancel.\nYou\'ve got 120 seconds.').then(async message => {
            for (let emoji of emoji_ids) message.react(emoji).then(() => {}, failed => console.log('Failed to react with ' + emoji + ': ' + failed));

            const rfilter = (reaction, user) => emoji_ids.includes(reaction.emoji.id) && user.id === auth;
            const rcollector = message.createReactionCollector(rfilter, {time: 120000});
        
            rcollector.on('collect', reaction => {
                if (reaction.emoji.name in role_ids) roles_to_ping.push(role_ids[reaction.emoji.name]);
            });
        }); 

        collector.on('collect', async message => {
            try {
                let res = await Util.ABM_Test(message);
                if (res.match) {
                    collector.stop();
                    Util.log('ABM **in news** triggered by: ' + message.author.tag + ' (' + res.content + ')');
                    return;
                }
            }
            catch (ex) {console.log(ex);}

            if (message.content.toLowerCase() === 'cancel' || message.content.toLowerCase() === 'stop') {
                await message.channel.bulkDelete(3); 
                collector.stop();
                return message.reply('Your news post has been cancelled! :white_check_mark:');
            }

            const news = Util.CreateEmbed('Arrowverse News', {description: message.content, thumbnail: message.author.avatarURL()}).addField('News posted by:', message.author);
            if (message.attachments.size > 0) news.setImage(message.attachments.first().proxyURL);

            const tmvt = this.client.guilds.cache.get('595318490240385037');
            if (!tmvt) {
                Util.log('Couldn\'t get TV server when running news!');
                return message.channel.send(Util.CreateEmbed('An error occurred, please try again later!'));
            }

            const news_channel = tmvt.channels.cache.get('595944027208024085');
            if (!news_channel) {
                Util.log('Couldn\'t get news channel when running news!');
                return message.channel.send(Util.CreateEmbed('An error occurred, please try again later!'));
            }

            //<@&NUMBER> is how roles are represented | NUMBER - role id
            let roles_ping_msg = roles_to_ping.length > 0 ? roles_to_ping.map(x => '<@&' + x + '>').join(' ') : null;
            news_channel.send(roles_ping_msg, {embed: news}).then(async () => {
                await Util.delay(200);
                await message.channel.bulkDelete(3);
                
                message.reply(`Your news post has been sent to ${news_channel.toString()}! :white_check_mark:`);
                if (cvmen) {
                    cvm.cvmval = 1,
                    this.client.setGuild.run(cvm);
                }
                collector.stop();
            });
        });

        collector.on('end', (collected, reason) => {
            if (reason === 'time') return message.reply('You ran out of time!');
        });
    }
}

export default News;
