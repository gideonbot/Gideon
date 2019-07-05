const Discord = module.require("discord.js");

module.exports.run = async (gideon, message, args) => {

    const donate = new Discord.RichEmbed()
	.setColor('#2791D3')
	.setTitle('Donations')
    .setDescription(`Donations are gladly accepted. \nPlease send them to my [Paypal.me](https://www.paypal.me/adrifcastr 'https://www.paypal.me/adrifcastr'). \nDonating supports the development, maintenance and hosting of this project. \nThank you!`)
	.setThumbnail('https://i.imgur.com/lWSoZQB.png')
    .setTimestamp()
    .setFooter('Gideon - The Arrowverse Bot | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

    message.channel.send(donate);
}

module.exports.help = {
    name: "donate"
}