import OpenSubtitles from 'opensubtitles-api';
import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(message, args) {
    if (!process.env.OPS_UA || !process.env.OPS_USER || !process.env.OPS_PASS) {
        Util.log('Missing env variables for subs command!');
        return message.channel.send(Util.Embed('This command is currently not available', null, message.member));
    }

    const OS = new OpenSubtitles({
        useragent: process.env.OPS_UA,
        username: process.env.OPS_USER,
        password: process.env.OPS_PASS,
        ssl: true
    });

    if (!args[0]) return message.channel.send(Util.Embed('You must supply a lang code, the shows name, season and its episode number!', {
        description: 'You can find ISO 639-2 codes [here](https://en.wikipedia.org/wiki/List_of_ISO_639-2_codes \'https://en.wikipedia.org/wiki/List_of_ISO_639-2_codes\')!'
    }, message.member));

    if (args[0].length !== 3) return message.channel.send(Util.Embed('You must supply a valid ISO 639-2 code!', {
        description: '[ISO 639-2 codes](https://en.wikipedia.org/wiki/List_of_ISO_639-2_codes \'https://en.wikipedia.org/wiki/List_of_ISO_639-2_codes\')'
    }, message.member));

    let seasonAndEpisode = Util.parseSeriesEpisodeString(args[2]);
    if (!seasonAndEpisode) return message.channel.send(Util.Embed('You must supply a valid episode and season!', {description: 'Acceptable formats: S00E00 and 00x00'}, message.member));

    const shows = [
        {
            id: 'tt3107288',
            title: 'The Flash'
        },
        {
            id: 'tt2193021',
            title: 'Arrow'
        },
        {
            id: 'tt4016454',
            title: 'Supergirl'
        },
        {
            id: 'tt4532368',
            title: 'DC\'s Legends of Tomorrow'
        },
        {
            id: 'tt3489184',
            title: 'Constantine'
        },
        {
            id: 'tt8712204',
            title: 'Batwoman'
        },
        {
            id: 'tt6045840',
            title: 'Black Lightning'
        },
        {
            id: 'tt11012356',
            title: 'Green Arrow and the Canaries'
        },
        {
            id: 'tt4276624',
            title: 'Krypton'
        },
        {
            id: 'tt4052886',
            title: 'Lucifer'
        },
        {
            id: 'tt11192306',
            title: 'Superman & Lois'
        },
        {
            id: 'tt8722888',
            title: 'Stargirl'
        },
        {
            id: 'tt8416494',
            title: 'Doom Patrol'
        },
        {
            id: 'tt1043813',
            title: 'Titans'
        },
        {
            id: 'tt0279600',
            title: 'Smallville'
        },
        {
            id: 'tt1190634',
            title: 'The Boys'
        },
    ];

    let show = shows[-1];
    let agc = args[1];

    const ia = Util.Embed(`"${agc}" is not a valid argument!`, {
        description: 'Available shows:\n**flash**\n**arrow**\n**supergirl**\n**legends**\n**constantine**\n**blacklightning**\n**batwoman**\n**krypton**\n**lucifer**\n**supesnlois**\n**stargirl**\n**doompatrol**\n**titans**\n**smallville**\n**theboys**'
    }, message.member);

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
    else if (agc.match(/(?:doompatrol)/i)) show = shows[12];
    else if (agc.match(/(?:titans)/i)) show = shows[13];
    else if (agc.match(/(?:smallville)/i)) show = shows[14];
    else if (agc.match(/(?:theboys)/i)) show = shows[15];
    else return message.channel.send(ia);
    
    if (!show) return message.channel.send(ia);

    OS.search({
        sublanguageid: args[0],       
        season: seasonAndEpisode.season,
        episode: seasonAndEpisode.episode,
        limit: '5',                 
        imdbid: show.id,           

    }).then(subtitles => {
        const embed = Util.Embed(`Subtitles for: ${show.title} ${seasonAndEpisode.season}x${seasonAndEpisode.episode}`, {description: 'Here are the 5 best results from opensubtitles.org:'}, message.member);

        for (let sub of Object.values(subtitles)[0]) {
            embed.addField(sub.filename, `**[Download SRT](${sub.url} '${sub.url}')** Lang: \`${sub.lang}\` Score: \`${sub.score}\``);
        }
        
        message.channel.send(embed);
    }).catch(async err => {
        Util.log('An error occurred while trying to fetch subtitles: ' + err);
        return message.channel.send(Util.Embed('There were no results for this episode on opensubtitles.org!', {description: 'Try another episode or another language code!'}, message.member));
    });
}

export const help = {
    name: ['subs', 'subtitles'],
    type: 'general',
    help_text: 'subs <lang> <show> <NxNN/SNNENN> ~ N -> number',
    help_desc: 'Searches opensubtitles.org for the specified episode',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};