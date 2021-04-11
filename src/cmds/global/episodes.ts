import Util from '../../Util.js';
import moment from 'moment';
import { CommandInteraction, CommandInteractionOption, GuildMember } from 'discord.js';
import { Command } from 'src/@types/Util.js';

/**
 * @param {Discord.CommandInteraction} interaction
 * @param {CommandInteractionOption[]} args
 */
export async function run(interaction: CommandInteraction, args: CommandInteractionOption[]): Promise<void> {
    if (interaction.user.guessing) return interaction.reply('No cheating while your guessing game is active!');

    //@ts-ignore
    let info = { season: args[0].options[1].value,
        //@ts-ignore
        episode: args[0].options[2].value 
    };

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
        },
        {
            id: '36745',
            title: 'Doom Patrol',
            channel: 'DC Universe'
        },
        {
            id: '27557',
            title: 'Titans',
            channel: 'DC Universe'
        },
        {
            id: '435',
            title: 'Smallville',
            channel: 'The CW'
        },
        {
            id: '15299',
            title: 'The Boys',
            channel: 'Amazon Prime Video'
        }
    ];

    let show;
    
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

    const api = `http://api.tvmaze.com/shows/${show?.id}/episodebynumber?season=${info.season}&number=${info.episode}`;

    const body = await Util.fetchJSON(api);

    if (body.status === 404) return interaction.reply(Util.Embed('There was no data for this episode!', undefined, interaction.member as GuildMember));
    
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

    return interaction.reply(Util.Embed(`${show.title} ${body.season}x${Util.normalize(body.number)} - ${body.name}`, {
        description: sp + desc + sp + `\n\nAirdate: \`${moment(airdate).isValid() ? airdate.toDateString() : 'No Airdate Available'}\`\nAirtime: \`${body.airtime === '' ? 'No Airtime Available' : timeString + ' ET'}\`\nRuntime: \`${body.runtime} Minutes\`\nChannel: \`${show.channel}\`\n\n**[Full recap & trailer](${body.url} '${body.url}')**`,
        image: img
    }, interaction.member as GuildMember));
}
export const help: Command['help'] = {
    id: '787001899643305985',
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};