import { CommandInteraction } from 'discord.js';
import { Command } from 'src/@types/Util.js';
import Util from '../../Util.js';

export async function run(interaction: CommandInteraction): Promise<void> {
    if (!process.env.IMG_CL) {
        Util.log('Missing env variable for meme command!');
        return interaction.reply('This command is currently not available');
    }

    const img = await Util.IMG('NVHwdNg');
    if (!img) return interaction.reply('An error occurred, please try again later!', { ephemeral: true });

    return interaction.reply(Util.Embed().setImage(img));
}

export const info: Command['info'] = {
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};

export const data: Command['data'] = {
    name: 'meme',
    description: 'Fetches a random Arrowverse meme',
    defaultPermission: true
};