import Discord from "discord.js";
import Util from "../../Util.js";

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(gideon, message, args) {
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
                return message.channel.send(Util.CreateEmbed('An error occured while executing this command!', null, message.member));
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
                return message.channel.send(Util.CreateEmbed('An error occured while executing this command!', null, message.member));
            }
        }
        else return message.channel.send(Util.CreateEmbed('An error occured while executing this command!', null, message.member));
    }

export const help = {
    name: "trm",
    type: "admin",
    help_text: "trm <:perms:686681300156940349>",
    help_desc: "Toggles server role mentionability",
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: ['MANAGE_ROLES'],
    bot_perms: ['MANAGE_ROLES']
}