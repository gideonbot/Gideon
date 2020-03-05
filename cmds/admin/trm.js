const Discord = require("discord.js");
const Util = require("../../Util");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message) => {
    if (message.guild.id !== '595318490240385037') return message.channel.send('This command only works at the Time Vault!\nhttps://discord.gg/h9SEQaU');
    if (!message.member.roles.cache.has('602311948809273344')) return message.channel.send('You don\'t have the required permissions to use this command!');
    else {
        let check = message.guild.roles.cache.get('596402530989375539');

        if (check.mentionable == false) {
            try {
                message.channel.send('Toggling roles, please stand by...');
                await Util.TRM(message.guild, true);
                message.channel.send('All server roles are now mentionable! :white_check_mark:');
            }
            catch (ex) {
                console.log("Caught an exception while toggling roles: " + ex);
                Util.log("Caught an exception while toggling roles: " + ex);
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
                console.log("Caught an exception while toggling roles: " + ex);
                Util.log("Caught an exception while toggling roles: " + ex);
                return message.channel.send(Util.CreateEmbed('An error occured while executing this command!'));
            }
        }
        else return message.channel.send(Util.CreateEmbed('An error occured while executing this command!'));
    }
}

module.exports.help = {
    name: "trm",
    type: "admin",
    help_text: "trm",
    help_desc: "Toggles server role mentionability"
}