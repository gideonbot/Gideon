const Discord = require("discord.js");
const Util = require("../../Util");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message) => {
    try {
        const embed = Util.CreateEmbed('Guilds:');

        let shard = await gideon.shard.broadcastEval(`this.shard.ids`).then(results => {return results}).catch(console.error);
        let guilds = await gideon.shard.broadcastEval(`this.guilds.cache.size`).then(results => {return results}).catch(console.error);
        console.log(shard);

        let g = [`\`${guilds[0]}\` guilds on shard: \`${shard[0]}\``]

        embed.setDescription(g.join("\n"));
        message.channel.send(embed);
    }
    catch (ex) {
        console.log(ex);
        Util.log("Caught an exception while running torrent.js: " + ex);
        return message.channel.send(Util.CreateEmbed('An error occured while executing this command!'));
    }
}

module.exports.help = {
    name: ["guilds", "servers"],
    type: "misc",
    help_text: "guilds",
    help_desc: "Displays all guilds the bot is in"
}