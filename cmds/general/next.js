import Discord from 'discord.js';
import fetch from 'node-fetch';
import Util from '../../Util.js';

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(gideon, message, args) {
    let agc = args[0];
    const url = 'https://arrowverse.info';
    const api = 'https://arrowverse.info/api';
    let showtitle;
    let thimg;
    
    if (agc.match(/(?:flash)/i)) showtitle = 'The Flash';
    else if (agc.match(/(?:arrow)/i)) showtitle = 'Arrow';
    else if (agc.match(/(?:supergirl)/i)) showtitle = 'Supergirl';
    else if (agc.match(/(?:legends)/i)) showtitle = 'DC\'s Legends of Tomorrow';
    else if (agc.match(/(?:constantine)/i)) showtitle = 'Constantine';
    else if (agc.match(/(?:batwoman)/i)) showtitle = 'Batwoman';
    else if (agc.match(/(?:blacklightning)/i)) showtitle = 'Black Lightning';
    //else if (agc.match(/(?:canaries)/i)) showtitle = "Green Arrow and the Canaries";
    //else if (agc.match(/(?:supesnlois)/i)) showtitle = "Superman & Lois";
    //else if (agc.match(/(?:stargirl)/i)) showtitle = "Stargirl";
    else return message.channel.send(Util.CreateEmbed('You must supply a valid show!', {
        description: 'Available shows:\n**flash**\n**arrow**\n**supergirl**\n**legends**\n**constantine**\n**blacklightning**\n**batwoman**\n**canaries**\n**supesnlois**\n**stargirl**'
    }, message.member));

    try {
        const body = await Util.fetchJSON(api);

        //remove previous !next collectors for that specific user (found by searching for embeds with users name#discriminator in title)
        message.channel.messages.fetch({limit: 50}).then(messages => {
            //really big filter
            let filtered = messages.filter(x => x && x.author && x.author.id === gideon.user.id && x.nextCollector && x.embeds && x.embeds.length > 0 && x.embeds[0] && x.embeds[0].title && x.embeds[0].title.endsWith(message.author.tag + ':'));

            filtered.each(msg => {
                if (msg.reactions.size > 0) msg.reactions.removeAll();
                msg.nextCollector.stop();
                msg.nextCollector = null;
            });
        });

        let fiep = Util.parseSeriesEpisodeString(args[1]);
        fiep = 'S' + Util.normalize(fiep.season) + 'E' + Util.normalize(fiep.episode);

        let shows = body.filter(x => x.series !== 'Vixen' && x.series !== 'Freedom Fighters: The Ray');

        /**
         * @param {string} show 
         * @param {*} season_and_episode 
         */
        let GetNextEmbed = (show, season_and_episode) => {
            let f = shows.find(x => x.series === show && x.episode_id === season_and_episode);
            if (!f) return `${show} ${season_and_episode} is not a valid episode!`;

            let next = shows[shows.indexOf(f) + 1];
            if (!next) return 'Couldn\'t find that episode. Try again.';
        
            const nxep = `${next.series} ${next.episode_id} - ${next.episode_name}`;
            const nxepard = `Airdate: ${next.air_date}`;
        
            if (next.series.match(/(?:flash)/i)) thimg = 'https://i.ytimg.com/vi/ghPatoChvV0/maxresdefault.jpg';
            else if (next.series.match(/(?:arrow)/i)) thimg = 'http://www.greenarrowtv.com/wp-content/uploads/2017/10/Screen-Shot-2017-10-19-at-6.50.41-PM.jpg';
            else if (next.series.match(/(?:supergirl)/i)) thimg = 'https://i0.wp.com/thegameofnerds.com/wp-content/uploads/2018/01/supergirl-title-card1.png?resize=560%2C315&ssl=1';
            else if (next.series.match(/(?:legends)/i)) thimg = 'https://i.imgur.com/FLqwOYv.png';
            else if (next.series.match(/(?:constantine)/i)) thimg = 'https://upload.wikimedia.org/wikipedia/en/b/b1/Constantine_TV_show_logo.jpg';
            else if (next.series.match(/(?:batwoman)/i)) thimg = 'https://upload.wikimedia.org/wikipedia/en/c/c3/Batwoman_TV_series_logo.png';
            else if (next.series.match(/(?:black lightning)/i)) thimg = 'https://upload.wikimedia.org/wikipedia/en/e/ef/Black_Lightning_%28TV_series%29.png';
            //else if (next.series.match(/(?:canaries)/i)) thimg = '';
            //else if (next.series.match(/(?:supesnlois)/i)) thimg = '';
            //else if (next.series.match(/(?:stargirl)/i)) thimg = '';
        
            const embed = Util.CreateEmbed(`Next episode for ${message.author.tag}:`, {
                thumbnail: thimg,
                footer: {text: 'Click on the button below to view the next episode (works every 5 minutes)', icon: gideon.user.avatarURL()},
                fields: [
                    {
                        name: nxep,
                        value: nxepard
                    },
                    {
                        name: 'Powered by:',
                        value: `**[arrowverse.info](${url} '${url}')**`
                    }
                ]
            }, message.member);

            return embed;
        };
    
        let embed = GetNextEmbed(showtitle, fiep);

        message.channel.send(embed).then(sent => {
            //don't react with ▶ to error messages
            if (typeof embed === 'string') return;
            sent.react('▶');
            let LastEdit = Date.now();
            let filter = (reaction, user) => user.id === message.author.id && reaction.emoji.name === '▶';
            let collector = sent.createReactionCollector(filter);
            sent.nextCollector = collector;

            collector.on('collect', async (reaction, user) => {
                let now = Date.now();
                let diff = (now - LastEdit) / 1000;

                let embed = collector.message.embeds[0];

                if (diff >= 60 * 5 || embed.fields[0].name.toLowerCase().includes('black lightning')) {
                    LastEdit = Date.now();

                    //Arrow S01E02 - Honor Thy Father
                    let name = embed.fields[0].name;

                    // we split using " - " to get the tv show & season+ep (Arrow S01E02)
                    let data = name.split(' - ')[0];
                    
                    //then we split using " " to get the ep info (last item of array) and tv show name (what is left of the array)
                    
                    let data_split = data.split(' ');
                    //we get the last item of array using array.pop()
                    let ep_info = data_split.pop();
                    //what's left is the TV show name
                    let tv_show_name = data_split.join(' ');

                    //with data we have we just request the next episode, easy
                    collector.message.edit(GetNextEmbed(tv_show_name, ep_info));
                }

                //we remove the reaction even when the user is rate limited... I guess
                reaction.message.reactions.cache.find(x => x.emoji.name === '▶').users.remove(user.id);
            });
        });
    }

    catch (ex) {
        Util.log('Failed to fetch next episode: ' + ex.stack);
        message.channel.send(Util.CreateEmbed('Failed to fetch episode list, please try again later!', null, message.member));
    }
}

export const help = {
    name: ['next', 'nx'],
    type: 'general',
    help_text: 'next <show> <NxNN/SNNENN> ~ N -> number',
    help_desc: 'Fetches next episode in watching order',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {force: true, amount: 2, type: 'episode'},
    roles: [],
    user_perms: [],
    bot_perms: ['MANAGE_MESSAGES']
};
