import type { SapphireClient } from '@sapphire/framework';
import { CommandInteraction, MessageEmbed } from 'discord.js';
import type { Command } from 'src/@types/Util.js';
import { log } from 'src/Util';

export async function run(interaction: CommandInteraction, gideon: SapphireClient): Promise<void> {
	const embed = new MessageEmbed().setTitle('__Upcoming Arrowverse episodes:__');

	// eslint-disable-next-line guard-for-in
	for (const show in gideon.dc_show_urls) {
		try {
			const ep_info = gideon.cache.dceps.get(show);
			if (!ep_info) {
				log(`No ep_info for ${show} when calling dceps!`);
				continue;
			}

			embed.addField(`${ep_info.series_name} ${ep_info.embed.name}`, `${ep_info.embed.value()}`);
		} catch (ex) {
			log(`Error while fetching next episode for "${show}": ${ex}`);
		}
	}

	if (embed.fields.length < 1) return interaction.reply('Failed to fetch episode list, please try again later...');

	return interaction.reply({ embeds: [embed] });
}

export const info: Command['info'] = {
	owner: false,
	nsfw: false,
	roles: [],
	user_perms: [],
	bot_perms: []
};

export const data: Command['data'] = {
	name: 'dceps',
	description: 'Upcoming DC episodes',
	defaultPermission: true
};
