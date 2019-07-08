const Discord = module.require("discord.js");
const tvmaze = require('tvmaze-api-ts')

module.exports.run = async (gideon, message, args) => {  
    tvmaze.shows.episodebynumber('1', '1', '1').then(result => {
        // code
      })
    const flahsep = new Discord.RichEmbed()
        .setColor('#2791D3')
        .attachFile(attachment)
        .setImage(`attachment://${chosenFile}`)
        .setTimestamp()
        .setFooter('Gideon - The Arrowverse Bot | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

        message.channel.send(flashep);
}

module.exports.help = {
    name: "flashep"
}