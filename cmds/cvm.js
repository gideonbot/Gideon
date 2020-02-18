const Discord = require("discord.js");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message, args) => {   
    if (message.guild.id !== '595318490240385037') return message.channel.send('This command only works at the Time Vault!\nhttps://discord.gg/h9SEQaU');
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You don\'t have the required permissions to use this command!');

    if (!gideon.cvmt) {
        gideon.cvmt = true;
        message.reply('Crossover Mode enabled! :white_check_mark:');
        return;
    }
    if (gideon.cvmt) {
        gideon.cvmt = false;
        message.reply('Crossover Mode disabled! :white_check_mark:');
        return;
    } 
}

module.exports.help = {
    name: "cvm",
    type: "admin",
    help_text: "cvm",
    help_desc: "Toggles crossover mode"
}