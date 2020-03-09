const Discord = require("discord.js");
const Util = require("../../Util");
const fs = require('fs');

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message) => {
    if (message.author.id !== gideon.owner) {
        return message.channel.send('You do not have the required permissions to use this command!');
    }

    try {
        let path1 = './data/JSON/userblacklist.json';
        let path2 = './data/JSON/guildblacklist.json';

        if (!fs.existsSync(path1)) {
            fs.writeFileSync(path1, JSON.stringify([]));
        }
        if (!fs.existsSync(path2)) {
            fs.writeFileSync(path2, JSON.stringify([]));
        }

        let users = JSON.parse(fs.readFileSync(path1));
        let guilds = JSON.parse(fs.readFileSync(path2));
        const userids = users.map(x => x.userid);
        const guildids = guilds.map(x => x.guildid);
        
        const embed = Util.CreateEmbed('Gideon Blacklist:');
        embed.addField(`Users:`, `\`${userids.join('\n')}\``);
        embed.addField(`Guilds:`, `\`${guildids.join('\n')}\``);

        message.channel.send(embed);
    }

    catch (ex) {
        console.log("Caught an exception while running bl.js: " + ex);
        Util.log("Caught an exception while running bl.js: " + ex);
        return message.channel.send(Util.CreateEmbed('An error occured while executing this command!'));
    }
}

module.exports.help = {
    name: ["blacklist","bl"],
    type: "owner",
    help_text: "blacklist",
    help_desc: "Displays blacklisted users and guilds"
}