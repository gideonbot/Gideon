const Discord = require("discord.js");
const Util = require("../../Util");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message) => {
    let shards = gideon.shard.count;

    const sembed = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('Shardcount:')
    .setDescription(`Gideon is currently running on \`${shards}\` ${shards > 1 ? 'shards' : 'shard'}`)
    .setFooter(Util.config.footer, gideon.user.avatarURL());

    message.channel.send(sembed);
}

module.exports.help = {
    name: "shards",
    type: "misc",
    help_text: "shards",
    help_desc: "Displays amount of spawned shards"
}