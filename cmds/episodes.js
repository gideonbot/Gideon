const Discord = module.require("discord.js");
const snekfetch = require("snekfetch");

module.exports.run = async (gideon, message, args) => {
    let input = args.toString().substr(-4)
    let season = input[0];
    let episode = input[2] + input[3];
    const flashapi = `http://api.tvmaze.com/shows/13/episodebynumber?season=${season}&number=${episode}`;
    let sen = args[0];
    if(!sen) return message.channel.send("You must supply the shows name, season and its episode number!");

    snekfetch.get(flashapi).then(r => {
        console.log(r.body);
        let body = r.body;   
        let airdate = new Date(body.airstamp);
        let sum1 = body.summary.substring(3);
        let sum= sum1.substring(0, sum1.length - 4);

        const flashep = new Discord.RichEmbed()
        .setColor('#2791D3')
        .setTitle(`The Flash ${body.season}x${body.number<10?"0"+body.number:body.number} - ${body.name}`)
        .setDescription(sum + `\n\nAirdate: \`${airdate.toUTCString()}\` \nRuntime: \`${body.runtime} Minutes\``)
        .setThumbnail(body.image.original)     
        .setTimestamp()
        .setFooter('Gideon - The Arrowverse Bot | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

        message.channel.send(flashep);
    });
}
module.exports.help = {
    name: "ep"
}