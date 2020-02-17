const Discord = module.require("discord.js");
const Util = require("../Util");

module.exports.run = async (gideon, message, args) => {      
    message.channel.send('http://gideonbot.co.vu');
}

module.exports.help = {
    name: ['website', 'web', 'url', 'homepage'],
    type: "misc",
    help_text: "website",
    help_desc: "Displays a link to Gideons homepage"
}