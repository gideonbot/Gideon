const Discord = module.require("discord.js");
const fetch = require('node-fetch');

module.exports.run = async (gideon, message, args) => {
    const api = encodeURI(`https://blacklightning.fandom.com/api/v1/Articles/Details?ids=50&titles=${args.join(' ')}&abstract=500&width=200&height=200`);
    let term = args[0];
    if (!term) return message.channel.send("You must supply a search term!");

    const body = await fetch(api).then(res => res.json());
    
    const article = Object.values(body.items)[1];       
    if (!Object.keys(body.items).length) return message.channel.send(`There was no result for ${args.join(' ')} on the Arrowverse Wiki!\nPlease note that this command is case sensitive!`).catch(console.error);
    const url = article.url.replace(/\(/g, '%28').replace(/\)/g, '%29');       
            
    const wikiart = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle(article.title)
    .setDescription(article.abstract + `\n\n**[Click here to read the full article](https://blacklightning.fandom.com${url} 'https://blacklightning.fandom.com${url}')**`)
    .setThumbnail(article.thumbnail)
    .setTimestamp()
    .setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', gideon.user.avatarURL())

    message.channel.send(wikiart); 
}

module.exports.help = {
    name: "wikibl"
}