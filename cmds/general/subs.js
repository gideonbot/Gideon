const Discord = require("discord.js");
const OpenSubtitles = require('opensubtitles-api');
const Util = require("../../Util");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message, args) => {
    if (!process.env.OPS_UA || !process.env.OPS_USER || !process.env.OPS_PASS) {
        Util.log("Missing env variables for subs command!");
        console.log("Missing env variables for subs command!");
        return message.channel.send(Util.CreateEmbed('This command is currently not available'));
    }

    const OS = new OpenSubtitles({
        useragent: process.env.OPS_UA,
        username: process.env.OPS_USER,
        password: process.env.OPS_PASS,
        ssl: true
    });

    if (!args[0]) return message.channel.send(Util.CreateEmbed('You must supply a lang code, the shows name, season and its episode number!', {
        description: `You can find ISO 639-2 codes [here](https://en.wikipedia.org/wiki/List_of_ISO_639-2_codes 'https://en.wikipedia.org/wiki/List_of_ISO_639-2_codes')!`
    }));

    if (args[0].length !== 3) return message.channel.send(Util.CreateEmbed('You must supply a valid ISO 639-2 code!', {
        description: `[ISO 639-2 codes](https://en.wikipedia.org/wiki/List_of_ISO_639-2_codes 'https://en.wikipedia.org/wiki/List_of_ISO_639-2_codes')`
    }));

    let seasonAndEpisode = Util.parseSeriesEpisodeString(args[2]);
    if (!seasonAndEpisode) return message.channel.send(Util.CreateEmbed('You must supply a valid episode and season!', {description: 'Acceptable formats: S00E00 and 00x00'}));

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
        }
    ]

    let show = shows[-1];
    let agc = args[1];

    const ia = Util.CreateEmbed(`"${agc}" is not a valid argument!`, {
        description: 'Available shows:\n**flash**\n**arrow**\n**supergirl**\n**legends**\n**constantine**\n**batwoman**\n**blacklightning**\n**canaries**\n**krypton**\n**lucifer**\n**supesnlois**\n**stargirl**'
    });

    if (agc.match(/(?:flash)/i)) show = shows[0];
    else if (agc.match(/(?:arrow)/i)) show = shows[1];
    else if (agc.match(/(?:supergirl)/i)) show = shows[2];
    else if (agc.match(/(?:legends)/i)) show = shows[3];
    else if (agc.match(/(?:constantine)/i)) show = shows[4];
    else if (agc.match(/(?:batwoman)/i)) show = shows[5];
    else if (agc.match(/(?:blacklightning)/i)) show = shows[6];
    //else if (agc.match(/(?:canaries)/i)) show = shows[7];
    else if (agc.match(/(?:krypton)/i)) show = shows[8];
    else if (agc.match(/(?:lucifer)/i)) show = shows[9];
    //else if (agc.match(/(?:supesnlois)/i)) show = shows[10];
    //else if (agc.match(/(?:stargirl)/i)) show = shows[11];
    else return message.channel.send(ia);
    
    if (!show) return message.channel.send(ia);

    OS.search({
        sublanguageid: args[0],       
        season: seasonAndEpisode.season,
        episode: seasonAndEpisode.episode,
        limit: '5',                 
        imdbid: show.id,           

    }).then(subtitles => {
        const embed = Util.CreateEmbed(`Subtitles for: ${show.title} ${seasonAndEpisode.season}x${seasonAndEpisode.episode}`, {description: `Here are the 5 best results from opensubtitles.org:`});

        for (let sub of Object.values(subtitles)[0]) {
            embed.addField(sub.filename, `**[Download SRT](${sub.url} '${sub.url}')** Lang: \`${sub.lang}\` Score: \`${sub.score}\``)
        }
        
        message.channel.send(embed);
    }).catch(async err => {
        console.log("An error occurred while trying to fetch subtitles: " + err);
        Util.log("An error occurred while trying to fetch subtitles: " + err);
        return message.channel.send(Util.CreateEmbed('There were no results for this episode on opensubtitles.org!', {description: 'Try another episode or another language code!'}));
    });
}

module.exports.help = {
    name: ["subs", "subtitles"],
    type: "general",
    help_text: "subs <lang> <show> <NxNN/SNNENN> ~ N -> number",
    help_desc: "Searches opensubtitles.org for the specified episode",
    owner: false,
    voice: false,
    timevault: false,
    roles: [],
    user_perms: [],
    bot_perms: []
}