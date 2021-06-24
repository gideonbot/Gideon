import { CommandInteraction } from 'discord.js';
import { Command } from 'src/@types/Util';

export async function run(interaction: CommandInteraction): Promise<void> { 
    const flashopening = 'https://cdn.discordapp.com/attachments/595934699285905409/674586782494621696/YouCut_20200205_130726276.mp4';
    const lotopening = 'https://cdn.discordapp.com/attachments/595934804378386442/674611602577817621/YouCut_20200205_144514668.mp4';
    const luciferopening = 'https://cdn.discordapp.com/attachments/679864620864765983/705423144361656370/lucifer.mp4';
    
    if (interaction.options.first()?.value === 'flash') return interaction.reply(flashopening);
    else if (interaction.options.first()?.value === 'legends') return interaction.reply(lotopening);
    else if (interaction.options.first()?.value === 'lucifer') return interaction.reply(luciferopening);
}

export const info: Command['info'] = {
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};

export const data: Command['data'] = {
    name: 'opening',
    description: 'Watch a show\'s opening sequence',
    defaultPermission: true,
    options: [
        {
            type: 'STRING',
            name: 'show',
            description: 'The show',
            required: true,
            choices: [
                {
                    name: 'The Flash',
                    value: 'flash'
                },
                {
                    name: 'DC\'s Legends of Tomorrow',
                    value: 'legends'
                },
                {
                    name: 'Lucifer',
                    value: 'lucifer'
                }
            ]
        }
    ]
};