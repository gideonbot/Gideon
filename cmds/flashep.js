const Discord = module.require("discord.js");
const snekfetch = require("snekfetch");

module.exports.run = async (gideon, message, args) => {
    const api = `http://api.tvmaze.com/shows/13/episodebynumber?season=5&number=01`;
    let sen = args[0];
    //if(!sen) return message.channel.send("You must supply the season and episode number!");

    snekfetch.get(api).then(r => {
        console.log(r.body);
        let body = r.body;   
        let airdate = new Date(body.airstamp);
        const epn = body.number;

        const flashep = new Discord.RichEmbed()
        .setColor('#2791D3')
        .setTitle(`The Flash ${body.season}x${body.number.padStart(2, '0')} - ${body.name}`)
        .setDescription(body.summary + `\n\nAirdate: \`${airdate.toUTCString()}\` \nRuntime: \`${body.runtime} Minutes\``)
        .setImage(body.original)     
        .setTimestamp()
        .setFooter('Gideon - The Arrowverse Bot | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

        message.channel.send(flashep);
    });
}
module.exports.help = {
    name: "flashep"
}