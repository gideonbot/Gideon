const Discord = require("discord.js");
const Util = require("../Util");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message, args) => {
    if (message.author.id !== gideon.owner) {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('You don\'t have the required permissions to use this command!');
    }
    
    const msgamt = args[0];
    if (!msgamt) return await Util.delay(200), message.channel.bulkDelete(2);

    await Util.delay(200);
    message.delete();
    
    if (isNaN(msgamt)) return message.reply('you must supply a valid number!');
    if (msgamt > 100) return message.reply('max value is `100`.');

    message.channel.bulkDelete(msgamt);
}

module.exports.help = {
    name: ["purge", "delete", "remove"],
    type: "admin",
    help_text: "purge",
    help_desc: "Deletes the specified amount of messages in the current channel"
}