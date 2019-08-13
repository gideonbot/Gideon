const Discord = module.require("discord.js");
const OpenSubtitles = require('opensubtitles-api');

module.exports.run = async (gideon, message, args) => {
    const OS = new OpenSubtitles({
        useragent: process.env.OPS_UA,
        username: process.env.OPS_USER,
        password: process.env.OPS_PASS,
        ssl: true
    });

    let agc = args[1];
    if(!args[0]) return message.channel.send("You must supply a lang code, the shows name, season and its episode number!\nYou can find ISO 639-2 codes at: https://en.wikipedia.org/wiki/List_of_ISO_639-2_codes");
    if(args[0].length !== 3) return message.channel.send("You must supply a valid ISO 639-2 code!\nhttps://en.wikipedia.org/wiki/List_of_ISO_639-2_codes");

    let seip = args.toString().substr(-4)
    let season = seip[0];
    let episode = seip[2] + seip[3];
    let show = args.join(' ');
    let showid;
    let showtitle;

    if (agc.match(/(?:flash)/i)){
        showid = "tt3107288";
        showtitle = "The Flash";
    }   else if(agc.match(/(?:arrow)/i)){
        showid = "tt2193021";
        showtitle = "Arrow";
    }   else if(agc.match(/(?:supergirl)/i)){
        showid = "tt4016454";
        showtitle = "Supergirl";
    }   else if(agc.match(/(?:legends)/i)){
        showid = "tt4532368"
        showtitle = "DC's Legends of Tomorrow";
    }   else if(agc.match(/(?:constantine)/i)){
        showid = "tt3489184";
        showtitle = "Constantine";
    }   else if(agc.match(/(?:batwoman)/i)){
        showid = "tt8712204";
        showtitle = "Batwoman"; 
    }   else if(agc.match(/(?:blacklightning)/i)){
        showid = "tt6045840";
        showtitle = "Black Lightning"; 
    }   else if(agc.match(/(?:av2020)/i)){
        showid = "av2020";
        showtitle = "av2020"; 
        channel = 'The CW';
    }   else{
        return message.channel.send(`"${show}" is not a valid argument!\nAvailable shows: flash | arrow | supergirl | legends | constantine | batwoman`)
    }

    OS.search({
        sublanguageid: args[0],       
        season: season,
        episode: episode,
        limit: '5',                 
        imdbid: showid,           

    }).then(subtitles => {

        const sub = Object.values(subtitles)[0]

        const subs = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle(`Subtitles for: ${showtitle} ${season}x${episode}`)
        .setDescription(`Here are the 5 best results from opensubtitles.org:`)
        .addField(sub[0].filename, `**[Download SRT](${sub[0].url} '${sub[0].url}')** Lang: \`${sub[0].lang}\` Score: \`${sub[0].score}\``)
        .addField(sub[1].filename, `**[Download SRT](${sub[1].url} '${sub[1].url}')** Lang: \`${sub[1].lang}\` Score: \`${sub[1].score}\``)
        .addField(sub[2].filename, `**[Download SRT](${sub[2].url} '${sub[2].url}')** Lang: \`${sub[2].lang}\` Score: \`${sub[2].score}\``)
        .addField(sub[3].filename, `**[Download SRT](${sub[3].url} '${sub[3].url}')** Lang: \`${sub[3].lang}\` Score: \`${sub[3].score}\``)
        .addField(sub[4].filename, `**[Download SRT](${sub[4].url} '${sub[4].url}')** Lang: \`${sub[4].lang}\` Score: \`${sub[4].score}\``)
        .setTimestamp()
        .setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png')
            
        message.channel.send(subs);
        
    }).catch(err => {
        console.log(err)
        if(err) return message.channel.send(`There were no results for this episode on opensubtitles.org!\nTry another episode or another language code!`)
    });
}

module.exports.help = {
    name: "subs"
}