import { Interaction } from 'discord.js';
import { Autocomplete, SlashCommands } from 'src/handlers/Interactions';

export default {
    name: 'interactionCreate',
    async run(interaction: Interaction): Promise<void> {
        if (interaction.isCommand()) {
            if (!interaction.guild) return interaction.reply({ content: 'DM commands are not supported!', ephemeral: true });
            SlashCommands(interaction.client, interaction);
        }
        else if (interaction.isButton()) await interaction.deferUpdate();
        else if (interaction.isAutocomplete()) Autocomplete(interaction.client, interaction);
    }
};