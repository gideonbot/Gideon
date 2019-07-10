const Discord = module.require("discord.js");
const imgur = require('imgur-node');
const client = new Imgur.Client('fbe1de02978b3b4');

module.exports.run = async (gideon, message, args) => {  
    //var files = fs.readdirSync('./avm');
    //let chosenFile = files[Math.floor(Math.random() * files.length)];
      
   // const attachment = new Discord.Attachment(`./avm/${chosenFile}`, chosenFile);

    

    const meme = new Discord.RichEmbed()
        .setColor('#2791D3')
        //.attachFile(attachment)
        //.setImage(`attachment://${chosenFile}`)
        .setTimestamp()
        .setFooter('Gideon - The Arrowverse Bot | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

        message.channel.send(meme);
}

module.exports.help = {
    name: "meme"
}