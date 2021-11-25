import { CommandInteraction, MessageEmbed } from 'discord.js';
import type { Command } from '#types/Util.js';

export async function run(interaction: CommandInteraction): Promise<void> {
	return interaction.reply({
		embeds: [new MessageEmbed().setTitle('Enter Flashtime!').setDescription(`<t:${(interaction.client.uptime as number) / 1000}:R>`)]
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
