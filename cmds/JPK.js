const Discord = module.require("discord.js");
const Imgur = require('imgur-node');
const imgclient = new Imgur.Client(process.env.IMG_CL);

module.exports.run = async (gideon, message, args) => {     
    const jpkArray = ["FqCwt1J", "8bFXk0z", "2yz4RWt", "kxpGHYM", "f8mENXa", "Xy2SoEw", "UcPxCV5", "JhTWxoJ", "eLugrZD"];
    const jpkas = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('You can choose an album!')
    .setDescription('Currently available:')
    .addField('!JPK', 'All Albums')
    .addField('!JPK GN', 'General')
    .addField('!JPK TF', 'The Flash')
    .addField('!JPK BS', 'Black Sails')
    .addField('!JPK AKOW', 'Another Kind of Wedding')
    .addField('!JPK NW', 'Nearlyweds')
    .addField('!JPK DM', 'Deep Murder')
    .addField('!JPK TSC', 'The Secret Circle')
    .addField('!JPK ILBAL', 'I Love Bekka & Lucy')
    .addField('!JPK FS5GR', 'The Flash - S5 Gag Reel')
    .setTimestamp()
    .setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', gideon.user.avatarURL())

    let rjpka;  

  if(!args[0]){
      rjpka = jpkArray[Math.floor(Math.random()*jpkArray.length)];
    }else if(args[0].match(/(?:help)/i)){
      return message.channel.send(jpkas);
    }else if(args[0].match(/(?:gn)/i)){
      rjpka = "FqCwt1J";
    }else if(args[0].match(/(?:tf)/i)){
      rjpka = "JhTWxoJ";
    }else if(args[0].match(/(?:bs)/i)){
      rjpka = "2yz4RWt";
    }else if(args[0].match(/(?:akow)/i)){
      rjpka = "8bFXk0z";
    }else if(args[0].match(/(?:nw)/i)){
      rjpka = "Xy2SoEw";
    }else if(args[0].match(/(?:dm)/i)){
      rjpka = "kxpGHYM";
    }else if(args[0].match(/(?:tsc)/i)){
      rjpka = "UcPxCV5";
    }else if(args[0].match(/(?:ilbal)/i)){
      rjpka = "f8mENXa";
    }else if(args[0].match(/(?:fs5gr)/i)){
      rjpka = "eLugrZD";
    }else{
        return message.channel.send(`${args[0]} is not a valid argument!`);
    }  

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
      .setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', gideon.user.avatarURL())
  
      message.channel.send(jpk);
    });  
}

module.exports.help = {
    name: "jpk"
}