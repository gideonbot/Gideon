const Discord = require("discord.js");
const Util = require("../../Util");
/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message) => {
    const member = message.member;
    const perms = member.permissions.toArray().map(perms => `\`${perms}\``).join(' ');

    const embed = Util.CreateEmbed('Check the permission flags below:', {
        author: {
            name: `${message.author.tag}'s permissions on ${message.guild.name}:`,
            icon: message.author.displayAvatarURL()
        },
        description: perms,
    })

    message.channel.send(embed);
}

module.exports.help = {
    name: ["perms", "permissions"],
    type: "stats",
    help_text: "perms",
    help_desc: "Displays a members perms",
    owner: false,
    voice: false,
    timevault: false,
    roles: [],
    user_perms: [],
    bot_perms: []
}