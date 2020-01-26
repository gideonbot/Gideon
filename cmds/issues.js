const Discord = module.require("discord.js");
const fetch = require('node-fetch');
const Util = require("../Util");

module.exports.run = async (gideon, message, args) => {
    const fetchapi = 'https://api.github.com/repos/adrifcastr/Gideon/issues';

    try {
        const body = await fetch(fetchapi).then(res => res.json()); 
    
        const issues = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('Issues: ' + body.length)
        .setTimestamp()
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        let issues_array = body.reverse();
        for (let item of issues_array) {
            try {
                issues.addField(`Issue #${item.number}: ${item.title}`, `Link: [GitHub](${item.html_url} '${item.html_url}') | Comments: \`${item.comments}\` | Opened by: \`${item.user.login}\``);
            }
            
            catch (ex) {
                console.log(`Error while fetching issues: ${ex.error ? ex.error : ex}`);
                Util.log(`Error while fetching issues: ${ex.error ? ex.error : ex}`);
            }
        }
    
        message.channel.send(issues);
    }
    
    catch (ex) {
        console.log("Caught an exception while fetching issues: " + ex);
        Util.log("Caught an exception while fetching issues: " + ex);

        const er = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('An error occurred while fetching issues!')
        .setDescription('Please try again later!')
        .setTimestamp()
        .setFooter(Util.config.footer, gideon.user.avatarURL());
        return message.channel.send(er);
    }
}

module.exports.help = {
    name: ["issues", "issue", "bug"],
    type: "misc",
    help_text: "issues",
    help_desc: "Displays Github issues and allows to submit new ones."
}