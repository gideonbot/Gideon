const Discord = require("discord.js");
const Util = require("../../Util");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message, args) => {
    if (!message.member.roles.cache.has('621399916283035658')) return message.channel.send('You don\'t have the required permissions to use this command!');
    
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

module.exports.help = {
    name: ["backup", "bkup"],
    type: "admin",
    help_text: "backup `@Gideon Dev Team`",
    help_desc: "Performs a database backup"
}
