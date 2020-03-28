const Discord = require("discord.js");
const fetch = require('node-fetch');
const Util = require("../../Util");

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
    
        message.channel.send(Util.CreateEmbed(body.name, {
            description: body.description + `\n\nOwner: [adrifcastr](${body.owner.html_url} '${body.owner.html_url}')\nRepo: [Gideon](${body.html_url} '${body.html_url}')\nDiscord: [Time Vault](${body.homepage} '${body.homepage}')\nLanguage: \`${body.language}\`\nLast Update: \`${upDate.toUTCString()}\`\nOpen Issues: \`${body.open_issues_count}\`\nStargazers: \`${body.stargazers_count}\`\nWatchers: \`${body.watchers_count}\`\nForks: \`${body.forks_count}\`\nGit Clone: \`${body.clone_url}\``,
            thumbnail: body.owner.avatar_url
        }));
    }
    
    catch (ex) {
        console.log("Caught an exception while fetching github data: " + ex.stack);
        Util.log("Caught an exception while fetching github data: " + ex.stack);
        return message.channel.send(Util.CreateEmbed('An error occurred while fetching github data!'));
    }
}

module.exports.help = {
    name: ["github", "git", "repo"],
    type: "stats",
    help_text: "github",
    help_desc: "Displays Github repository info",
    owner: false,
    voice: false,
    timevault: false,
    roles: [],
    user_perms: [],
    bot_perms: []
}