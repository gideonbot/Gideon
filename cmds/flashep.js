const Discord = module.require("discord.js");
const tvmaze = require('tvmaze-api-ts')

module.exports.run = async (gideon, message, args) => {  
    tvmaze.shows.episodebynumber('13', '5', '14').then(result => {
        const flashep = new Discord.RichEmbed()
        .setT
        .setColor('#2791D3')
        .setTimestamp()
        .setFooter('Gideon - The Arrowverse Bot | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

        message.channel.send(flashep);
      })  
}

module.exports.help = {
    name: "flashep"
}