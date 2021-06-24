import OpenSubtitles from 'opensubtitles-api';
import Util from '../../Util.js';
import { CommandInteraction, GuildMember } from 'discord.js';
import { Command } from 'src/@types/Util.js';

export async function run(interaction: CommandInteraction): Promise<unknown> {
    await interaction.defer();  
  
    if (!process.env.OPS_UA || !process.env.OPS_USER || !process.env.OPS_PASS) {
        Util.log('Missing env variables for subs command!');
        return interaction.editReply({embeds: [Util.Embed('This command is currently not available', undefined, interaction.member as GuildMember)]});
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

    if (interaction.options.first()?.options?.get('show_fl')?.value) show = shows[0];
    else if (interaction.options.first()?.options?.get('show_ar')?.value) show = shows[1];
    else if (interaction.options.first()?.options?.get('show_sg')?.value) show = shows[2];
    else if (interaction.options.first()?.options?.get('show_lot')?.value) show = shows[3];
    else if (interaction.options.first()?.options?.get('show_co')?.value) show = shows[4];
    else if (interaction.options.first()?.options?.get('show_bw')?.value) show = shows[5];
    else if (interaction.options.first()?.options?.get('show_bl')?.value) show = shows[6];
    else if (interaction.options.first()?.options?.get('show_kr')?.value) show = shows[8];
    else if (interaction.options.first()?.options?.get('show_lu')?.value) show = shows[9];
    else if (interaction.options.first()?.options?.get('show_sl')?.value) show = shows[10];
    else if (interaction.options.first()?.options?.get('show_stg')?.value) show = shows[11];
    else if (interaction.options.first()?.options?.get('show_dp')?.value) show = shows[12];
    else if (interaction.options.first()?.options?.get('show_t')?.value) show = shows[13];
    else if (interaction.options.first()?.options?.get('show_sv')?.value) show = shows[14];
    else if (interaction.options.first()?.options?.get('show_tb')?.value) show = shows[15];
    
    OS.search({
        sublanguageid: interaction.options.first()?.options?.get('lang')?.value as string,       
        season: interaction.options.first()?.options?.get('season')?.value as number,
        episode: interaction.options.first()?.options?.get('episode')?.value as number,
        limit: '5',                 
        imdbid: show.id,           

    }).then(subtitles => {
        const embed = Util.Embed(`Subtitles for: ${show.title} ${interaction.options.first()?.options?.get('season')?.value}x${Util.normalize(interaction.options.first()?.options?.get('episode')?.value as number)}`, {description: 'Here are the 5 best results from opensubtitles.org:'}, interaction.member as GuildMember);

        for (const sub of Object.values(subtitles)[0]) {
            embed.addField(sub.filename, `**[Download SRT](${sub.url} '${sub.url}')** Lang: \`${sub.lang}\` Score: \`${sub.score}\``);
        }
        
        interaction.editReply({embeds: [embed]});
    }).catch(async (err: Error) => {
        Util.log('An error occurred while trying to fetch subtitles: ' + err);
        return interaction.editReply('There were no results for this episode on opensubtitles.org!\nTry another episode or another language !');
    });
}

export const info: Command['info'] = {
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};

export const data: Command['data'] = {
    name: 'subs',
    description: 'Fetch episode subtitles',
    defaultPermission: true,
    options: [
        {
            type: 'SUB_COMMAND',
            name: 'cwtv',
            description: 'Get CWTV subtitles',
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
                    type: 'STRING',
                    name: 'lang',
                    description: 'The subtitles language',
                    required: true,
                    choices: [
                        {
                            name: 'English',
                            value: 'eng'
                        },
                        {
                            name: 'Spanish',
                            value: 'spa'
                        },
                        {
                            name: 'German',
                            value: 'deu'
                        },
                        {
                            name: 'Portuguese',
                            value: 'por'
                        },
                        {
                            name: 'Japanese',
                            value: 'jpn'
                        },
                        {
                            name: 'Chinese',
                            value: 'zho'
                        },
                        {
                            name: 'Russian',
                            value: 'rus'
                        },
                        {
                            name: 'Hindi',
                            value: 'hin'
                        },
                        {
                            name: 'Arabic',
                            value: 'ara'
                        },
                        {
                            name: 'French',
                            value: 'fra'
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
            description: 'Get DCTV subtitles',
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
                    type: 'STRING',
                    name: 'lang',
                    description: 'The subtitles language',
                    required: true,
                    choices: [
                        {
                            name: 'English',
                            value: 'eng'
                        },
                        {
                            name: 'Spanish',
                            value: 'spa'
                        },
                        {
                            name: 'German',
                            value: 'deu'
                        },
                        {
                            name: 'Portuguese',
                            value: 'por'
                        },
                        {
                            name: 'Japanese',
                            value: 'jpn'
                        },
                        {
                            name: 'Chinese',
                            value: 'zho'
                        },
                        {
                            name: 'Russian',
                            value: 'rus'
                        },
                        {
                            name: 'Hindi',
                            value: 'hin'
                        },
                        {
                            name: 'Arabic',
                            value: 'ara'
                        },
                        {
                            name: 'French',
                            value: 'fra'
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