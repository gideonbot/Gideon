const Discord = module.require('discord.js');
const fetch = require('node-fetch');
const Util = require('../Util');

module.exports.run = async (gideon, message, args) => {
    let wikis = [
        {
            url: 'arrow.fandom.com',
            title: 'Arrowverse'
        },
        {
            url: 'blacklightning.fandom.com',
            title: 'Black Lightning'
        },
        {
            url: 'dc.fandom.com',
            title: 'DC'
        },
        {
            url: 'krypton-series.fandom.com',
            title: 'Krypton'
        },
        {
            url: 'lucifer.fandom.com',
            title: 'Lucifer'
        },
    ]
    
    let wiki = wikis[-1];

    let command = message.content.toLowerCase().split(' ')[0];

    if (command.endsWith('wiki')) wiki = wikis[0];
    else if (command.endsWith('bl')) wiki = wikis[1];
    else if (command.endsWith('dc')) wiki = wikis[2];
    else if (command.endsWith('kr')) wiki = wikis[3];
    else if (command.endsWith('lu')) wiki = wikis[4];
    else return message.channel.send('Supply a valid Wiki!');

    let search_term = args.join(' ');

    if (!search_term) return message.channel.send('You must supply a search term!');

    const search_api = encodeURI(`https://${wiki.url}/api/v1/SearchSuggestions/List?query=${search_term}`);

    try {
        const search = await fetch(search_api).then(res => res.json());

        if (search && search.items && search.items.length === 1) search_term = search.items[0].title;

        const api = encodeURI(`https://${wiki.url}/api/v1/Articles/Details?ids=50&titles=${search_term}&abstract=500&width=200&height=200`);

        const body = await fetch(api).then(res => res.json());

        //black lightning does some weird stuff, therefore the actual result is the 2nd element
        const article = Object.values(body.items)[wikis.indexOf(wiki) == 1 ? 1 : 0];
        
        const nf = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle(`There was no result for ${search_term} on the ${wiki.title} Wiki!`)
        .setTimestamp()
        .setFooter(Util.config.footer, gideon.user.avatarURL());
        if (!Object.keys(body.items).length) return message.channel.send(nf).catch(console.error);
        const url = article.url.replace(/\(/g, '%28').replace(/\)/g, '%29');       
                
        const wikiart = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle(article.title)
        .setDescription(article.abstract + `\n\n**[Click here to read the full article](https://${wiki.url}${url} 'https://${wiki.url}${url}')**`)
        .setThumbnail(article.thumbnail)
        .setTimestamp()
        .setFooter(Util.config.footer, gideon.user.avatarURL());
    
        message.channel.send(wikiart); 
    }

    catch (ex) {
        console.log('Error occurred while fetching data from wiki: ' + ex);
        Util.log('Error occurred while fetching data from wiki: ' + ex);

        const er = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('Failed to fetch info from wiki!')
        .setDescription('Please try again later!')
        .setTimestamp()
        .setFooter(Util.config.footer, gideon.user.avatarURL());
        return message.channel.send(er);
    } 
}

module.exports.help = {
    name: ['wiki', 'wikidc', 'wikibl', 'wikikr', 'wikilu'],
    type: "general",
    help_text: "wiki[bl|kr|lu|dc] <term>",
    help_desc: "Searches the specified wiki for the given term | bl - Black Lightning | kr - Krypton | lu - Lucifer | dc - DC"
}