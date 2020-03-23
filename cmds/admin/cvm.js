const Discord = require("discord.js");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message) => {   
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You don\'t have the required permissions to use this command!');
    if (!message.channel.permissionsFor(message.guild.me).has('MANAGE_MESSAGES')) return message.reply('sorry can\'t do that without `MANAGE_MESSAGES`!');
    
    let cvm = gideon.getCVM.get(message.guild.id);
    if (!cvm) {
        cvm = {
            guild: message.guild.id,
            cvmval: 0,
        }
    }

    if (cvm.cvmval === 0) {
        cvm.cvmval = 1;
        gideon.setCVM.run(cvm);
        message.reply('Crossover-Mode enabled! :white_check_mark:');
    }

    else {
        cvm.cvmval = 0;
        gideon.setCVM.run(cvm);
        message.reply('Crossover-Mode disabled! :white_check_mark:');
    } 
}

module.exports.help = {
    name: "cvm",
    type: "admin",
    help_text: "cvm <:perms:686681300156940349>",
    help_desc: "Toggles crossover mode"
}