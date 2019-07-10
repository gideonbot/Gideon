const Discord = module.require("discord.js");
const fs = require("fs");

module.exports.run = async (gideon, message, args) => {  
    //var files = fs.readdirSync('./avm');
    //let chosenFile = files[Math.floor(Math.random() * files.length)];
      
   // const attachment = new Discord.Attachment(`./avm/${chosenFile}`, chosenFile);

    const api = `https://api.imgur.com/3/album/NVHwdNg/images`;
    
    snekfetch.get(api).then(r => {
        console.log(r.body);
        let body = r.body;   

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