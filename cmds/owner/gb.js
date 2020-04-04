import Discord from "discord.js";
import Util from "../../Util.js";

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(gideon, message, args) {
    const id = Util.ValID(args.join(' '));
    try {
        let gb = gideon.getGBL.get(id);
        if (!gb) {
            gb = {
                guild: id,
                guildval: 0,
            }
        }

        if (gb.guildval === 0) {
            gb.guildval = 1;
            gideon.setGBL.run(gb);
            message.reply(`guild \`${id}\` has been blacklisted!`);
        }

        else if (gb.guildval === 1) {
            gb.guildval = 0;
            gideon.setGBL.run(gb);
            message.reply(`guild \`${id}\` has been un-blacklisted!`); 
        }
    }

    catch (ex) {
        console.log("Caught an exception while running gb.js: " + ex.stack);
        Util.log("Caught an exception while running gb.js: " + ex.stack);
        return message.channel.send(Util.CreateEmbed('An error occured while executing this command!', null, message.member));
    }
}

export const help = {
    name: ["gb", "gblacklist", "gbrm"],
    type: "owner",
    help_text: "gb <guildid>",
    help_desc: "Blacklists a guild",
    owner: true,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {force: true, amount: 1, type: 'snowflake'},
    roles: [],
    user_perms: [],
    bot_perms: []
}