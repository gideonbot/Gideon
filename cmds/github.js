const Discord = module.require("discord.js");
const fetch = require('node-fetch');
const Util = require("../Util");

module.exports.run = async (gideon, message, args) => {
    const api = 'https://api.github.com/repos/adrifcastr/Gideon';

    try {
        const body = await fetch(api).then(res => res.json()); 
        let upDate = new Date(body.updated_at);
    
        const github = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle(body.name)
        .setDescription(body.description + `\n\nOwner: [adrifcastr](${body.owner.html_url} '${body.owner.html_url}')\nRepo: [Gideon](${body.html_url} '${body.html_url}')\nDiscord: [Time Vault](${body.homepage} '${body.homepage}')\nLanguage: \`${body.language}\`\nLast Update: \`${upDate.toUTCString()}\`\nOpen Issues: \`${body.open_issues_count}\`\nStargazers: \`${body.stargazers_count}\`\nWatchers: \`${body.watchers_count}\`\nForks: \`${body.forks_count}\`\nGit Clone: \`${body.clone_url}\``)
        .setThumbnail(body.owner.avatar_url)
        .setTimestamp()
        .setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', gideon.user.avatarURL());
    
        message.channel.send(github);
    }
    
    catch (ex) {
        console.log("Caught an exception while plotting a course: " + ex);
        Util.log("Caught an exception while plotting a course: " + ex);
        message.channel.send("An error occurred while fetching github data, please try again later");
    }
}

module.exports.help = {
    name: "github"
}