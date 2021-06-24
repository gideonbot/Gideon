import { CommandInteraction } from 'discord.js';
import { Command } from 'src/@types/Util.js';
import Util from '../../Util.js';

export async function run(interaction: CommandInteraction): Promise<unknown> {
    interaction.reply('Performing database backup, please wait...');
    await Util.SQLBkup();
    return interaction.editReply('Database backup complete! Please check <#622415301144870932>! :white_check_mark:');
}

export const info: Command['info'] = {
    owner: false,
    nsfw: false,
    roles: ['621399916283035658'],
    user_perms: [],
    bot_perms: []
};

export const data: Command['data'] = {
    name: 'bkup',
    description: 'Perform a database backup',
    defaultPermission: true
};
