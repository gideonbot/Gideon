const Discord = module.require("discord.js");
const Util = require("../Util");

module.exports.run = async (gideon, message, args) => {
    if (message.guild.id !== '595318490240385037') return message.channel.send('This command only works at the Time Vault!\nhttps://discord.gg/h9SEQaU');
    if (!message.member.roles.has('602311948809273344')) return message.channel.send('You don\'t have the required permissions to use this command!');
    else {
        const er = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('An error occured while executing this command!')
        .setTimestamp()
        .setFooter(Util.config.footer, gideon.user.avatarURL());
    
        let check = message.guild.roles.get('596402530989375539');

        if (check.mentionable == false){
            try {
                message.channel.send('Toggling roles, please stand by...');
                await Util.TRM(message.guild, true);
                message.channel.send('All server roles are now mentionable! :white_check_mark:');
            }
            catch (ex) {
                console.log("Caught an exception while toggling roles: " + ex);
                Util.log("Caught an exception while toggling roles: " + ex);
                return message.channel.send(er);
            }
        }
        else if (check.mentionable == true){
            try {
                message.channel.send('Toggling roles, please stand by...');
                await Util.TRM(message.guild, false);
                message.channel.send('All server roles are now no longer mentionable! :white_check_mark:');
            }
            catch (ex) {
                console.log("Caught an exception while toggling roles: " + ex);
                Util.log("Caught an exception while toggling roles: " + ex);
                return message.channel.send(er);
            }
        }
        else {
            return message.channel.send(er);
        }
    }
}

module.exports.help = {
    name: "trm",
    type: "admin",
    help_text: "trm",
    help_desc: "Toggles server role mentionability"
}