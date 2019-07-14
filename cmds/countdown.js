const Discord = module.require("discord.js");
const snekfetch = require("snekfetch");

module.exports.run = async (gideon, message, args) => {
    const flashapi = 'http://api.tvmaze.com/shows/13?embed=nextepisode';
    const arrowapi = 'http://api.tvmaze.com/shows/4?embed=nextepisode';
    const supergirlapi = 'http://api.tvmaze.com/shows/1850?embed=nextepisode';
    const legendsapi = 'http://api.tvmaze.com/shows/1851?embed=nextepisode';
    const bwomanapi = 'http://api.tvmaze.com/shows/37776?embed=nextepisode';
    const oneDay = 24*60*60*1000;
    const today = new Date()
    let d;

    snekfetch.get(flashapi).then(r => {
        console.log(r.body);
        let body = r.body;   

        const flatitle = body.name;
        const flaseason = body._embedded.nextepisode.season;
        const flanumber = body._embedded.nextepisode.number;
        const flaepname = body._embedded.nextepisode.name;
        const fladate = body._embedded.nextepisode.airdate;
        let flatime = body._embedded.nextepisode.airtime;
        const flachannel = body.network.name;

        let flatimeString = flatime;
        let H = +flatimeString.substr(0, 2);
        let h = H % 12 || 12;
        let ampm = (H < 12 || H === 24) ? " AM" : " PM";
        flatimeString = h + flatimeString.substr(2, 3) + ampm;

        const fladiffDays = Math.round(Math.abs((today.getTime() - fladate.getTime())/(oneDay)));

        if(fladiffDays === 1){
            d = 'day';
        }   else{
            d = 'days';
        }

        const countdown = new Discord.RichEmbed()
	    .setColor('#2791D3')
	    .setTitle('__Next upcoming Arrowverse episodes:__')
        .addTitle(`${flatitle} ${flaseason}x${flanumber<10?"0"+flanumber:flanumber} - ${flaepname}`, `airs in ${fladiffDays} ${d} on ${fladate.toDateString()} at ${flatimeString} ET on ${flachannel}`)
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