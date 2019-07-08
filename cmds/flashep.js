const Discord = module.require("discord.js");
const snekfetch = require("snekfetch");

module.exports.run = async (gideon, message, args) => {
    //let input = args.join(' ').substr(-4)
    let season = "5"//input[0];
    let episode = "22"//input[2] + args[3];
    const api = `http://api.tvmaze.com/shows/13/episodebynumber?season=${season}&number=${episode}`;
    let sen = args[0];
    //if(!sen) return message.channel.send("You must supply the season and episode number!");

    snekfetch.get(api).then(r => {
        console.log(r.body);
        let body = r.body;   
        let airdate = new Date(body.airstamp);
        let desc

        const flashep = new Discord.RichEmbed()
        .setColor('#2791D3')
        .setTitle(`The Flash ${body.season}x${body.number<10?"0"+body.number:body.number} - ${body.name}`)
        .setDescription(body.summary.substring(3) + `\n\nAirdate: \`${airdate.toUTCString()}\` \nRuntime: \`${body.runtime} Minutes\``)
        .setThumbnail(body.original)     
        .setTimestamp()
        .setFooter('Gideon - The Arrowverse Bot | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

        message.channel.send(flashep);
    });
}
module.exports.help = {
    name: "flashep"
}