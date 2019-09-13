const Discord = module.require("discord.js");
const fetch = require('node-fetch');
const Util = require("../Util");

module.exports.run = async (gideon, message, args) => {
    let agc = args[0];
    if (!agc) return message.channel.send("You must supply the shows name, season and its episode number!");

    const as = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('You must supply a valid show!')
    .setDescription('Available shows:\n**flash**\n**arrow**\n**supergirl**\n**legends**\n**constantine**\n**blacklightning**\n**batwoman**')
    .setTimestamp()
    .setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', gideon.user.avatarURL());

    const es = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('You must supply a valid episode and season!')
    .setDescription('Acceptable formats: S00E00 and 00x00')
    .setTimestamp()
    .setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', gideon.user.avatarURL());

    let info = Util.ParseStringToObj(args[1]);
    if (!info) return message.channel.send(es);

    let shows = [
        {
            id: "13",
            title: "The Flash",
            channel: 'The CW'
        },
        {
            id: "4",
            title: "Arrow",
            channel: 'The CW'
        },
        {
            id: "1850",
            title: "Supergirl",
            channel: info.season == "1" ? "CBS" : "The CW"
        },
        {
            id: "1851",
            title: "DC's Legends of Tomorrow",
            channel: 'The CW'
        },
        {
            id: "15",
            title: "Constantine",
            channel: 'NBC'
        },
        {
            id: "37776",
            title: "Batwoman",
            channel: 'The CW'
        },
        {
            id: "20683",
            title: "Black Lightning",
            channel: 'The CW'
        },
        {
            id: "av2020",
            title: "av2020",
            channel: 'The CW'
        },
    ]

    let show = shows[-1];

    if (agc.match(/(?:flash)/i)) show = shows[0];
    else if (agc.match(/(?:arrow)/i)) show = shows[1];
    else if (agc.match(/(?:supergirl)/i)) show = shows[2];
    else if (agc.match(/(?:legends)/i)) show = shows[3];
    else if (agc.match(/(?:constantine)/i)) show = shows[4];
    else if (agc.match(/(?:batwoman)/i)) show = shows[5];
    else if (agc.match(/(?:blacklightning)/i)) show = shows[6];
    else if (agc.match(/(?:av2020)/i)) show = shows[7];
    else return message.channel.send(as);
    if (!show) return message.channel.send(as);

    const api = `http://api.tvmaze.com/shows/${show.id}/episodebynumber?season=${info.season}&number=${info.episode}`;
    
    const body = await fetch(api).then(res => res.json());
    if (body.status == 404) return message.channel.send(`There was no data for this episode!`).catch(console.error);

    let airdate = new Date(body.airdate);
    let airtime = body.airtime;
    let desc = !body.summary ? 'No summary available' : body.summary.replace("<p>", "").replace("</p>", "");
    let img = body.image.original;           

    let timeString = airtime;
    let H = timeString.split(":")[0];
    let h = H % 12 || 12;
    let am_pm = (H < 12 || H === 24) ? " AM" : " PM";
    timeString = h + ":" + timeString.split(":")[1] + am_pm;

    const epinfo = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle(`${show.title} ${body.season}x${body.number < 10 ? "0" + body.number : body.number} - ${body.name}`)
    .setDescription(desc + `\n\nAirdate: \`${airdate.toDateString()}\`\nAirtime: \`${timeString + ' ET'}\`\nRuntime: \`${body.runtime} Minutes\`\nChannel: \`${show.channel}\`\n\n**[Click here to read the full recap and watch the episode's trailer](${body.url} '${body.url}')**`)
    .setImage(img)     
    .setTimestamp()
    .setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', gideon.user.avatarURL());

    message.channel.send(epinfo);
}
module.exports.help = {
    name: "ep"
}