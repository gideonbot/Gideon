const Discord = require("discord.js");
const Util = require("../../Util");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message) => {
    if (!message.member.hasPermission('MANAGE_ROLES')) return message.reply('You don\'t have the required permissions to use this command!');
    if (!message.channel.permissionsFor(message.guild.me).has('MANAGE_ROLES')) return message.reply('sorry can\'t do that without `MANAGE_ROLES`!');
    else {
        let check = message.guild.roles.cache.random();

        if (check.mentionable == false) {
            try {
                message.channel.send('Toggling roles, please stand by...');
                await Util.TRM(message.guild, true);
                message.channel.send('All server roles are now mentionable! :white_check_mark:');
            }
            catch (ex) {
                console.log("Caught an exception while toggling roles: " + ex.stack);
                Util.log("Caught an exception while toggling roles: " + ex.stack);
                return message.channel.send(Util.CreateEmbed('An error occured while executing this command!'));
            }
        }
        else if (check.mentionable) {
            try {
                message.channel.send('Toggling roles, please stand by...');
                await Util.TRM(message.guild, false);
                message.channel.send('All server roles are now no longer mentionable! :white_check_mark:');
            }
            catch (ex) {
                console.log("Caught an exception while toggling roles: " + ex.stack);
                Util.log("Caught an exception while toggling roles: " + ex.stack);
                return message.channel.send(Util.CreateEmbed('An error occured while executing this command!'));
            }
        }
        else return message.channel.send(Util.CreateEmbed('An error occured while executing this command!'));
    }
}

module.exports.help = {
    name: "trm",
    type: "admin",
    help_text: "trm <:perms:686681300156940349>",
    help_desc: "Toggles server role mentionability"
}