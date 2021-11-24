import Discord from 'discord.js';
import type { CommandInteraction } from 'discord.js';
import type { Command } from 'src/@types/Util.js';
import { fetchJSON } from 'src/Util';
import type { SapphireClient } from '@sapphire/framework';

export async function run(interaction: CommandInteraction, gideon: SapphireClient): Promise<void> {
	if (!interaction.guild) return;

	const type = interaction.options.data.length > 0 ? (interaction.options.data[0]?.value as string) : 'any';
	const url = `https://sv443.net/jokeapi/v2/joke/${type}?type=single`;

	interface ResponseBody {
		category: string;
		id: number;
		joke: string;
	}

	const body = (await fetchJSON(url)) as ResponseBody;

	let category = gideon.cache.jokes.get(body.category);

	if (!category) {
		gideon.cache.jokes.set(body.category, new Discord.Collection([[body.id, body.joke]]));
		category = gideon.cache.jokes.get(body.category);
	}

	if (!category) return; // this will never happen but ts is pepega

	if (!category.has(body.id)) category.set(body.id, body.joke);
	if (!interaction.guild.last_jokes) interaction.guild.last_jokes = [];

	const { last_jokes } = interaction.guild;

	if (last_jokes.length > 0) {
		// if last 20 jokes include the current joke
		if (last_jokes.some((x) => x.category === body.category && x.id === body.id)) {
			console.log(`Got a repeated joke: ${body.id}`);
			let new_id = -1;
			let attempts = 0;

			do {
				// @ts-ignore some ts fuckery
				new_id = category.randomKey();
				attempts++;

				if (attempts > 50) {
					console.log('Failed to find a unique joke after 50 attempts!');
					break;
				}
			} while (last_jokes?.map((x) => x.id).includes(new_id));

			const temp = category.get(new_id);

			if (!temp) return; // ts is pepega

			body.id = new_id;
			body.joke = temp;
		}
	}

	interaction.guild.last_jokes.push({ category: body.category, id: body.id });

	if (interaction.guild.last_jokes.length > 20) interaction.guild.last_jokes.shift();

	return interaction.reply({ embeds: [{ title: `Category: ${body.category}`, description: body.joke }] });
}

export const info: Command['info'] = {
	owner: false,
	nsfw: false,
	roles: [],
	user_perms: [],
	bot_perms: []
};

export const data: Command['data'] = {
	name: 'joke',
	description: 'Fetch a random joke',
	defaultPermission: true,
	options: [
		{
			type: 'STRING',
			name: 'category',
			description: 'The joke category',
			choices: [
				{
					name: 'Programming',
					value: 'programming'
				},
				{
					name: 'Miscellaneous',
					value: 'misc'
				},
				{
					name: 'Dark',
					value: 'dark'
				},
				{
					name: 'Pun',
					value: 'pun'
				}
			]
		}
	]
};
