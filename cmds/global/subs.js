import OpenSubtitles from 'opensubtitles-api';
import Util from '../../Util.js';

/**
 * @param {Discord.Interaction} interaction
 * @param {object[]} args
 */
export async function run(interaction, args) {
    if (!process.env.OPS_UA || !process.env.OPS_USER || !process.env.OPS_PASS) {
        Util.log('Missing env variables for subs command!');
        return interaction.reply(Util.Embed('This command is currently not available', null, interaction.member));
    }

    const OS = new OpenSubtitles({
        useragent: process.env.OPS_UA,
        username: process.env.OPS_USER,
        password: process.env.OPS_PASS,
        ssl: true
    });

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

    if (args[0].options[0].value === 'show_fl') show = shows[0];
    else if (args[0].options[0].value === 'show_ar') show = shows[1];
    else if (args[0].options[0].value === 'show_sg') show = shows[2];
    else if (args[0].options[0].value === 'show_lot') show = shows[3];
    else if (args[0].options[0].value === 'show_co') show = shows[4];
    else if (args[0].options[0].value === 'show_bw') show = shows[5];
    else if (args[0].options[0].value === 'show_bl') show = shows[6];
    else if (args[0].options[0].value === 'show_kr') show = shows[8];
    else if (args[0].options[0].value === 'show_lu') show = shows[9];
    else if (args[0].options[0].value === 'show_sl') show = shows[10];
    else if (args[0].options[0].value === 'show_stg') show = shows[11];
    else if (args[0].options[0].value === 'show_dp') show = shows[12];
    else if (args[0].options[0].value === 'show_t') show = shows[13];
    else if (args[0].options[0].value === 'show_sv') show = shows[14];
    else if (args[0].options[0].value === 'show_tb') show = shows[15];
    
    OS.search({
        sublanguageid: args[0].options[1].value,       
        season: args[0].options[2].value,
        episode: args[0].options[3].value,
        limit: '5',                 
        imdbid: show.id,           

    }).then(subtitles => {
        const embed = Util.Embed(`Subtitles for: ${show.title} S${args[0].options[2].value}E${args[0].options[3].value}`, {description: 'Here are the 5 best results from opensubtitles.org:'}, interaction.member);

        for (let sub of Object.values(subtitles)[0]) {
            embed.addField(sub.filename, `**[Download SRT](${sub.url} '${sub.url}')** Lang: \`${sub.lang}\` Score: \`${sub.score}\``);
        }
        
        interaction.reply(embed);
    }).catch(async err => {
        Util.log('An error occurred while trying to fetch subtitles: ' + err);
        return interaction.reply(Util.Embed('There were no results for this episode on opensubtitles.org!', {description: 'Try another episode or another language code!'}, interaction.member));
    });
}

export let help = {
    id: '788791573802385438',
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};