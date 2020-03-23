const Discord = require("discord.js");
const Util = require("../../Util");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message, args) => {
    const as = Util.CreateEmbed("You must supply valid input!");

    if (message.author.id !== gideon.owner) {
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply('You don\'t have the required permissions to use this command!');
    }
    
    if (!message.channel.permissionsFor(message.guild.me).has('MANAGE_CHANNELS')) return message.reply('sorry can\'t do that without `MANAGE_CHANNELS`!');

    try {
        if (isNaN(args[0])) {
            if (isNaN(args[1])) return message.channel.send(as);
            if (!message.mentions.channels.first()) return message.channel.send(as);
            await message.mentions.channels.first().setRateLimitPerUser(args[1]);
            await message.reply(`set ratelimit for ${message.mentions.channels.first()} to \`${args[1]}\` ${args[1] == 1 ? 'second' : 'seconds'}!`);
        }
    
        else {
            await message.channel.setRateLimitPerUser(args[0]);
            await message.reply(`set ratelimit for ${message.channel} to \`${args[0]}\` ${args[0] == 1 ? 'second' : 'seconds'}!`);
        }
    }
    
    catch (ex) {
        console.log("Caught an exception while running slowmode.js: " + ex);
        Util.log("Caught an exception while running slowmode.js: " + ex);
        return message.channel.send(Util.CreateEmbed('An error occured while executing this command!'));
    }      
}

module.exports.help = {
    name: ["slowmode", "slowmo", "slow", "sm"],
    type: "admin",
    help_text: "slowmode [channel] <seconds> <:perms:686681300156940349>",
    help_desc: "Enables slowmode"
}