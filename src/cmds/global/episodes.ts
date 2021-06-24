import Util from '../../Util.js';
import moment from 'moment';
import { CommandInteraction, CommandInteractionOption, GuildMember } from 'discord.js';
import { Command, SeEp, Show, TVMazeResponse } from 'src/@types/Util.js';

export async function run(interaction: CommandInteraction, options: CommandInteractionOption[]): Promise<unknown> {
    if (interaction.user.guessing) return interaction.editReply('No cheating while your guessing game is active!');
    interaction.defer();
    
    const info: SeEp = {
        season: interaction.options.first()?.options?.get('season')?.value as number,
        episode: interaction.options.first()?.options?.get('episode')?.value as number
    };

    const shows: Record<string, Show> = {
        show_fl: {
            id: '13',
            title: 'The Flash',
            channel: 'The CW'
        },
        show_ar: {
            id: '4',
            title: 'Arrow',
            channel: 'The CW'
        },
        show_sg: {
            id: '1850',
            title: 'Supergirl',
            channel: info.season == 1 ? 'CBS' : 'The CW'
        },
        show_lot: {
            id: '1851',
            title: 'DC\'s Legends of Tomorrow',
            channel: 'The CW'
        },
        show_co: {
            id: '15',
            title: 'Constantine',
            channel: 'NBC'
        },
        show_bw: {
            id: '37776',
            title: 'Batwoman',
            channel: 'The CW'
        },
        show_bl: {
            id: '20683',
            title: 'Black Lightning',
            channel: 'The CW'
        },
        show_gac: {
            id: '44496',
            title: 'Green Arrow and the Canaries',
            channel: 'The CW'
        },
        show_kr: {
            id: '3082',
            title: 'Krypton',
            channel: 'Syfy'
        },
        show_lu: {
            id: '1859',
            title: 'Lucifer',
            channel: info.season == 1 || info.season == 2 || info.season == 3 ? 'Fox' : 'Netflix'
        },
        show_sl: {
            id: '44751',
            title: 'Superman & Lois',
            channel: 'The CW'
        },
        show_stg: {
            id: '37809',
            title: 'Stargirl',
            channel: 'DC Universe/The CW'
        },
        show_dp: {
            id: '36745',
            title: 'Doom Patrol',
            channel: 'DC Universe'
        },
        show_t: {
            id: '27557',
            title: 'Titans',
            channel: 'DC Universe'
        },
        show_sv: {
            id: '435',
            title: 'Smallville',
            channel: 'The CW'
        },
        show_tb: {
            id: '15299',
            title: 'The Boys',
            channel: 'Amazon Prime Video'
        }
    };

    const show = shows[interaction.options.first()?.options?.first()?.value as string];

    const api = `http://api.tvmaze.com/shows/${show?.id}/episodebynumber?season=${info.season}&number=${info.episode}`;

    const body = await Util.fetchJSON(api) as TVMazeResponse;

    if (body.status === 404) return interaction.editReply({embeds: [Util.Embed('There was no data for this episode!', undefined, interaction.member as GuildMember)]});
    
    let sp = '';
    const today = new Date();
    const airdate = new Date(body.airdate);
    if (!moment(airdate).isValid()) sp = '||';
    if (today < airdate) sp = '||';
    const airtime = body.airtime;
    const desc = !body.summary ? 'No summary available' : body.summary.replace('<p>', '').replace('</p>', '');
    let img;
    if (body.image == null) img = '';
    else img = body.image.original;        
        

    let timeString = airtime;
    const H = Number(timeString.split(':')[0]);
    const h = H % 12 || 12;
    const am_pm = (H < 12 || H === 24) ? ' AM' : ' PM';
    timeString = h + ':' + timeString.split(':')[1] + am_pm;

    return interaction.editReply({embeds: [Util.Embed(`${show?.title} ${body.season}x${Util.normalize(body.number)} - ${body.name}`, {
        description: sp + desc + sp + `\n\nAirdate: \`${moment(airdate).isValid() ? airdate.toDateString() : 'No Airdate Available'}\`\nAirtime: \`${body.airtime === '' ? 'No Airtime Available' : timeString + ' ET'}\`\nRuntime: \`${body.runtime} Minutes\`\nChannel: \`${show?.channel}\`\n\n**[Full recap & trailer](${body.url} '${body.url}')**`,
        image: img
    }, interaction.member as GuildMember)]});
}

export const info: Command['info'] = {
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};

export const data: Command['data'] = {
    name: 'episode',
    description: 'Get episode info',
    defaultPermission: true,
    options: [
        {
            type: 'SUB_COMMAND',
            name: 'cwtv',
            description: 'Get CWTV episode info',
            options: [
                {
                    type: 'STRING',
                    name: 'show',
                    description: 'The CW show',
                    required: true,
                    choices: [
                        {
                            name: 'The Flash',
                            value: 'show_fl'
                        },
                        {
                            name: 'Arrow',
                            value: 'show_ar'
                        },
                        {
                            name: 'Supergirl',
                            value: 'show_sg'
                        },
                        {
                            name: 'DC\'s Legends of Tomorrow',
                            value: 'show_lot'
                        },
                        {
                            name: 'Superman & Lois',
                            value: 'show_sl'
                        },
                        {
                            name: 'Stargirl',
                            value: 'show_stg'
                        },
                        {
                            name: 'Batwoman',
                            value: 'show_bw'
                        },
                        {
                            name: 'Black Lightning',
                            value: 'show_bl'
                        }
                    ]
                },
                {
                    type: 'INTEGER',
                    name: 'season',
                    description: 'The show\'s season',
                    required: true
                },
                {
                    type: 'INTEGER',
                    name: 'episode',
                    description: 'The season\'s episode',
                    required: true
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'dctv',
            description: 'Get DCTV episode info',
            options: [
                {
                    type: 'STRING',
                    name: 'show',
                    description: 'The DC show',
                    required: true,
                    choices: [
                        {
                            name: 'Krypton',
                            value: 'show_kr'
                        },
                        {
                            name: 'Lucifer',
                            value: 'show_lu'
                        },
                        {
                            name: 'Doom Patrol',
                            value: 'show_dp'
                        },
                        {
                            name: 'Constantine',
                            value: 'show_co'
                        },
                        {
                            name: 'The Boys',
                            value: 'show_tb'
                        },
                        {
                            name: 'Titans',
                            value: 'show_t'
                        },
                        {
                            name: 'Smallville',
                            value: 'show_sv'
                        }
                    ]
                },
                {
                    type: 'INTEGER',
                    name: 'season',
                    description: 'The show\'s season',
                    required: true
                },
                {
                    type: 'INTEGER',
                    name: 'episode',
                    description: 'The season\'s episode',
                    required: true
                }
            ]
        }
    ]
};