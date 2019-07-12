const Discord = module.require("discord.js");

module.exports.run = async (gideon, message, args) => {      
    message.channel.send("Engaging S.T.A")

    const explosion = new Discord.RichEmbed()
        .setColor('#2791D3')
        .setImage(ravm)
        .setTimestamp()
        .setFooter('Gideon - The Arrowverse Bot | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

        message.channel.send(explosion);
  });   
}

module.exports.help = {
    name: "accelerator"
}