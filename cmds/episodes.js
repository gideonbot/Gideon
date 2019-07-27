const Discord = module.require("discord.js");
const snekfetch = require("snekfetch");

module.exports.run = async (gideon, message, args) => {
    let agc = args[0];
    if(!agc) return message.channel.send("You must supply the shows name, season and its episode number!");

    let seip = args.toString().substr(-4)
    let season = seip[0];
    let episode = seip[2] + seip[3];
    let show = args.join(' ');
    let showid;
    let showtitle;
    let channel;

    if (agc.match(/(?:flash)/i)){
        showid = "13";
        showtitle = "The Flash";
        channel = 'The CW';
    }   else if(agc.match(/(?:arrow)/i)){
        showid = "4";
        showtitle = "Arrow";
        channel = 'The CW'
    }   else if(agc.match(/(?:supergirl)/i)){
        showid = "1850";
        showtitle = "Supergirl";
        if(season === '1'){
            channel = 'CBS';
        }   else {
            channel = 'The CW';
        }
    }   else if(agc.match(/(?:legends)/i)){
        showid = "1851"
        showtitle = "DC's Legends of Tomorrow";
        channel = 'The CW';
    }   else if(agc.match(/(?:constantine)/i)){
        showid = "15";
        showtitle = "Constantine";
        channel = 'NBC';
    }   else if(agc.match(/(?:batwoman)/i)){
        showid = "37776";
        showtitle = "Batwoman"; 
        channel = 'The CW';
    }   else{
        return message.channel.send(`"${show}" is not a valid argument!\nAvailable shows: flash | arrow | supergirl | legends | constantine | batwoman`)
    }  

    const api = `http://api.tvmaze.com/shows/${showid}/episodebynumber?season=${season}&number=${episode}`;
    
    snekfetch.get(api).then(r => {
        console.log(r.body);
        let body = r.body;   
        let airdate = new Date(body.airdate);
        let airtime = body.airtime;
        let desc;
        let img;

        if (r.body.summary === null){
            desc = 'No summary available'
        }   else {
            let sum = body.summary.substring(3);
            desc = sum.substring(0, sum.length -4); 
            img = body.image.original;
        }                 

        let timeString = airtime;
        let H = +timeString.substr(0, 2);
        let h = H % 12 || 12;
        let ampm = (H < 12 || H === 24) ? " AM" : " PM";
        timeString = h + timeString.substr(2, 3) + ampm;

        const epinfo = new Discord.RichEmbed()
        .setColor('#2791D3')
        .setTitle(`${showtitle} ${body.season}x${body.number<10?"0"+body.number:body.number} - ${body.name}`)
        .setDescription(desc + `\n\nAirdate: \`${airdate.toDateString()}\`\nAirtime: \`${timeString + ' ET'}\`\nRuntime: \`${body.runtime} Minutes\`\nChannel: \`${channel}\`\n\n**[Click here to read the full recap and watch the episode's trailer](${body.url} '${body.url}')**`)
        .setImage(img)     
        .setTimestamp()
        .setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

        message.channel.send(epinfo);

    }, failed => { 
        if (failed) return message.channel.send(`There was no data for this episode!`).catch(console.error);
     });
}
module.exports.help = {
    name: "ep"
}