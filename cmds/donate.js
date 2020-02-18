const Discord = require("discord.js");
const Util = require("../Util");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message, args) => {
    const donate = new Discord.MessageEmbed()
	.setColor('#2791D3')
	.setTitle('Donations')
    .setDescription(`Donations are gladly accepted. \nPlease send them to one of the options below. \nDonating supports the development, maintenance and hosting of this project. \nThank you!`)
    .addField('PayPal', `[Paypal.me](https://www.paypal.me/adrifcastr 'https://www.paypal.me/adrifcastr')`)
    .addField('Patreon', `[Patreon.com](https://www.patreon.com/gideonbot 'https://www.patreon.com/gideonbot')`)
	.setThumbnail('https://i.imgur.com/f3fvsRe.png')
    .setFooter(Util.config.footer, gideon.user.avatarURL());

    message.channel.send(donate);
}

module.exports.help = {
    name: ["donate", "paypal", "patreon"],
    type: "misc",
    help_text: "donate",
    help_desc: "Displays info to support maintainance and hosting of Gideon"
}