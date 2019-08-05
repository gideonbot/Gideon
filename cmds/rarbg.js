const Discord = module.require("discord.js");
const RarbgApi = require('rarbg')
const rarbg = new RarbgApi()

module.exports.run = async (gideon, message, args) => {
    let agc = args[0];
    if(!agc) return message.channel.send("You must supply the shows name, season and its episode number!");

    let seip = args.toString().substr(-4)
    console.log(seip);
    let season = seip[0];
    let episode = seip[2] + seip[3];
    let show = args.join(' ');
    let showtitle;
    let rbs;

    if (agc.match(/(?:flash)/i)){
        showtitle = "The Flash";
    }   else if(agc.match(/(?:arrow)/i)){
        showtitle = "Arrow";
    }   else if(agc.match(/(?:supergirl)/i)){
        showtitle = "Supergirl";
    }   else if(agc.match(/(?:legends)/i)){
        showtitle = "DC's Legends of Tomorrow";
    }   else if(agc.match(/(?:constantine)/i)){
        showtitle = "Constantine";
    }   else if(agc.match(/(?:batwoman)/i)){
        showtitle = "Batwoman"; 
    }   else if(agc.match(/(?:blacklightning)/i)){
        showtitle = "Black Lightning"; 
    }   else{
        return message.channel.send(`"${show}" is not a valid argument!\nAvailable shows: flash | arrow | supergirl | legends | constantine | batwoman | blacklightning`)
    }
        
    rbs = `${showtitle} S${season<10?"0"+season:season}E${episode}`;

    rarbg.search({
    search_string: rbs,
    sort: 'last',
    category: [rarbg.categories.TV_HD_EPISODES, rarbg.categories.TV_EPISODES],
    }).then(response => {
    console.log(response);
    
    const epdwn = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle(rbs)
    .setDescription(`:warning:Always enable a VPN before downloading!:warning:`)
    .addField(response[0].filename, `**[Magnet URI](https://${response[0].download} '${response[0].download}')**`)
    .addField(response[1].filename, `**[Magnet URI](https://${response[1].download} '${response[1].download}')**`)
    .addField(response[2].filename, `**[Magnet URI](https://${response[2].download} '${response[2].download}')**`)
    .addField(response[3].filename, `**[Magnet URI](https://${response[3].download} '${response[3].download}')**`)
    .addField(response[4].filename, `**[Magnet URI](https://${response[4].download} '${response[4].download}')**`)
    .setTimestamp()
    .setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png')
        
    message.channel.send(epdwn);

    }).catch(err => {
        if(err) return message.channel.send(`There was no result for ${rbs} on rarbg.to\nPlease try another episode instead!`)
    })
}

module.exports.help = {
    name: "rarbg"
}