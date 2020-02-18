const Discord = require("discord.js");
const fetch = require('node-fetch');
const Util = require("../Util");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message) => {
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
        .setFooter(Util.config.footer, gideon.user.avatarURL());
    
        message.channel.send(github);
    }
    
    catch (ex) {
        console.log("Caught an exception while fetching github data: " + ex);
        Util.log("Caught an exception while fetching github data: " + ex);

        const er = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('An error occurred while fetching github data!')
        .setDescription('Please try again later!')
        .setTimestamp()
        .setFooter(Util.config.footer, gideon.user.avatarURL());
        return message.channel.send(er);
    }
}

module.exports.help = {
    name: ["github", "git", "repo"],
    type: "misc",
    help_text: "github",
    help_desc: "Displays Github repository info"
}