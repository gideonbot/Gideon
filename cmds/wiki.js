const Discord = module.require("discord.js");
const fetch = require('node-fetch');
const Util = require("../Util");

module.exports.run = async (gideon, message, args) => {
    let search_term = args.join(' ');

    if (!search_term) return message.channel.send("You must supply a search term!");

    const search_api = encodeURI(`https://arrow.fandom.com/api/v1/SearchSuggestions/List?query=${search_term}`);

    try {
        const search = await fetch(search_api).then(res => res.json());

        if (search && search.items && search.items.length == 1) search_term = search.items[0].title;

        const api = encodeURI(`https://arrow.fandom.com/api/v1/Articles/Details?ids=50&titles=${search_term}&abstract=500&width=200&height=200`);

        const body = await fetch(api).then(res => res.json());
        const article = Object.values(body.items)[0];       
        if (!Object.keys(body.items).length) return message.channel.send(`There was no result for ${search_term} on the Arrowverse Wiki!`).catch(console.error);
        const url = article.url.replace(/\(/g, '%28').replace(/\)/g, '%29');       
                
        const wikiart = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle(article.title)
        .setDescription(article.abstract + `\n\n**[Click here to read the full article](https://arrow.fandom.com${url} 'https://arrow.fandom.com${url}')**`)
        .setThumbnail(article.thumbnail)
        .setTimestamp()
        .setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', gideon.user.avatarURL());
    
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