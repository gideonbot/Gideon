const Discord = require("discord.js");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message) => {
    const uid = message.author.id;

    if (!gideon.trmode.get(uid)) {
        gideon.trmode.set(uid, true);
        message.reply('Translation Mode enabled! :white_check_mark:');
    }

    else {
        gideon.trmode.set(uid, false);
        message.reply('Translation Mode disabled! :white_check_mark:');
    }
}

module.exports.help = {
    name: "trmode",
    type: "misc",
    help_text: "trmode",
    help_desc: "Toggles translation mode"
}