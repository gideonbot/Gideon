const Discord = require("discord.js");
const Util = require("../../Util");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message, args) => {
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
    help_desc: "Deletes the specified amount of messages in the current channel",
    owner: false,
    voice: false,
    timevault: false,
    roles: [],
    user_perms: ['MANAGE_MESSAGES'],
    bot_perms: ['MANAGE_MESSAGES']
}
