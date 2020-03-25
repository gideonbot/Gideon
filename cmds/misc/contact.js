const Discord = module.require("discord.js");
const Util = require("../../Util");

module.exports.run = async (gideon, message) => {
    message.channel.send(Util.CreateEmbed('Contact:', {
        description: `Server: [Time Vault](https://discord.gg/h9SEQaU 'https://discord.gg/h9SEQaU')\nEmail: adrifcastr@gmail.com`
    }));  
}

module.exports.help = {
    name: ["contact", "about"],
    type: "misc",
    help_text: "contact",
    help_desc: "Displays contact info",
    owner: false,
    timevault: false,
    roles: [],
    user_perms: [],
    bot_perms: []
}