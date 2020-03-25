const Discord = require("discord.js");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message) => {     
    message.channel.send('https://discord.gg/h9SEQaU'); 
}

module.exports.help = {
    name: "invite",
    type: "misc",
    help_text: "invite",
    help_desc: "Sends an invite link to the Time Vault",
    owner: false,
    timevault: false,
    roles: [],
    user_perms: [],
    bot_perms: []
}