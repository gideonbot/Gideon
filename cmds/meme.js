const Discord = module.require("discord.js");
const Imgur = require('imgur-node');
const imgclient = new Imgur.Client('fbe1de02978b3b4');

module.exports.run = async (gideon, message, args) => {  
    //var files = fs.readdirSync('./avm');
    //let chosenFile = files[Math.floor(Math.random() * files.length)];
      
   // const attachment = new Discord.Attachment(`./avm/${chosenFile}`, chosenFile);

    imgclient.album.get('NVHwdNg', (err, res) => {
    if (err) console.error(err);
    console.log(res);
    let ravm = res.body;
   // const type = Object.values(body.items)[0];

    const meme = new Discord.RichEmbed()
        .setColor('#2791D3')
        //.attachFile(attachment)
        .setImage(ravm)
        .setTimestamp()
        .setFooter('Gideon - The Arrowverse Bot | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

        message.channel.send(meme);
  });   
}

module.exports.help = {
    name: "meme"
}