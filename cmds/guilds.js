const Discord = require("discord.js");
const Util = require("../Util");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message) => {
    const gamount = gideon.guilds.cache.size;
    const guild = gideon.guilds.cache.map(x => x);

    const gembed = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('Gideon\'s guilds:')
    .setThumbnail(gideon.user.avatarURL())
    .setFooter(Util.config.footer, gideon.user.avatarURL());

    for (let i=0 ; i < gamount ; i++) {
        const gname = guild[i].name;
        const owner = guild[i].owner.user.tag;
        const members = guild[i].memberCount;
        const shard = guild[i].shardID;
        gembed.addField(`Guild: \`${gname}\` Shard: \`${shard}\``, `Owner: \`${owner}\` Members: \`${members}\``)
    }

    message.channel.send(gembed);
}

module.exports.help = {
    name: ["guilds", "servers"],
    type: "misc",
    help_text: "guilds",
    help_desc: "Displays all guilds the bot is in"
}