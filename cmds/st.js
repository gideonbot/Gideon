const Discord = module.require("discord.js");
const Imgur = require('imgur-node');
const imgclient = new Imgur.Client(process.env.IMG_CL);

module.exports.run = async (gideon, message, args) => {      
    imgclient.album.get('24lkJH6', (err, res) => {
    if (err) console.error(err);
    console.log(res);  
    let min = 0;
    let max = res.images.length - 1;
    let ranum = Math.floor(Math.random()*(max - min + 1)) + min;
    let rst = res.images[ranum].link;

    const st = new Discord.RichEmbed()
        .setColor('#2791D3')
        .setImage(rst)
        .setTimestamp()
        .setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png')

        message.channel.send(st);
  });   
}

module.exports.help = {
    name: "st"
}