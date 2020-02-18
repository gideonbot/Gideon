const Discord = module.require("discord.js");
const Util = require("../Util");

module.exports.run = async (gideon, message, args) => {
    const cembed = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('Contact:')
    .setDescription(`Discord: [adrifcastr#4530](https://discordapp.com/channels/@me/224617799434108928/ 'https://discordapp.com/channels/@me/224617799434108928/')\nServer: [Time Vault](https://discord.gg/h9SEQaU 'https://discord.gg/h9SEQaU')\nEmail: adrifcastr@gmail.com`)
    .setFooter(Util.config.footer, gideon.user.avatarURL());

    message.channel.send(cembed);  
}

module.exports.help = {
    name: ["contact", "about"],
    type: "misc",
    help_text: "contact",
    help_desc: "Displays contact info"
}