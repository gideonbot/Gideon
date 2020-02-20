const Discord = require("discord.js");
const Util = require("../../Util");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message) => {
    const android = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('Android Application:')
    .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Android_logo_2019.svg/687px-Android_logo_2019.svg.png')
    .setDescription(`You can find experimental Gideon Android™️ builds in:\n<#676186130764267572>\n\nMinimum SDK: \`API 24 (7.0 Oreo)\`\nDevelopment State: \`Pre-Alpha\`\n\nCurent functionality:`)
    .addField('- Random Audio Playback:', 'Plays Gideon Voice™ audio files in random order')
    .setFooter(Util.config.footer, gideon.user.avatarURL());

    message.channel.send(android);
}

module.exports.help = {
    name: ["android", "app"],
    type: "misc",
    help_text: "android",
    help_desc: "Displays Gideon Android info"
}