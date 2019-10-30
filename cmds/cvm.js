const Discord = module.require("discord.js");

module.exports.run = async (gideon, message, args) => {   
    if (message.guild.id !== '595318490240385037') return message.channel.send('This command only works at the Time Vault!\nhttps://discord.gg/h9SEQaU');
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You don\'t have the required permissions to use this command!');

    if (!gideon.crossoverMode) {
        gideon.crossoverMode = true;
        message.reply('Crossover Mode enabled! :white_check_mark:');
        return;
    }
    if (gideon.crossoverMode) {
        gideon.crossoverMode = false;
        message.reply('Crossover Mode disabled! :white_check_mark:');
        return;
    } 
}

module.exports.help = {
    name: "cvm"
}