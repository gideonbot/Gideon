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
    const ravm = res.images.id['ETHKmjx'].link;

  });

    
}

module.exports.help = {
    name: "meme"
}