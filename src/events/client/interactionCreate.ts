import Util from '../../Util.js';
import { Interaction } from 'discord.js';

export default {
    name: 'interactionCreate',
    async run(interaction: Interaction): Promise<void> {
        if (interaction.isCommand()) {
            if (!interaction.guild) return interaction.reply({ content: 'DM commands are not supported!', ephemeral: true });
            Util.Interactions.SlashCommands(interaction);
        }
        else if (interaction.isButton()) await interaction.deferUpdate();
        else if (interaction.isAutocomplete()) Util.Interactions.Autocomplete(interaction);
    }
};