const Discord = require("discord.js");
const Util = require("../../Util");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message) => {
    message.channel.send(Util.CreateEmbed('Android Application:', {
        thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Android_logo_2019.svg/687px-Android_logo_2019.svg.png',
        description: `You can find experimental Gideon Android™️ builds in:\n<#676186130764267572>\n\nMinimum SDK: \`API 24 (7.0 Oreo)\`\nDevelopment State: \`Pre-Alpha\`\n\nCurent functionality:`,
        fields: [
            {
                name: '- Random Audio Playback:',
                value: 'Plays Gideon Voice™ audio files in random order'
            }
        ]
    }));
}

module.exports.help = {
    name: ["android", "app"],
    type: "misc",
    help_text: "android",
    help_desc: "Displays Gideon Android info"
}