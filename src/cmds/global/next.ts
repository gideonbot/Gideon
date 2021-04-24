import Util from '../../Util.js';
import { CommandInteraction, CommandInteractionOption, GuildMember, Permissions } from 'discord.js';
import { Command } from 'src/@types/Util.js';
import gideonapi from 'gideon-api';

export async function run(interaction: CommandInteraction, options: CommandInteractionOption[]): Promise<void> {
    const url = 'https://arrowverse.info';
    let thimg: string;

    const _shows: Record<string, string> = {
        show_fl: 'The Flash',
        show_ar: 'Arrow',
        show_sg: 'Supergirl',
        show_lot: 'DC\'s Legends of Tomorrow',
        show_co: 'Constantine',
        show_bw: 'Batwoman'
    };

    const showtitle = _shows[options[0].value as string];

    const body = await gideonapi.avi();
    const fiep = 'S' + Util.normalize(options[1].value as number) + 'E' + Util.normalize(options[2].value as number);
    const shows = body.filter(x => x.series !== 'Vixen' && x.series !== 'Freedom Fighters: The Ray');

    const GetNextEmbed = (show: string, season_and_episode: string) => {
        const f = shows.find(x => x.series === show && x.episode_id === season_and_episode);
        if (!f) return `${show} ${season_and_episode} is not a valid episode!`;

        const next = shows[shows.indexOf(f) + 1];
        if (!next) return 'Couldn\'t find that episode. Try again.';
    
        const nxep = `${next.series} ${next.episode_id} - ${next.episode_name}`;
        const nxepard = `Airdate: ${next.air_date}`;
    
        if (next.series.match(/(?:flash)/i)) thimg = 'https://i.ytimg.com/vi/ghPatoChvV0/maxresdefault.jpg';
        else if (next.series.match(/(?:arrow)/i)) thimg = 'http://www.greenarrowtv.com/wp-content/uploads/2017/10/Screen-Shot-2017-10-19-at-6.50.41-PM.jpg';
        else if (next.series.match(/(?:supergirl)/i)) thimg = 'https://i0.wp.com/thegameofnerds.com/wp-content/uploads/2018/01/supergirl-title-card1.png?resize=560%2C315&ssl=1';
        else if (next.series.match(/(?:legends)/i)) thimg = 'https://i.imgur.com/FLqwOYv.png';
        else if (next.series.match(/(?:constantine)/i)) thimg = 'https://upload.wikimedia.org/wikipedia/en/b/b1/Constantine_TV_show_logo.jpg';
        else if (next.series.match(/(?:batwoman)/i)) thimg = 'https://upload.wikimedia.org/wikipedia/en/c/c3/Batwoman_TV_series_logo.png';
    
        const embed = Util.Embed(`Next episode for ${interaction.user.tag}:`, {
            thumbnail: thimg,
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
        }, interaction.member as GuildMember);

        return embed;
    };

    const embed = GetNextEmbed(showtitle, fiep);
    interaction.reply(embed);
}

export const info: Command['info'] = {
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: [Permissions.FLAGS.MANAGE_MESSAGES]
};

export const data: Command['data'] = {
    name: 'next',
    description: 'Get next episode in watching order',
    defaultPermission: true,
    options: [
        {
            type: 'STRING',
            name: 'show',
            description: 'The Arrowverse show',
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
                    name: 'Batwoman',
                    value: 'show_bw'
                },
                {
                    name: 'Constantine',
                    value: 'show_co'
                }
            ]
        },
        {
            type: 'INTEGER',
            name: 'season',
            description: 'Your current season',
            required: true
        },
        {
            type: 'INTEGER',
            name: 'episode',
            description: 'Your current episode',
            required: true
        }
    ]
};