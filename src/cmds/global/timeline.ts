import gideonapi from 'gideon-api';
import { CommandInteraction, MessageEmbed } from 'discord.js';
import type { Command } from 'src/@types/Util.js';

export async function run(interaction: CommandInteraction): Promise<void> {
	const timeline = await gideonapi.timeline();
	return interaction.reply({
		embeds: [
			new MessageEmbed()
				.setTitle('Timeline change detected!')
				.setDescription(timeline as string)
				.setImage('https://i.imgur.com/qWN3luc.gif')
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
	name: 'timeline',
	description: 'Scans for changes in the timeline',
	defaultPermission: true
};
