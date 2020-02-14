const Discord = module.require("discord.js");
const Util = require("../Util");

module.exports.run = async (gideon, message, args) => {
    const er = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('An error occured while executing this command!')
    .setFooter(Util.config.footer, gideon.user.avatarURL());

    const uid = message.author.id;
    let value = false
    if (!gideon.trmode.get(uid)) gideon.trmode.set(uid, value);
    
    let check = gideon.trmode.get(uid);

    if (check === false) {
        let value = true;
        gideon.trmode.set(uid, value);
        message.reply('Translation Mode enabled! :white_check_mark:');
        return;
    }
    if (check === true) {
        let value = false;
        gideon.trmode.set(uid, value);
        message.reply('Translation Mode disabled! :white_check_mark:');
        return;
    } 
    else {
        return message.channel.send(er);
    }
}

module.exports.help = {
    name: "trmode",
    type: "misc",
    help_text: "trmode",
    help_desc: "Toggles translation mode"
}