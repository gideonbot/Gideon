import Discord from 'discord.js';
import fetch from 'node-fetch';
import Util from '../../Util.js';
import moment from 'moment';

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(gideon, message, args) {
    let agc = args[0];
    let info = Util.parseSeriesEpisodeString(args[1]);

    let shows = [
        {
            id: '13',
            title: 'The Flash',
            channel: 'The CW'
        },
        {
            id: '4',
            title: 'Arrow',
            channel: 'The CW'
        },
        {
            id: '1850',
            title: 'Supergirl',
            channel: info.season === '1' ? 'CBS' : 'The CW'
        },
        {
            id: '1851',
            title: 'DC\'s Legends of Tomorrow',
            channel: 'The CW'
        },
        {
            id: '15',
            title: 'Constantine',
            channel: 'NBC'
        },
        {
            id: '37776',
            title: 'Batwoman',
            channel: 'The CW'
        },
        {
            id: '20683',
            title: 'Black Lightning',
            channel: 'The CW'
        },
        {
            id: '44496',
            title: 'Green Arrow and the Canaries',
            channel: 'The CW'
        },
        {
            id: '3082',
            title: 'Krypton',
            channel: 'Syfy'
        },
        {
            id: '1859',
            title: 'Lucifer',
            channel: info.season == '1' || info.season == '2' || info.season == '3' ? 'Fox' : 'Netflix'
        },
        {
            id: '44751',
            title: 'Superman & Lois',
            channel: 'The CW'
        },
        {
            id: '37809',
            title: 'Stargirl',
            channel: 'DC Universe/The CW'
        }
    ];

    let show = shows[-1];

    if (agc.match(/(?:flash)/i)) show = shows[0];
    else if (agc.match(/(?:arrow)/i)) show = shows[1];
    else if (agc.match(/(?:supergirl)/i)) show = shows[2];
    else if (agc.match(/(?:legends)/i)) show = shows[3];
    else if (agc.match(/(?:constantine)/i)) show = shows[4];
    else if (agc.match(/(?:batwoman)/i)) show = shows[5];
    else if (agc.match(/(?:blacklightning)/i)) show = shows[6];
    else if (agc.match(/(?:canaries)/i)) show = shows[7];
    else if (agc.match(/(?:krypton)/i)) show = shows[8];
    else if (agc.match(/(?:lucifer)/i)) show = shows[9];
    else if (agc.match(/(?:supesnlois)/i)) show = shows[10];
    else if (agc.match(/(?:stargirl)/i)) show = shows[11];
    else return message.channel.send(Util.CreateEmbed('You must supply a valid show!', {
        description: 'Available shows:\n**flash**\n**arrow**\n**supergirl**\n**legends**\n**constantine**\n**blacklightning**\n**batwoman**\n**krypton**\n**lucifer**\n**supesnlois**\n**stargirl**'
    }, message.member));

    const api = `http://api.tvmaze.com/shows/${show.id}/episodebynumber?season=${info.season}&number=${info.episode}`;

    try {
        const body = await Util.fetchJSON(api);

        if (body.status === 404) return message.channel.send(Util.CreateEmbed('There was no data for this episode!', null, message.member));
        
        let sp = '';
        let today = new Date();
        let airdate = new Date(body.airdate);
        if (!moment(airdate).isValid()) sp = '||';
        if (today < airdate) sp = '||';
        let airtime = body.airtime;
        let desc = !body.summary ? 'No summary available' : body.summary.replace('<p>', '').replace('</p>', '');
        let img;
        if (body.image == null) img = '';
        else img = body.image.original;        
           
    
        let timeString = airtime;
        let H = timeString.split(':')[0];
        let h = H % 12 || 12;
        let am_pm = (H < 12 || H === 24) ? ' AM' : ' PM';
        timeString = h + ':' + timeString.split(':')[1] + am_pm;
    
        message.channel.send(Util.CreateEmbed(`${show.title} ${body.season}x${Util.normalize(body.number)} - ${body.name}`, {
            description: sp + desc + sp + `\n\nAirdate: \`${moment(airdate).isValid() ? airdate.toDateString() : 'No Airdate Available'}\`\nAirtime: \`${timeString + ' ET'}\`\nRuntime: \`${body.runtime} Minutes\`\nChannel: \`${show.channel}\`\n\n**[Click here to read the full recap and watch the episode's trailer](${body.url} '${body.url}')**`,
            image: img
        }, message.member));
    }
    
    catch (ex) {
        console.log('Exception occurred while fetching the episodes ' + ex.stack);
        Util.log('Exception occurred while fetching the episodes ' + ex.stack);
        message.channel.send(Util.CreateEmbed('An error occurred while trying to fetch the episodes!', null, message.member));
    }
}
export const help = {
    name: ['ep', 'episode'],
    type: 'general',
    help_text: 'ep <show> <NxNN|SNENN> ~ N -> number',
    help_desc: 'Fetches episode info',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {force: true, amount: 2, type: 'episode'},
    roles: [],
    user_perms: [],
    bot_perms: []
};