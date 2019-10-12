const Discord = module.require("discord.js");
const main = require("../index.js");

module.exports.run = async (gideon, message, args) => {   
    if (message.guild.id !== '595318490240385037') return message.channel.send('This command only works at the Time Vault!\nhttps://discord.gg/h9SEQaU');
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You don\'t have the required permissions to use this command!');

    if (main.cvmg.cvmt == false) {
        console.log(main.cvmt);
        main.cvmt = true;
        message.reply('Crossover Mode enabled! :white_check_mark:');
        console.log(main.cvmt);
        return;
    }
    if (main.cvmt == true) {
        main.cvmt = false;
        message.reply('Crossover Mode disabled! :white_check_mark:');
        console.log(main.cvmt);
        return;
    } 
}

module.exports.help = {
    name: "cvm"
}