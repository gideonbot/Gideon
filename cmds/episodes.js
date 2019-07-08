const Discord = module.require("discord.js");
const snekfetch = require("snekfetch");

module.exports.run = async (gideon, message, args) => {
    let seip = args.toString().substr(-4)
    let season = seip[0];
    let episode = seip[2] + seip[3];
    let fl = "flash"; let ar = "arrow"; let sg = "supergirl"; let lg = "legends"; let ct = "constantine"; let bw = "batwoman";
    let show = args.toString().substring(4, args.length-5)
    let showid;

    if (show.includes(fl)){
        showid = "13";
    }   else if(show.includes(ar)){
        showid = "";
    }   else if(show.includes(sg)){
        showid = "";
    }   else if(show.includes(lg)){
        showid = ""
    }   else if()
    

    const api = `http://api.tvmaze.com/shows/13/episodebynumber?season=${season}&number=${episode}`;
    let sen = args[0];
    if(!sen) return message.channel.send("You must supply the shows name, season and its episode number!");

    snekfetch.get(api).then(r => {
        console.log(r.body);
        let body = r.body;   
        let airdate = new Date(body.airstamp);
        let sum = body.summary.substring(3);
        let desc = sum.substring(0, sum.length -4);

        let localTime = airdate.getTime();
        let localOffset = airdate.getTimezoneOffset() * 60000;  
        let utc = localTime + localOffset;
        let offset = -5;   
        let cst = utc + (3600000*offset);
        let nd = new Date(cst); 
        let cstdate = (nd.toDateString());
        let csttime = (nd.toLocaleTimeString());  

        const epinfo = new Discord.RichEmbed()
        .setColor('#2791D3')
        .setTitle(`The Flash ${body.season}x${body.number<10?"0"+body.number:body.number} - ${body.name}`)
        .setDescription(desc + `\n\nAirdate: \`${cstdate}\` \nAirtime: \`${csttime + ' CST'}\` \nRuntime: \`${body.runtime} Minutes\``)
        .setImage(body.image.original)     
        .setTimestamp()
        .setFooter('Gideon - The Arrowverse Bot | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

        message.channel.send(epinfo);
    }, failed => { 
        if (failed) return message.channel.send(`There was no data for this episode!`).catch(console.error);
     });
}
module.exports.help = {
    name: "ep"
}