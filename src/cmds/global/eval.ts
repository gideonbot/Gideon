import type { CommandInteraction } from 'discord.js';
import type { Command } from '#types/Util.js';
import { truncate } from '#utils/Util';

export async function run(interaction: CommandInteraction): Promise<void> {
	const code = interaction.options.data[0]?.value;
	// eslint-disable-next-line no-eval
	const returnedValue = eval(code as string);

	if (typeof returnedValue === 'undefined') {
		await interaction.reply('The evaluated code returned nothing.');
		return;
	}

	let printValue;

	if (typeof returnedValue === 'string') printValue = returnedValue;
	else if (typeof returnedValue === 'object') printValue = JSON.stringify(returnedValue, null, 2);
	// eslint-disable-next-line no-new-wrappers
	else printValue = new String(returnedValue);

	if (printValue === '{}') return;

	return interaction.reply({ content: truncate(printValue as string, 1900, true) });
}

export const info: Command['info'] = {
	owner: true,
	nsfw: false,
	roles: [],
	user_perms: [],
	bot_perms: []
};

export const data: Command['data'] = {
	name: 'eval',
	description: 'Evaluate JavaScript',
	defaultPermission: true,
	options: [
		{
			type: 'STRING',
			name: 'code',
			description: 'JavaScript code',
			required: true
		}
	]
};
