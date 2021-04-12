import { CommandInteraction, CommandInteractionOption } from 'discord.js';
import { Command } from 'src/@types/Util';

/**
 * @param {Discord.CommandInteraction} interaction
 * @param {CommandInteractionOption[]} options
 */
export async function run(interaction: CommandInteraction, options: CommandInteractionOption[]): Promise<void> { 
    const flashopening = 'https://cdn.discordapp.com/attachments/595934699285905409/674586782494621696/YouCut_20200205_130726276.mp4';
    const lotopening = 'https://cdn.discordapp.com/attachments/595934804378386442/674611602577817621/YouCut_20200205_144514668.mp4';
    const luciferopening = 'https://cdn.discordapp.com/attachments/679864620864765983/705423144361656370/lucifer.mp4';
    
    if (options[0].value === 'flash') return interaction.reply(flashopening);
    else if (options[0].value === 'legends') return interaction.reply(lotopening);
    else if (options[0].value === 'lucifer') return interaction.reply(luciferopening);
}

export const info: Command['info'] = {
    name: 'openings',
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};