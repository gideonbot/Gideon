import Util from '../../Util.js';
import { Interaction } from 'discord.js'

export default {
    name: 'interaction',
    async run(interaction: Interaction): Promise<void> {
        if (!interaction.isCommand()) return
        Util.Interactions.Handle(interaction, Util);
    }
};