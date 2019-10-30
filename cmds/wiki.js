const Discord = module.require("discord.js");
const fetch = require('node-fetch');
const Util = require("../Util");

module.exports.run = async (gideon, message, args) => {
    let agc = args[0];
    let search_term;
    
    let wikis = [
        {
            url: "arrow.fandom.com",
            title: "Arrowverse"
        },
        {
            url: "blacklightning.fandom.com",
            title: "Black Lightning"
        },
        {
            url: "dc.fandom.com",
            title: "DC"
        },
        {
            url: "krypton-series.fandom.com",
            title: "Krypton"
        },
        {
            url: "lucifer.fandom.com",
            title: "Lucifer"
        },
    ]
    
    let wiki = wikis[-1];

    if (agc.length !== 2) wiki = wikis[0], search_term = args.join(' ');
    else if (agc.match(/(?:bl)/i)) wiki = wikis[1], args.shift(), search_term = args.join(' ');
    else if (agc.match(/(?:dc)/i)) wiki = wikis[2], args.shift(), search_term = args.join(' ');
    else if (agc.match(/(?:kr)/i)) wiki = wikis[3], args.shift(), search_term = args.join(' ');
    else if (agc.match(/(?:lu)/i)) wiki = wikis[4], args.shift(), search_term = args.join(' ');
    else return message.channel.send('Supply a valid Wiki!');

    if (!search_term) return message.channel.send("You must supply a search term!");

    const search_api = encodeURI(`https://${wiki.url}/api/v1/SearchSuggestions/List?query=${search_term}`);

    try {
        const search = await fetch(search_api).then(res => res.json());

        if (search && search.items && search.items.length === 1) search_term = search.items[0].title;

        const api = encodeURI(`https://${wiki.url}/api/v1/Articles/Details?ids=50&titles=${search_term}&abstract=500&width=200&height=200`);

        const body = await fetch(api).then(res => res.json());
        const article = Object.values(body.items)[0];       
        if (!Object.keys(body.items).length) return message.channel.send(`There was no result for ${search_term} on the ${wiki.title} Wiki!`).catch(console.error);
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
        console.log("Error occurred while fetching data from wiki: " + ex);
        Util.log("Error occurred while fetching data from wiki: " + ex);
        return message.channel.send("Failed to fetch info from wiki, please try again later");
    } 
}

module.exports.help = {
    name: "wiki"
}