import type { CommandInteraction } from 'discord.js';
import type { Command } from 'src/@types/Util.js';
import { SQLBkup } from 'src/Util';

export async function run(interaction: CommandInteraction): Promise<unknown> {
	void interaction.reply('Performing database backup, please wait...');
	void SQLBkup(interaction.client);
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
