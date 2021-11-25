import { exec } from 'child_process';
import type { CommandInteraction } from 'discord.js';
import type { Command } from '#types/Util.js';
import { log } from '#utils/Util';

export function run(interaction: CommandInteraction): void {
	if (interaction.options.data[0].value === 'i') {
		void interaction.reply('running `npm install` please check <#622415301144870932> for console output!');
		const install = exec('npm install');

		install.stdout?.on('data', (data) => log(`\`\`\`\n${data}\`\`\``));

		install.stdout?.on('end', async () => {
			await interaction.editReply('`npm install` ran succesfully!\nNow restarting... :white_check_mark:');
			process.exit();
		});
	}

	if (interaction.options.data[0].value === 'u') {
		void interaction.reply('running `npm update` please check <#622415301144870932> for console output!');
		const update = exec('npm update');

		update.stdout?.on('data', (data) => log(`\`\`\`\n${data}\`\`\``));

		update.stdout?.on('end', async () => {
			await interaction.editReply('`npm update` ran succesfully!\nNow restarting... :white_check_mark:');
			process.exit();
		});
	}

	if (interaction.options.data[0].value === 'af') {
		void interaction.reply('running `npm audit fix` please check <#622415301144870932> for console output!');
		const update = exec('npm audit fix');

		update.stdout?.on('data', (data: string) => log(`\`\`\`\n${data}\`\`\``));

		update.stdout?.on('end', async () => {
			await interaction.editReply('`npm audit fix` ran succesfully!\nNow restarting... :white_check_mark:');
			process.exit();
		});
	}
}

export const info: Command['info'] = {
	owner: false,
	nsfw: false,
	roles: ['621399916283035658'],
	user_perms: [],
	bot_perms: []
};

export const data: Command['data'] = {
	name: 'npm',
	description: 'Run an NPM command',
	defaultPermission: true,
	options: [
		{
			type: 'STRING',
			name: 'command',
			description: 'NPM command',
			required: true,
			choices: [
				{
					name: 'install',
					value: 'i'
				},
				{
					name: 'update',
					value: 'u'
				},
				{
					name: 'audit fix',
					value: 'af'
				}
			]
		}
	]
};
