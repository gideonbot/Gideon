const Discord = require("discord.js");
const Util = require("../Util");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message, args) => {
    const auth = message.author;

    const user = await gideon.shard.broadcastEval(`this.users.cache.get('${Util.getIdFromString(args[0])}').toString()`).then(results => {return results}).catch(console.error);
    console.log(user);
    if (!user) return message.channel.send('You must use a proper mention if you want to cuddle someone!');

    const cuddle = new Discord.MessageEmbed()
	.setColor('#2791D3')
    .setDescription(`**${auth} you have cuddled ${user}!**\n\nA Beebo-tastic cuddle always brightens the mood!`)
	.setImage('https://i.imgur.com/IOpmt2j.gif')
    .setFooter(Util.config.footer, gideon.user.avatarURL());
    
    message.channel.send(cuddle);
}

module.exports.help = {
    name: ["cuddle", "hug"],
    type: "fun",
    help_text: "cuddle <user>",
    help_desc: "Gives the selected user a Beebo-tastic cuddle"
}