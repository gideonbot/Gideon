import Util from '../../Util.js';

/**
 * @param {Discord.Interaction} interaction
 * @param {string[]} args
 */
export async function run(interaction, args) {
    const url = 'https://arrowverse.info';
    const api = 'https://arrowverse.info/api';
    let showtitle;
    let thimg;
    
    if (args[0].value === 'show_fl') showtitle = 'The Flash';
    else if (args[0].value === 'show_ar') showtitle = 'Arrow';
    else if (args[0].value === 'show_sg') showtitle = 'Supergirl';
    else if (args[0].value === 'show_lot') showtitle = 'DC\'s Legends of Tomorrow';
    else if (args[0].value === 'show_cn') showtitle = 'Constantine';
    else if (args[0].value === 'show_bw') showtitle = 'Batwoman';

    const body = await Util.fetchJSON(api);

    let fiep = { season: args[1].value,
        episode: args[2].value 
    };
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
    
        const embed = Util.Embed(`Next episode for ${interaction.member.user.tag}:`, {
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
        }, interaction.member);

        return embed;
    };

    let embed = GetNextEmbed(showtitle, fiep);

    interaction.reply(embed);
}

export const help = {
    id: '787022238611669003',
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: ['MANAGE_MESSAGES']
};
