const Discord = module.require("discord.js");
const Imgur = require('imgur-node');
const imgclient = new Imgur.Client(process.env.IMG_CL);

module.exports.run = async (gideon, message, args) => {     

    imgclient.album.get('SaHLa7c', (err, res) => {
    if (err) console.error(err);
    let min = 0;
    let max = res.images.length - 1;
    let ranum = Math.floor(Math.random()*(max - min + 1)) + min;
    let rec = res.images[ranum].link;

    const ec = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setImage(rec)
    .setTimestamp()
    .setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', gideon.user.avatarURL())

    message.channel.send(ec);
  });   
}

module.exports.help = {
    name: "ec"
}