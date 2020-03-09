const Discord = require("discord.js");
const Util = require("../../Util");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message) => {
    let shards = gideon.shard.count;

    message.channel.send(Util.CreateEmbed('Shard Count:', {description: `Gideon is currently running on \`${shards}\` ${shards > 1 ? 'shards' : 'shard'}`}));
}

module.exports.help = {
    name: "shards",
    type: "stats",
    help_text: "shards",
    help_desc: "Displays amount of spawned shards"
}