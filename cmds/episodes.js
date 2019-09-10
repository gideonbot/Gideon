const Discord = module.require("discord.js");
const fetch = require('node-fetch');

module.exports.run = async (gideon, message, args) => {
    let agc = args[0];
    if (!agc) return message.channel.send("You must supply the shows name, season and its episode number!");

    const as = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('You must supply a valid show!')
    .setDescription('Available shows:\n**flash**\n**arrow**\n**supergirl**\n**legends**\n**constantine**\n**blacklightning**\n**batwoman**')
    .setTimestamp()
    .setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', gideon.user.avatarURL())

    let seip = args.toString().substr(-4)
    let season = seip[0];
    let episode = seip[2] + seip[3];
    let showid;
    let showtitle;
    let channel;

    if (agc.match(/(?:flash)/i)) {
        showid = "13";
        showtitle = "The Flash";
        channel = 'The CW';
    } else if (agc.match(/(?:arrow)/i)) {
        showid = "4";
        showtitle = "Arrow";
        channel = 'The CW'
    } else if (agc.match(/(?:supergirl)/i)) {
        showid = "1850";
        showtitle = "Supergirl";
        if (season === '1') channel = 'CBS';
        else channel = 'The CW';
    } else if (agc.match(/(?:legends)/i)) {
        showid = "1851"
        showtitle = "DC's Legends of Tomorrow";
        channel = 'The CW';
    } else if (agc.match(/(?:constantine)/i)) {
        showid = "15";
        showtitle = "Constantine";
        channel = 'NBC';
    } else if (agc.match(/(?:batwoman)/i)) {
        showid = "37776";
        showtitle = "Batwoman"; 
        channel = 'The CW';
    } else if (agc.match(/(?:blacklightning)/i)) {
        showid = "20683";
        showtitle = "Black Lightning"; 
        channel = 'The CW';
    } else if (agc.match(/(?:av2020)/i)) {
        showid = "av2020";
        showtitle = "av2020"; 
        channel = 'The CW';
    }
    else return message.channel.send(as);  

    const api = `http://api.tvmaze.com/shows/${showid}/episodebynumber?season=${season}&number=${episode}`;
    
    const body = await fetch(api).then(res => res.json());
    if (body.status == 404) return message.channel.send(`There was no data for this episode!`).catch(console.error);

    let airdate = new Date(body.airdate);
    let airtime = body.airtime;
    let desc;
    let img;

    if (body.summary === null) desc = 'No summary available';
    else {
        let sum = body.summary.substring(3);
        desc = sum.substring(0, sum.length -4); 
        img = body.image.original;
    }             

    let timeString = airtime;
    let H = + timeString.substr(0, 2);
    let h = H % 12 || 12;
    let ampm = (H < 12 || H === 24) ? " AM" : " PM";
    timeString = h + timeString.substr(2, 3) + ampm;

    const epinfo = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle(`${showtitle} ${body.season}x${body.number < 10 ? "0" + body.number : body.number} - ${body.name}`)
    .setDescription(desc + `\n\nAirdate: \`${airdate.toDateString()}\`\nAirtime: \`${timeString + ' ET'}\`\nRuntime: \`${body.runtime} Minutes\`\nChannel: \`${channel}\`\n\n**[Click here to read the full recap and watch the episode's trailer](${body.url} '${body.url}')**`)
    .setImage(img)     
    .setTimestamp()
    .setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', gideon.user.avatarURL());

    message.channel.send(epinfo);
}
module.exports.help = {
    name: "ep"
}