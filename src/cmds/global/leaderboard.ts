import { CommandInteraction, GuildMember } from 'discord.js';
import { Command } from 'src/@types/Util.js';
import Util from '../../Util.js';

export async function run(interaction: CommandInteraction): Promise<void> {
    const leaderboard = Util.Embed('Top 10 Leaderboard:', undefined, interaction.member as GuildMember);

    const top10 = process.gideon.getTop10.all().filter(x => x.points > 0);

    if (top10.length < 1) leaderboard.setDescription('No entries yet!');

    else {
        leaderboard.setDescription(top10.map((data, i) => {
            const guild = process.gideon.guilds.cache.get(data.guild);
            const user = guild?.members?.cache?.get?.(data.user) ?? data.user;
            return '**#' + (i + 1) + '** - ' + user + ' in `' + (guild ? guild.name : 'Unknown') + '`: **' + data.points + '** ' + (data.points != 1 ? 'point' + 's' : 'point');
        }).join('\n'));
    }

    return interaction.reply(leaderboard);
}

export const info: Command['info'] = {
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};

export const data: Command['data'] = {
    name: 'leaderboard',
    description: 'Top 10 leaderboard',
    defaultPermission: true
};