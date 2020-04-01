const Discord = require("discord.js");
const Util = require("../../Util");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message, args) => {
    try {
        if (args[0].match(/(?:default)/i)) {
            const defaultprefix = {
                guild: message.guild.id,
                prefix: '!',
            }
            gideon.setPrefix.run(defaultprefix);
            message.reply(`restored the default prefix: \`${defaultprefix.prefix}\`:white_check_mark:`);
        }

        else {
            const customprefix = {
                guild: message.guild.id,
                prefix: args[0],
            }
            gideon.setPrefix.run(customprefix);
            message.reply(`set custom prefix to: \`${customprefix.prefix}\`:white_check_mark:`);
        }
    }
    
    catch (ex) {
        console.log("Caught an exception while running prefix.js: " + ex.stack);
        Util.log("Caught an exception while running prefix.js: " + ex.stack);
        return message.channel.send(Util.CreateEmbed('An error occured while executing this command!'));
    }      
}

module.exports.help = {
    name: "prefix",
    type: "admin",
    help_text: "prefix [default] <prefix>",
    help_desc: "Set custom prefix",
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {force: true, amount: 1},
    roles: [],
    user_perms: ['MANAGE_GUILD'],
    bot_perms: []
}
