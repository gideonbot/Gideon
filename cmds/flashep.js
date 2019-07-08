const Discord = module.require("discord.js");
const snekfetch = require("snekfetch");

module.exports.run = async (gideon, message, args) => {
    const api = `http://api.tvmaze.com/shows/13/episodebynumber?season=5&number=22`;

    snekfetch.get(api).then(r => {
        console.log(r.body);
        let body = r.body;   
        const flashep = new Discord.RichEmbed()
        .setTitle(`The Flash ${body.season}x${body.number} - ${result.name}`)
        .setColor('#2791D3')
        .setTimestamp()
        .setFooter('Gideon - The Arrowverse Bot | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

        message.channel.send(flashep);
    });
}
module.exports.help = {
    name: "flashep"
}