const Discord = module.require("discord.js");
const RarbgApi = require('rarbg');
const rarbg = new RarbgApi();
const Util = require("../Util");

module.exports.run = async (gideon, message, args) => {
    let agc = args[0];
    if (!agc) return message.channel.send("You must supply the shows name, season and its episode number!");

    let season_and_ep = Util.parseSeriesEpisodeString(args[1]);
    if (!season_and_ep) {
        const es = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('You must supply a valid episode and season!')
        .setDescription('Acceptable formats: S00E00 and 00x00')
        .setTimestamp()
        .setFooter(Util.config.footer, gideon.user.avatarURL());
        
        return message.channel.send(es);
    }

    let showtitle = "";

    if (agc.match(/(?:flash)/i)) showtitle = "The Flash";
    else if (agc.match(/(?:arrow)/i)) showtitle = "Arrow";
    else if (agc.match(/(?:supergirl)/i)) showtitle = "Supergirl";
    else if (agc.match(/(?:legends)/i)) showtitle = "DC's Legends of Tomorrow";
    else if (agc.match(/(?:constantine)/i)) showtitle = "Constantine";
    else if (agc.match(/(?:batwoman)/i)) showtitle = "Batwoman"; 
    else if (agc.match(/(?:blacklightning)/i)) showtitle = "Black Lightning";
    //else if (agc.match(/(?:canaries)/i)) showtitle = "Green Arrow and the Canaries"; 
    //else if (agc.match(/(?:supesnlois)/i)) showtitle = "Superman & Lois"; 

    else return message.channel.send(`"${agc}" is not a valid argument!\nAvailable shows: flash | arrow | supergirl | legends | constantine | batwoman | blacklightning | canaries | supesnlois`);
        
    let rbs = `${showtitle} S${season_and_ep.season < 10 ? "0" + season_and_ep.season : season_and_ep.season}E${season_and_ep.episode < 10 ? "0" + season_and_ep.episode : season_and_ep.episode}`;

    rarbg.search({
        search_string: rbs,
        sort: 'last',
        category: [rarbg.categories.TV_HD_EPISODES, rarbg.categories.TV_EPISODES],
    }).then(response => {
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
        .setFooter(Util.config.footer, gideon.user.avatarURL());
            
        message.channel.send(epdwn);

    }).catch(err => {
        //console.log("Failed to fetch data from rarbg: " + err);
        //Util.log("Failed to fetch data from rarbg: " + err);
        message.channel.send(`There was no result for ${rbs} on rarbg.to\nPlease try another episode instead!`);
    });
}

module.exports.help = {
    name: "rarbg"
}