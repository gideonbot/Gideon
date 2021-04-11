
import Util from '../../Util.js';
import { CommandInteraction, CommandInteractionOption, GuildMember } from 'discord.js';
import { Command, Wiki, WikiQuery, WikiResult } from 'src/@types/Util.js';

/**
 * @param {Discord.CommandInteraction} interaction
 * @param {CommandInteractionOption[]} args
 */
export async function run(interaction: CommandInteraction, args: CommandInteractionOption[]): Promise<void> {
    let wikis: Wiki[] = [
        {
            url: 'arrow.fandom.com',
            title: 'Arrowverse'
        },
        {
            url: 'stargirltv.fandom.com',
            title: 'Stargirl'
        },
        {
            url: 'dc.fandom.com',
            title: 'DC'
        },
        {
            url: 'krypton.fandom.com',
            title: 'Krypton'
        },
        {
            url: 'lucifer.fandom.com',
            title: 'Lucifer'
        },
        {
            url: 'doompatrol.fandom.com',
            title: 'Doom Patrol'
        },
        {
            url: 'titans.fandom.com',
            title: 'Doom Patrol'
        },
        {
            url: 'smallville.fandom.com',
            title: 'Doom Patrol'
        },
        {
            url: 'the-boys.fandom.com',
            title: 'The Boys'
        },
    ];
    
    let wiki = undefined as unknown as Wiki;


    if (args[0].value === 'wiki_av') wiki = wikis[0];
    else if (args[0].value === 'wiki_stg') wiki = wikis[1];
    else if (args[0].value === 'wiki_dc') wiki = wikis[2];
    else if (args[0].value === 'wiki_kr') wiki = wikis[3];
    else if (args[0].value === 'wiki_lu') wiki = wikis[4];
    else if (args[0].value === 'wiki_dp') wiki = wikis[5];
    else if (args[0].value === 'wiki_t') wiki = wikis[6];
    else if (args[0].value === 'wiki_sv') wiki = wikis[7];
    else if (args[0].value === 'wiki_tb') wiki = wikis[8];

    let search_term = args[1].value;

    const search_api = encodeURI(`https://${wiki?.url}/api/v1/SearchSuggestions/List?query=${search_term}`);

    const search = await Util.fetchJSON(search_api) as WikiQuery;

    if (search?.items?.length === 1) search_term = search.items[0].title;

    const api = encodeURI(`https://${wiki?.url}/api/v1/Articles/Details?ids=50&titles=${search_term}&abstract=500&width=200&height=200`);

    const body = await Util.fetchJSON(api) as WikiResult;

    //new wikis do some weird stuff, therefore the actual result is the 2nd element
    const article = Object.values(body.items)[wikis.indexOf(wiki) == 1 ||
            wikis.indexOf(wiki) == 3 ? 1 : 0 || wikis.indexOf(wiki) == 5 ? 1 : 0 || 
            wikis.indexOf(wiki) == 6 ? 1 : 0 || 
            wikis.indexOf(wiki) == 8 ? 1 : 0];

    if (!article) return interaction.reply(Util.Embed(`There was no result for ${search_term} on the ${wiki.title} Wiki!\nPay attention to capitalization and spelling or search a different wiki (use \`wiki help\`)`, undefined, interaction.member as GuildMember));
    if (Object.keys(body.items).length < 1) return interaction.reply(Util.Embed(`There was no result for ${search_term} on the ${wiki?.title} Wiki!\nPay attention to capitalization and spelling or search a different wiki (use \`wiki help\`)`, undefined, interaction.member as GuildMember));
    const url = article.url.replace(/\(/g, '%28').replace(/\)/g, '%29');

    let st = '';
    let cvm = process.gideon.getGuild.get(interaction.guild?.id);
    if (cvm) {
        if (cvm.cvmval === 1) st = '||';
    }

    return interaction.reply(Util.Embed(article.title, {
        description: `${st}${article.abstract}${st}\n\n**[Click here to read the full article](https://${wiki?.url}${url} 'https://${wiki?.url}${url}')**`,
        thumbnail: article.thumbnail
    }, interaction.member as GuildMember));
}

export let help: Command['help'] = {
    id: '786988079621210163',
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};