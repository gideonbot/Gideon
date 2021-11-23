import { CommandInteraction, MessageEmbed } from 'discord.js';
import type { Command } from 'src/@types/Util.js';

export async function run(interaction: CommandInteraction): Promise<void> {
	const leaderboard = new MessageEmbed().setTitle('Top 10 Leaderboard:');

	const top10 = interaction.client.getTop10.all().filter((x) => x.points > 0);

	if (top10.length < 1) leaderboard.setDescription('No entries yet!');
	else {
		leaderboard.setDescription(
			top10
				.map((data, i) => {
					const guild = interaction.client.guilds.cache.get(data.guild);
					const user = guild?.members?.cache?.get?.(data.user) ?? data.user;
					return `**#${i + 1}** - ${user} in \`${guild ? guild.name : 'Unknown'}\`: **${data.points}** ${
						// eslint-disable-next-line no-negated-condition
						data.points !== 1 ? 'points' : 'point'
					}`;
				})
				.join('\n')
		);
	}

	return interaction.reply({ embeds: [leaderboard] });
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
