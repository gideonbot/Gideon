const Discord = require("discord.js");
const Util = require("../../Util");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message, args) => {
    if (message.author.id !== gideon.owner) {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('You don\'t have the required permissions to use this command!');
    }

    if (!message.channel.permissionsFor(message.guild.me).has('MANAGE_MESSAGES')) return message.reply('sorry can\'t do that without `MANAGE_MESSAGES`!');
    
    const msgamt = args[0];
    if (!msgamt) return await Util.delay(200), await message.channel.bulkDelete(2);
    
    if (isNaN(msgamt)) return message.reply('you must supply a valid number!');
    if (msgamt > 100) return message.reply('max value is `100`.');

    await message.delete({ timeout: 200 });
    await message.channel.bulkDelete(msgamt);
}

module.exports.help = {
    name: ["purge", "delete", "remove"],
    type: "admin",
    help_text: "purge <amount> <:perms:686681300156940349>",
    help_desc: "Deletes the specified amount of messages in the current channel"
}
