import type { AutocompleteInteraction } from 'discord.js';

export const name = 'wiki';
export async function run(interaction: AutocompleteInteraction): Promise<void> {
    console.log(interaction);
}