import Util from '../../Util.js';
import { CommandInteraction, GuildMember } from 'discord.js';
import { Command, Wiki, WikiQuery, WikiResult } from 'src/@types/Util.js';

export async function run(interaction: CommandInteraction): Promise<void> {
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

    let search_term = interaction.options.get('term')?.value;

    const search_api = encodeURI(`https://${wiki?.url}/api/v1/SearchSuggestions/List?query=${search_term}`);

    const search = await Util.fetchJSON(search_api) as WikiQuery;

    if (search?.items?.length === 1) search_term = search.items[0].title;

    const api = encodeURI(`https://${wiki?.url}/api/v1/Articles/Details?ids=50&titles=${search_term}&abstract=500&width=200&height=200`);

    const body = await Util.fetchJSON(api) as WikiResult;

    //new wikis do some weird stuff, therefore the actual result is the 2nd element
    const index = Object.values(wikis).indexOf(wiki);
    const article = Object.values(body.items)[index == 1 || index == 3 ? 1 : 0 || index == 5 ? 1 : 0 || index == 6 ? 1 : 0 || index == 8 ? 1 : 0];

    if (!article) return interaction.reply({ content: `There was no result for ${search_term} on the ${wiki.title} Wiki!\nPay attention to capitalization and spelling or search a different wiki!`, ephemeral: true });
    if (Object.keys(body.items).length < 1) return interaction.reply({ content: `There was no result for ${search_term} on the ${wiki.title} Wiki!\nPay attention to capitalization and spelling or search a different wiki!`, ephemeral: true });
    const url = article.url.replace(/\(/g, '%28').replace(/\)/g, '%29');

    let st = '';
    const cvm = process.gideon.getGuild.get(interaction.guild?.id);
    if (cvm) {
        if (cvm.cvmval === 1) st = '||';
    }

    return interaction.reply({embeds: [Util.Embed(article.title, {
        description: `${st}${article.abstract}${st}\n\n**[Click here to read the full article](https://${wiki?.url}${url} 'https://${wiki?.url}${url}')**`,
        thumbnail: article.thumbnail
    }, interaction.member as GuildMember)]});
}

export const info: Command['info'] = {
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};

export const data: Command['data'] = {
    name: 'wiki',
    description: 'Search the specified wiki for the given term',
    defaultPermission: true,
    options: [
        {
            type: 'STRING',
            name: 'wiki',
            description: 'The wiki to search on',
            required: true,
            choices: [
                {
                    name: 'Arrowverse',
                    value: 'wiki_av'
                },
                {
                    name: 'DC Comics',
                    value: 'wiki_dc'
                },
                {
                    name: 'Krypton',
                    value: 'wiki_kr'
                },
                {
                    name: 'Lucifer',
                    value: 'wiki_lu'
                },
                {
                    name: 'Stargirl',
                    value: 'wiki_stg'
                },
                {
                    name: 'Titans',
                    value: 'wiki_t'
                },
                {
                    name: 'Doom Patrol',
                    value: 'wiki_dp'
                },
                {
                    name: 'Smallville',
                    value: 'wiki_sv'
                },
                {
                    name: 'The Boys',
                    value: 'wiki_tb'
                }
            ]
        },
        {
            type: 'STRING',
            name: 'term',
            description: 'The search term',
            autocomplete: true,
            required: true
        }
    ]
};