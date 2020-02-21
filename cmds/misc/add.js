const Discord = require("discord.js");
const Util = require("../../Util");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message) => {
    const url = 'https://discordapp.com/api/oauth2/authorize?client_id=595328879397437463&permissions=37088321&scope=bot';

    const addemebed = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('Gideon - Oauth2 Invite')
    .setDescription('Click the link below to add me to your server!')
    .setThumbnail(gideon.user.avatarURL())
    .addField('Discord Oauth2:', `**[Add to server](${url} '${url}')**`)
    .setFooter(Util.config.footer, gideon.user.avatarURL());

    message.channel.send(addemebed);       
}

module.exports.help = {
    name: ["add", "oauth"],
    type: "misc",
    help_text: "add",
    help_desc: "Displays Gideon's oauth2 invite link"
}