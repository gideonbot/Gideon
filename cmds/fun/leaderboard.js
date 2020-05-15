import Discord from 'discord.js';
import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 */
export async function run(message) {
    let leaderboard = Util.CreateEmbed('Top 10 Leaderboard:', null, message.member);

    let top10 = process.gideon.getTop10.all().filter(x => x.points > 0);

    if (top10.length < 1) leaderboard.setDescription('No entries yet!');

    else {
        leaderboard.setDescription(top10.map((data, i) => {
            let guild = process.gideon.guilds.cache.get(data.guild);
            let user = guild && guild.members.cache.get(data.user) ? guild.members.cache.get(data.user).user.tag : data.user;
            return '**#' + (i + 1) + '** - ' + user + ' in `' + (guild ? guild.name : 'Unknown') + '`: **' + data.points + '** ' + (data.points != 1 ? 'point' + 's' : 'point');
        }).join('\n'));
    }

    return message.channel.send(leaderboard);
}

export const help = {
    name: ['leaderboard', 'lb', 'highscores'],
    type: 'fun',
    help_text: 'leaderboard',
    help_desc: 'View the highscore leaderboard',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};