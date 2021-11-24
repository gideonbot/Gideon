import type { Interaction } from 'discord.js';
import { Autocomplete, SlashCommands } from 'src/handlers/Interactions';
import { Listener } from '@sapphire/framework';

export class InteractionListener extends Listener {
	public async run(interaction: Interaction): Promise<void> {
		if (interaction.isCommand()) {
			if (!interaction.guild) return interaction.reply({ content: 'DM commands are not supported!', ephemeral: true });
			await SlashCommands(interaction.client, interaction);
		} else if (interaction.isButton()) await interaction.deferUpdate();
		else if (interaction.isAutocomplete()) await Autocomplete(interaction.client, interaction);
	}
}
