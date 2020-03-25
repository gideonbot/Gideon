const Discord = require("discord.js");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message) => {
    let trmode = gideon.getTrmode.get(message.author.id);
    if (!trmode) {
        trmode = {
            id: message.author.id,
            trmodeval: 0,
        }
    }

    if (trmode.trmodeval === 0) {
        trmode.trmodeval = 1;
        gideon.setTrmode.run(trmode);
        message.reply('Translation Mode enabled! :white_check_mark:');
    }

    else {
        trmode.trmodeval = 0;
        gideon.setTrmode.run(trmode);
        message.reply('Translation Mode disabled! :white_check_mark:');
    }
}

module.exports.help = {
    name: "trmode",
    type: "misc",
    help_text: "trmode",
    help_desc: "Toggles translation mode",
    owner: false,
    timevault: false,
    roles: [],
    user_perms: [],
    bot_perms: []
}