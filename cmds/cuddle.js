const Discord = module.require("discord.js");
const Util = require("../Util");

module.exports.run = async (gideon, message, args) => {
    const auth = message.author;

    const user = gideon.users.get(Util.getIdFromString(args[0]));
    if (!user) return message.channel.send('You must use a proper mention if you want to cuddle someone!');

    const cuddle = new Discord.MessageEmbed()
	.setColor('#2791D3')
    .setDescription(`**${auth} you have cuddled ${user}!**\n\nA Beebo-tastic cuddle always brightens the mood!`)
	.setImage('https://i.imgur.com/IOpmt2j.gif')
    .setTimestamp()
    .setFooter(Util.config.footer, gideon.user.avatarURL());
    
    message.channel.send(cuddle);
}

module.exports.help = {
    name: ["cuddle", "hug"],
    type: "fun",
    help_text: "cuddle <user>",
    help_desc: "Gives the selected user a Beebo-tastic cuddle"
}