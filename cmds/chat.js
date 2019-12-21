const Discord = module.require("discord.js");
const Util = require("../Util");
const cleverbot = require("cleverbot-free");

module.exports.run = async (gideon, message, args) => {     
    try{
        const text = args.join(' ');
        cleverbot(text).then(response => message.channel.send(response));
    }
    catch(ex){
        const er = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('An error occured while processing your request:')
        .setDescription(`\`\`\`\n${ex.stack}\n\`\`\``)
        .setTimestamp()
        .setFooter(Util.config.footer, gideon.user.avatarURL());
        return message.channel.send(er);
    }
}

module.exports.help = {
    name: ["chat", "talk"],
    type: "fun",
    help_text: "chat",
    help_desc: "Chat with an AI"
}