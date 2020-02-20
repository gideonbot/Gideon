const Discord = require("discord.js");
const Util = require("../Util");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message, args) => {
    if (message.author.id !== gideon.owner) {
        return message.channel.send('You do not have the required permissions to use this command!');
    }

    const as = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('You must supply valid input!')
    .setFooter(Util.config.footer, gideon.user.avatarURL());
    
    if (!args[0]) return message.channel.send(as);
    if (args[1]) return message.channel.send(as);
    let noid = isNaN(args[0]);
    if (noid) return message.channel.send(as);
    if (args[0].length > 1) return message.channel.send(as);
    let shardid = args[0];

    await message.reply(`now killing shard \`${shardid}\`... :white_check_mark:`);
    gideon.shard.broadcastEval(`if (this.shard.ids[0] === ${shardid}) process.exit();`);
}

module.exports.help = {
    name: ["ks", "kill"],
    type: "admin",
    help_text: "ks",
    help_desc: "Kills the specified shard"
}