const Discord = require("discord.js");
const Util = require("../../Util");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message) => {     
    const guild = message.guild;
    const emojis = guild.emojis.cache.map(emojis => emojis.toString()).join(' ');

    const embed = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .addField('❯ Emojis:', emojis)
    .addField('❯ Escaped Emojis:', `\`${emojis}\``)
    .setFooter(Util.config.footer, Util.config.avatar)
    message.channel.send(embed);
}

module.exports.help = {
    name: ['emojis', 'emotes'],
    type: "stats",
    help_text: "emojis",
    help_desc: "Get a list of guild emojis"
}