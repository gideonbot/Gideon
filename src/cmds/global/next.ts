
import Util from '../../Util.js';
import { CommandInteraction, CommandInteractionOption, GuildMember } from 'discord.js';
import { Command } from 'src/@types/Util.js';

/**
 * @param {Discord.CommandInteraction} interaction
 * @param {CommandInteractionOption[]} args
 */
export async function run(interaction: CommandInteraction, args: CommandInteractionOption[]): Promise<void> {
    const url = 'https://arrowverse.info';
    const api = 'https://arrowverse.info/api';
    let showtitle: string;
    let thimg: string;
    
    if (args[0].value === 'show_fl') showtitle = 'The Flash';
    else if (args[0].value === 'show_ar') showtitle = 'Arrow';
    else if (args[0].value === 'show_sg') showtitle = 'Supergirl';
    else if (args[0].value === 'show_lot') showtitle = 'DC\'s Legends of Tomorrow';
    else if (args[0].value === 'show_co') showtitle = 'Constantine';
    else if (args[0].value === 'show_bw') showtitle = 'Batwoman';

    const body = await Util.fetchJSON(api) as any;

    let fiep: any = { season: args[1].value,
        episode: args[2].value 
    };
    fiep = 'S' + Util.normalize(fiep.season as number) + 'E' + Util.normalize(fiep.episode as number);

    let shows = body.filter(x => x.series !== 'Vixen' && x.series !== 'Freedom Fighters: The Ray');

    /**
     * @param {string} show 
     * @param {*} season_and_episode 
     */
    let GetNextEmbed = (show: string, season_and_episode) => {
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

    //@ts-ignore
    let embed = GetNextEmbed(showtitle, fiep);

    interaction.reply(embed);
}

export let help: Command['help'] = {
    id: '787022238611669003',
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: ['MANAGE_MESSAGES']
};
