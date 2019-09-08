const Discord = module.require("discord.js");
const fetch = require('node-fetch');

module.exports.run = async (gideon, message, args) => {
    let agc = args[0];
    if(!agc) return message.channel.send("You must supply the shows name, season and its episode number!");
    const api = 'https://arrowverse.info/api?newest_first=False&hide_show=freedom-fighters&hide_show=vixen&from_date=&to_date=';
    const url = 'https://arrowverse.info';
    let showtitle;
    let thimg;

    const as = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('You must supply a valid show!')
    .setDescription('Available shows:\n**flash**\n**arrow**\n**supergirl**\n**legends**\n**constantine**\n**blacklightning**\n**batwoman**')
    .setTimestamp()
    .setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', gideon.user.avatarURL())
    
    if (agc.match(/(?:flash)/i)){
        showtitle = "The Flash";
    }   else if(agc.match(/(?:arrow)/i)){
        showtitle = "Arrow";
    }   else if(agc.match(/(?:supergirl)/i)){
        showtitle = "Supergirl";
    }   else if(agc.match(/(?:legends)/i)){
        showtitle = "DC's Legends of Tomorrow";
    }   else if(agc.match(/(?:constantine)/i)){
        showtitle = "Constantine";
    }   else if(agc.match(/(?:batwoman)/i)){
        showtitle = "Batwoman"; 
    }   else if(agc.match(/(?:blacklightning)/i)){
        showtitle = "Black Lightning"; 
    }   else if(agc.match(/(?:av2020)/i)){
        showtitle = "av2020"; 
        thimg = '';
    }   else{
        return message.channel.send(as);
    }  

    function ParseEpisodeId(input) {
        if (!input) return null;
        
        let str = input.toLowerCase();
        let s = "", e = "";
        let hit_limiter = false;
    
        for (let letter of str) {
            if (letter == "s") continue;
    
            if (letter == "e" || letter == "x") {
                hit_limiter = true;
                continue;
            }
    
            if (!(/^\d+$/.test(letter))) continue;
    
            if (!hit_limiter) s += letter;
            else e += letter;
        }
    
        let s_num = Number(s);
        let e_num = Number(e);
    
        if (isNaN(s_num) || isNaN(e_num)) return null;
    
        return "S" + (s_num < 10 ? "0" + s_num : s_num) + "E" + (e_num < 10 ? "0" + e_num : e_num);
    }

    const body = await fetch(api).then(res => res.json());
    const fiep = ParseEpisodeId(args[1]);
    let filtered = body.filter(x => x.series == showtitle);
    let f = filtered.find(x => x.episode_id == fiep);
    let rownum = f.row_number;
    let next = body.filter(x => x.row_number == rownum +1);

    if(filtered == null || filtered == undefined || next == null || next == undefined) return message.channel.send('Couldn\'t find that episode. Try again.');

    const nxep = `${next[0].series} ${next[0].episode_id} - ${next[0].episode_name}`;
    const nxepard = `Airdate: ${next[0].air_date}`;

    if (next[0].series.match(/(?:flash)/i)){
        thimg = 'https://i.ytimg.com/vi/ghPatoChvV0/maxresdefault.jpg';
    }   else if(next[0].series.match(/(?:arrow)/i)){
        thimg = 'http://www.greenarrowtv.com/wp-content/uploads/2017/10/Screen-Shot-2017-10-19-at-6.50.41-PM.jpg';
    }   else if(next[0].series.match(/(?:supergirl)/i)){
        thimg = 'https://i0.wp.com/thegameofnerds.com/wp-content/uploads/2018/01/supergirl-title-card1.png?resize=560%2C315&ssl=1';
    }   else if(next[0].series.match(/(?:legends)/i)){
        thimg = 'https://i.imgur.com/FLqwOYv.png';
    }   else if(next[0].series.match(/(?:constantine)/i)){
        thimg = 'https://upload.wikimedia.org/wikipedia/en/b/b1/Constantine_TV_show_logo.jpg';
    }   else if(next[0].series.match(/(?:batwoman)/i)){
        thimg = 'https://upload.wikimedia.org/wikipedia/en/c/c3/Batwoman_TV_series_logo.png';
    }   else if(next[0].series.match(/(?:blacklightning)/i)){
        thimg = 'https://upload.wikimedia.org/wikipedia/en/e/ef/Black_Lightning_%28TV_series%29.png';
    }   else if(next[0].series.match(/(?:av2020)/i)){
        thimg = '';
    }

    const nextmsg = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('Your next episode:')
    .setThumbnail(thimg)
    .addField(nxep, nxepard)
    .addField(`Powered by:`, `**[arrowverse.info](${url} '${url}')**`)
    .setTimestamp()
    .setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', gideon.user.avatarURL())

    message.channel.send(nextmsg);
}

module.exports.help = {
    name: "next"
}