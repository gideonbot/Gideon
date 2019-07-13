const Discord = module.require("discord.js");
const snekfetch = require("snekfetch");

module.exports.run = async (gideon, message, args) => {
    const flashapi = 'http://api.tvmaze.com/shows/13?embed=nextepisode';
    const arrowapi = 'http://api.tvmaze.com/shows/4?embed=nextepisode';
    const supergirlapi = 'http://api.tvmaze.com/shows/1850?embed=nextepisode';
    const legendsapi = 'http://api.tvmaze.com/shows/1851?embed=nextepisode';
    const bwomanapi = 'http://api.tvmaze.com/shows/37776?embed=nextepisode';

    snekfetch.get(flashapi).then(r => {
        console.log(r.body);
        let body = r.body;   

        const flatitle = body.name;
        const flaseason = body._embedded.season;
        const flanumber = body._embedded.number;
        const flaepname = body._embedded.name;

        function getDayName(dateStr, locale)
        {
        let date = new Date(dateStr);
        return date.toLocaleDateString(locale, { weekday: 'long' });        
        }

        let dateStr = '1400796000';
        var day = getDayName(dateStr, "nl-NL");

        const countdown = new Discord.RichEmbed()
	    .setColor('#2791D3')
	    .setTitle('__Upcoming episodes:__')
        .addTitle(`${flatitle} ${flaseason}x${flanumber<10?"0"+flanumber:flanumber} - ${flaepname}`, `airs on ${fladate} at ${flatime} on ${flachannel}`)
        //.addTitle(`${artitle} ${areason}x${arnumber<10?"0"+arnumber:arnumber} - ${arepname}`)
        //.addTitle(`${sgtitle} ${sgeason}x${sgnumber<10?"0"+sgnumber:sgnumber} - ${sgepname}`)
        //.addTitle(`${lgtitle} ${lgseason}x${lgnumber<10?"0"+lgnumber:lgnumber} - ${lgepname}`)
        //.addTitle(`${bwtitle} ${bwseason}x${bwnumber<10?"0"+bwnumber:bwnumber} - ${bwname}`)
	    .setThumbnail()
    	.setTimestamp()
    	.setFooter('Gideon - The Arrowverse Bot | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

        message.channel.send(countdown); 
    });       
}

module.exports.help = {
    name: "cd"
}