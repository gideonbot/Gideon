const Discord = module.require("discord.js");
const snekfetch = require("snekfetch");

module.exports.run = async (gideon, message, args) => {
    let agc = args[0];
    if(!agc) return message.channel.send("You must supply the shows name, season and its episode number!");

    let seip = args.toString().substr(-4)
    let season = seip[0];
    let episode = seip[2] + seip[3];
    let show = args.join(' ');
    let showid = '';
    let showtitle = '';

    if (agc.match(/(?:flash)/)){
        showid = "13";
        showtitle = "The Flash";
    }   else if(agc.match(/(?:arrow)/)){
        showid = "4";
        showtitle = "Arrow";
    }   else if(agc.match(/(?:supergirl)/)){
        showid = "1850";
        showtitle = "Supergirl";
    }   else if(agc.match(/(?:legends)/)){
        showid = "1851"
        showtitle = "DC's Legends of Tomorrow";
    }   else if(agc.match(/(?:constantine)/)){
        showid = "15";
        showtitle = "Constantine";
    }   else if(agc.match(/(?:batwoman)/)){
        showid = "37776";
        showtitle = "Batwoman"; 
    }   else{
        return message.channel.send(`"${show}" is not a valid argument!`)
    }  

    const api = `http://api.tvmaze.com/shows/${showid}/episodebynumber?season=${season}&number=${episode}`;
    
    snekfetch.get(api).then(r => {
        console.log(r.body);
        let body = r.body;   
        let airdate = new Date(body.airstamp);
        let desc = '';
        if (body.summary === null && body.original === null){
            desc = 'No summary available';
        }   else {
            let sum = body.summary.substring(3)
            desc = sum.substring(0, sum.length -4); 
        }
                  
        let localTime = airdate.getTime();
        let localOffset = airdate.getTimezoneOffset("America/New_York") * 60000;  
        let utc = localTime + localOffset;
        let offset = -4;   
        let est = utc + (3600000*offset);
        let nd = new Date(est); 
        let fairdate = (nd.toDateString());
        let fairtime = (nd.toLocaleTimeString());  

        const epinfo = new Discord.RichEmbed()
        .setColor('#2791D3')
        .setTitle(`${showtitle} ${body.season}x${body.number<10?"0"+body.number:body.number} - ${body.name}`)
        .setDescription(desc + `\n\nAirdate: \`${fairdate}\`\nAirtime: \`${fairtime + ' EST'}\`\nRuntime: \`${body.runtime} Minutes\`\nChannel:\n\n**[Click here to read the full recap and watch the episode's trailer](${body.url} '${body.url}')**`)
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