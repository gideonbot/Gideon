const Discord = require("discord.js");
const Util = require("../../Util");
const fs = require('fs');

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message, args) => {
    const as = Util.CreateEmbed("You must supply valid input!");
    if (!args[0]) return message.channel.send(as);
    if (args[1]) return message.channel.send(as);

    if (!Util.ValID(args[0])) return message.channel.send(as);

    try {
        let ub = gideon.getUBL.get(args[0]);
        if (!ub) {
            ub = {
                user: args[0],
                userval: 0,
            }
        }

        if (ub.userval === 0) {
            ub.userval = 1;
            gideon.setUBL.run(ub);
            message.reply(`user \`${args[0]}\` has been blacklisted!`);
        }

        else {
            ub.userval = 0;
            gideon.setUBL.run(ub);
            message.reply(`user \`${args[0]}\` has been un-blacklisted!`); 
        }
    }

    catch (ex) {
        console.log("Caught an exception while running ub.js: " + ex.stack);
        Util.log("Caught an exception while running ub.js: " + ex.stack);
        return message.channel.send(Util.CreateEmbed('An error occured while executing this command!'));
    }
}

module.exports.help = {
    name: ["ub", "UBLacklist", "ubrm"],
    type: "owner",
    help_text: "ub <userid> <:gideon:686678560798146577>",
    help_desc: "Blacklists a user",
    owner: true,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
}