const Discord = require("discord.js");
const Util = require("../../Util");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message, args) => {
    if (message.author.id !== gideon.owner) {
        return message.channel.send('You do not have the required permissions to use this command!');
    }

    const as = Util.CreateEmbed("You must supply valid input!");
    if (!args[0]) return message.channel.send(as);
    if (args[1]) return message.channel.send(as);

    let noid = isNaN(args[0]);

    if (noid && !args[0].length >= 18) return message.channel.send(as);

    try {
        let gb = gideon.getGBL.get(args[0]);
        if (!gb) {
            gb = {
                guild: args[0],
                guildval: 0,
            }
        }

        if (gb.guildval === 0) {
            gb.guildval = 1;
            gideon.setGBL.run(gb);
            message.reply(`guild \`${args[0]}\` has been blacklisted!`);
        }

        else {
            gb.guildval = 0;
            gideon.setGBL.run(gb);
            message.reply(`guild \`${args[0]}\` has been un-blacklisted!`); 
        }
    }

    catch (ex) {
        console.log("Caught an exception while running gb.js: " + ex);
        Util.log("Caught an exception while running gb.js: " + ex);
        return message.channel.send(Util.CreateEmbed('An error occured while executing this command!'));
    }
}

module.exports.help = {
    name: ["gb", "gblacklist", "gbrm"],
    type: "owner",
    help_text: "gb <guildid> <:gideon:686678560798146577>",
    help_desc: "Blacklists a guild"
}