import type { CommandInteraction, GuildMember } from 'discord.js';
import type { Command } from 'src/@types/Util.js';

export async function run(interaction: CommandInteraction): Promise<void> {
	return interaction.reply({
		embeds: [
			Util.Embed(
				'Enter Flashtime!',
				{ description: Util.secondsToDifferenceString((interaction.client.uptime as number) / 1000, { enableSeconds: true }) },
				interaction.member as GuildMember
			)
		]
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
	name: 'uptime',
	description: "Gideon's uptime",
	defaultPermission: true
};
