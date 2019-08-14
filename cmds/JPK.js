const Discord = module.require("discord.js");
const Imgur = require('imgur-node');
const imgclient = new Imgur.Client(process.env.IMG_CL);

module.exports.run = async (gideon, message, args) => {     
    const jpkArray = ["FqCwt1J", "8bFXk0z", "2yz4RWt", "kxpGHYM", "f8mENXa", "Xy2SoEw", "UcPxCV5", "JhTWxoJ"];
      
    let rjpka = jpkArray[Math.floor(Math.random()*jpkArray.length)]; 

    imgclient.album.get(rjpka, (err, res) => {
    if (err) console.error(err);
    let min = 0;
    let max = res.images.length - 1;
    let ranum = Math.floor(Math.random()*(max - min + 1)) + min;
    let rjpk = res.images[ranum].link;

    const jpk = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setImage(rjpk)
    .setTimestamp()
    .setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png')

    message.channel.send(jpk);
  });   
}

module.exports.help = {
    name: "jpk"
}