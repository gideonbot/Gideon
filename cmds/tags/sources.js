const Discord = require("discord.js");
const Util = require("../../Util");
/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message) => {
    if (message.guild.id !== '595318490240385037') return message.channel.send('This command only works at the Time Vault!\nhttps://discord.gg/h9SEQaU');
    const tag = '**"Official sources" refers to any social media in association with the Arrowverse franchise or The CW Televison Network.**';
    message.channel.send(tag);
}

module.exports.help = {
    name: ["sources", "official sources"],
    type: "tags",
    help_text: "sources",
    help_desc: "Sources Tag"
}