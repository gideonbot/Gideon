const Util = require("../Util");

module.exports.run = async (gideon, message, args) => {
    if (message.guild.id !== '595318490240385037') return message.channel.send('This command only works at the Time Vault!\nhttps://discord.gg/h9SEQaU');
    if (!message.member.roles.has('602311948809273344')) return message.channel.send('You don\'t have the required permissions to use this command!');
    else {
        await Util.makeRolesMentionableOrNot(message.guild, true);
        message.channel.send('The DCTV roles are now mentionable! :white_check_mark:');
    }
}

module.exports.help = {
    name: "edm"
}