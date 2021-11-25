import type { Interaction } from 'discord.js';
import { Autocomplete, SlashCommands } from '#utils/Interactions';
import { Listener } from '@sapphire/framework';

export class InteractionListener extends Listener {
	public async run(interaction: Interaction): Promise<void> {
		if (interaction.isCommand()) {
			if (!interaction.guild) return interaction.reply({ content: 'DM commands are not supported!', ephemeral: true });
			await SlashCommands(this.container.client, interaction);
		} else if (interaction.isButton()) await interaction.deferUpdate();
		else if (interaction.isAutocomplete()) await Autocomplete(this.container.client, interaction);
	}
}
