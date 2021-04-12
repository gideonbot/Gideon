import { CommandInteraction } from 'discord.js';
import { Command } from 'src/@types/Util.js';
import Util from '../../Util.js';

/**
* @param {Discord.CommandInteraction} interaction
*/
export async function run(interaction: CommandInteraction): Promise<void> {
    if (!process.env.IMG_CL) {
        Util.log('Missing env variable for meme command!');
        return interaction.reply('This command is currently not available');
    }

    return Util.IMG('NVHwdNg', interaction, false);
}

export const help: Command['help'] = {
    name: 'meme',
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};