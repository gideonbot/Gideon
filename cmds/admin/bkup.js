import Discord from "discord.js";
import Util from "../../Util.js";

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(gideon, message, args) {
    try {
        message.channel.send('Performing database backup, please wait...');
        await Util.SQLBkup(gideon);
        message.channel.send('Database backup complete! Please check <#622415301144870932>! :white_check_mark:');
    }
    
    catch (ex) {
        console.log("Caught an exception while running bkup.js: " + ex.stack);
        Util.log("Caught an exception while running bkup.js: " + ex.stack);
        return message.channel.send(Util.CreateEmbed('An error occured while executing this command!'));
    }      
}

export const help = {
    name: ["backup", "bkup"],
    type: "admin",
    help_text: "backup `@Gideon Dev Team`",
    help_desc: "Performs a database backup",
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: ['621399916283035658'],
    user_perms: [],
    bot_perms: []
}
