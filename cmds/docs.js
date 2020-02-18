const Discord = require("discord.js");
const Util = require("../Util");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message) => {
    const github = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('Gideon - Selfhosting Documentation')
    .setDescription('Click the link below to read the GitHub documentation on how to selfhost me!')
    .setThumbnail(gideon.user.avatarURL())
    .addField('GitHub Wiki:', `**[Read Docs](https://github.com/adrifcastr/Gideon/wiki 'https://github.com/adrifcastr/Gideon/wiki')**`)
    .setFooter(Util.config.footer, gideon.user.avatarURL());

    message.channel.send(github);       
}

module.exports.help = {
    name: ["docs", "hosting"],
    type: "misc",
    help_text: "docs",
    help_desc: "Displays Gideon's Github Wiki link"
}