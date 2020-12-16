import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(message, args) {
    let wikis = [
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
    
    let wiki;

    if (args[0] === 'help') {
        const wikihelp = Util.Embed(null, {description: '**The following Wikis are available:**\n\nwiki <term> | Arrowverse Wiki\nwiki **-dc** <term> | DC Wiki\nwiki **-stg** <term> | Stargirl Wiki\nwiki **-kr** <term> | Krypton Wiki\nwiki **-lu** <term> | Lucifer Wiki\nwiki **-t** <term> | Titans Wiki\nwiki **-dp** <term> | Doom Patrol Wiki\nwiki **-sv** <term> | Smallville Wiki\nwiki **-tb** <term> | The Boys Wiki'}, message.member);
        await message.channel.send(wikihelp);
        return;
    }

    const invalwiki = Util.Embed(null, {description: 'Supply a valid Wiki!\n\n**The following Wikis are available:**\n\nwiki <term> | Arrowverse Wiki\nwiki **-dc** <term> | DC Wiki\nwiki **-stg** <term> | Stargirl Wiki\nwiki **-kr** <term> | Krypton Wiki\nwiki **-lu** <term> | Lucifer Wiki\nwiki **-t** <term> | Titans Wiki\nwiki **-dp** <term> | Doom Patrol Wiki\nwiki **-sv** <term> | Smallville Wiki\nwiki **-tb** <term> | The Boys Wiki'}, message.member);
 
    if (!args[0].startsWith('-')) wiki = wikis[0];
    else if (args[0] === '-stg') wiki = wikis[1];
    else if (args[0] === '-dc') wiki = wikis[2];
    else if (args[0] === '-kr') wiki = wikis[3];
    else if (args[0] === '-lu') wiki = wikis[4];
    else if (args[0] === '-dp') wiki = wikis[5];
    else if (args[0] === '-t') wiki = wikis[6];
    else if (args[0] === '-sv') wiki = wikis[7];
    else if (args[0] === '-tb') wiki = wikis[8];
    else return message.channel.send(invalwiki);

    let search_term;
    if (wiki.title === 'Arrowverse') search_term = args.join(' ');
    else search_term = args.slice(1).join(' ');

    if (!search_term) return message.channel.send('You must supply a search term!');

    const search_api = encodeURI(`https://${wiki.url}/api/v1/SearchSuggestions/List?query=${search_term}`);

    const search = await Util.fetchJSON(search_api);

    if (search && search.items && search.items.length === 1) search_term = search.items[0].title;

    const api = encodeURI(`https://${wiki.url}/api/v1/Articles/Details?ids=50&titles=${search_term}&abstract=500&width=200&height=200`);

    const body = await Util.fetchJSON(api);

    //new wikis do some weird stuff, therefore the actual result is the 2nd element
    const article = Object.values(body.items)[wikis.indexOf(wiki) == 1 ||
            wikis.indexOf(wiki) == 3 ? 1 : 0 || wikis.indexOf(wiki) == 5 ? 1 : 0 || 
            wikis.indexOf(wiki) == 6 ? 1 : 0 || 
            wikis.indexOf(wiki) == 8 ? 1 : 0];

    if (!article) return message.channel.send(Util.Embed(`There was no result for ${search_term} on the ${wiki.title} Wiki!\nPay attention to capitalization and spelling or search a different wiki (use \`wiki help\`)`, null, message.member));
    if (Object.keys(body.items).length < 1) return message.channel.send(Util.Embed(`There was no result for ${search_term} on the ${wiki.title} Wiki!\nPay attention to capitalization and spelling or search a different wiki (use \`wiki help\`)`, null, message.member));
    const url = article.url.replace(/\(/g, '%28').replace(/\)/g, '%29');

    let st = '';
    let cvm = process.gideon.getGuild.get(message.guild.id);
    if (cvm) {
        if (cvm.cvmval === 1) st = '||';
    }
    

    return message.channel.send(Util.Embed(article.title, {
        description: `${st}${article.abstract}${st}\n\n**[Click here to read the full article](https://${wiki.url}${url} 'https://${wiki.url}${url}')**`,
        thumbnail: article.thumbnail
    }, message.member)); 
}

export let help = {
    name: 'wiki',
    type: 'general',
    help_text: 'wiki [help]/[wiki] <term>',
    help_desc: 'Searches the specified wiki for the given term | wiki help for a list of wikis',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {force: true},
    roles: [],
    user_perms: [],
    bot_perms: []
};