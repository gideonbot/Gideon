import gideonapi from 'gideon-api';
import { CommandInteraction, MessageComponentInteraction, Message, MessageButton, MessageActionRow } from 'discord.js';
import type { Command } from 'src/@types/Util.js';

export async function run(interaction: CommandInteraction): Promise<void> {
	let quote = await gideonapi.quote();
	const button = new MessageButton().setStyle('PRIMARY').setLabel('Another one!').setCustomId('next');
	await interaction.reply({
		// @ts-ignore some type fuckery, who knows
		embeds: [{ description: `**_${quote.quote}_**\n\n** ~${quote.quotee}**`, thumbnail: quote.image }],
		components: [new MessageActionRow().addComponents(button)]
	});
	const filter = (i: MessageComponentInteraction) => i.user.id === interaction.user.id;
	const message = (await interaction.fetchReply()) as Message;
	const collector = message.createMessageComponentCollector({ filter, time: 840000 });

	collector.on('collect', async (i) => {
		if (i.customId === 'next') {
			quote = await gideonapi.quote();
			await interaction.editReply({
				embeds: [
					// @ts-ignore some type fuckery, who knows
					{ description: `**_${quote.quote}_**\n\n** ~${quote.quotee}**`, thumbnail: quote.image }
				],
				components: [new MessageActionRow().addComponents(button)]
			});
		}
	});

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	collector.on('end', async () =>
		interaction.editReply({
			// @ts-ignore some type fuckery, who knows
			embeds: [{ description: `**_${quote.quote}_**\n\n** ~${quote.quotee}**`, thumbnail: quote.image }],
			components: []
		})
	);
}

export const info: Command['info'] = {
	owner: false,
	nsfw: false,
	roles: [],
	user_perms: [],
	bot_perms: []
};

export const data: Command['data'] = {
	name: 'quote',
	description: 'Fetches a random Arrowverse quote',
	defaultPermission: true
};
