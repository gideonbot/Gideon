import type { AutocompleteInteraction } from 'discord.js';
import { Wiki, WikiQuery } from 'src/@types/Util';
import { fetchJSON } from 'src/Util';

export const name = 'wiki';
export async function run(interaction: AutocompleteInteraction): Promise<void> {
    if (interaction.responded) return;

    const wikis: Record<string, Wiki> = {
        wiki_av: {
            url: 'arrow.fandom.com',
            title: 'Arrowverse'
        },
        wiki_stg: {
            url: 'stargirltv.fandom.com',
            title: 'Stargirl'
        },
        wiki_dc: {
            url: 'dc.fandom.com',
            title: 'DC'
        },
        wiki_kr: {
            url: 'krypton.fandom.com',
            title: 'Krypton'
        },
        wiki_lu: {
            url: 'lucifer.fandom.com',
            title: 'Lucifer'
        },
        wiki_dp: {
            url: 'doompatrol.fandom.com',
            title: 'Doom Patrol'
        },
        wiki_t: {
            url: 'titans.fandom.com',
            title: 'Doom Patrol'
        },
        wiki_sv: {
            url: 'smallville.fandom.com',
            title: 'Doom Patrol'
        },
        wiki_tb: {
            url: 'the-boys.fandom.com',
            title: 'The Boys'
        }
    };

    const wiki = wikis[interaction.options.get('wiki')?.value as string];
    const value = interaction.options.getFocused();

    const search_api = encodeURI(`https://${wiki?.url}/api/v1/SearchSuggestions/List?query=${value}`);
    const search = await fetchJSON(search_api) as WikiQuery;
    if (!search.items || !search.items.length) return;
    
    const response = [];
    for (const item of search.items) {
        response.push({ name: item.title, value: item.title });
    }

    await interaction.respond(response);
}