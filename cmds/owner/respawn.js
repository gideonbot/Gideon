const Discord = require("discord.js");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message) => {
    if (message.author.id !== gideon.owner) {
        return message.channel.send('You do not have the required permissions to use this command!');
    }

    await message.reply(`now respawning all shards... :white_check_mark:`);
    gideon.shard.respawnAll();
}

module.exports.help = {
    name: ["rs", "respawn"],
    type: "owner",
    help_text: "rs",
    help_desc: "Respawns all shards"
}