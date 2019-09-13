const Discord = module.require("discord.js");
const fetch = require('node-fetch');
const Util = require("../Util");

module.exports.run = async (gideon, message, args) => {
    let agc = args[0];
    if (!agc) return message.channel.send("You must supply the shows name, season and its episode number!");
    const url = 'https://arrowverse.info';
    const api = 'https://arrowverse.info/api';
    let showtitle;
    let thimg;

    const as = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('You must supply a valid show!')
    .setDescription('Available shows:\n**flash**\n**arrow**\n**supergirl**\n**legends**\n**constantine**\n**blacklightning**\n**batwoman**')
    .setTimestamp()
    .setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', gideon.user.avatarURL());

    const es = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('You must supply a valid episode and season!')
    .setDescription('Acceptable formats: S00E00 and 00x00')
    .setTimestamp()
    .setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', gideon.user.avatarURL());
    
    if (agc.match(/(?:flash)/i)) showtitle = "The Flash";
    else if (agc.match(/(?:arrow)/i)) showtitle = "Arrow";
    else if (agc.match(/(?:supergirl)/i)) showtitle = "Supergirl";
    else if (agc.match(/(?:legends)/i)) showtitle = "DC's Legends of Tomorrow";
    else if (agc.match(/(?:constantine)/i)) showtitle = "Constantine";
    else if (agc.match(/(?:batwoman)/i)) showtitle = "Batwoman";
    else if (agc.match(/(?:blacklightning)/i)) showtitle = "Black Lightning";
    else if (agc.match(/(?:av2020)/i)) showtitle = "av2020";
    else return message.channel.send(as);

    try {
        const fiep = Util.ParseStringToObj(args[1]);
        if (!fiep) return message.channel.send(es);

        fiep = "S" + (fiep.season < 10 ? "0" + fiep.season : fiep.season) + "E" + (fiep.episode < 10 ? "0" + fiep.episode : fiep.episode);

        const body = await fetch(api).then(res => res.json());

        let shows = body.filter(x => x.series != 'Vixen' && x.series != 'Freedom Fighters: The Ray');
    
        let f = shows.find(x => x.series == showtitle && x.episode_id == fiep);
        if (!f) return message.channel.send(`${showtitle} ${fiep} is not a valid episode!`);

        let next = shows[shows.indexOf(f) + 1];
        if (!next) return message.channel.send('Couldn\'t find that episode. Try again.');
    
        const nxep = `${next.series} ${next.episode_id} - ${next.episode_name}`;
        const nxepard = `Airdate: ${next.air_date}`;
    
        if (next.series.match(/(?:flash)/i)) thimg = 'https://i.ytimg.com/vi/ghPatoChvV0/maxresdefault.jpg';
        else if (next.series.match(/(?:arrow)/i)) thimg = 'http://www.greenarrowtv.com/wp-content/uploads/2017/10/Screen-Shot-2017-10-19-at-6.50.41-PM.jpg';
        else if (next.series.match(/(?:supergirl)/i)) thimg = 'https://i0.wp.com/thegameofnerds.com/wp-content/uploads/2018/01/supergirl-title-card1.png?resize=560%2C315&ssl=1';
        else if (next.series.match(/(?:legends)/i)) thimg = 'https://i.imgur.com/FLqwOYv.png';
        else if (next.series.match(/(?:constantine)/i)) thimg = 'https://upload.wikimedia.org/wikipedia/en/b/b1/Constantine_TV_show_logo.jpg';
        else if (next.series.match(/(?:batwoman)/i)) thimg = 'https://upload.wikimedia.org/wikipedia/en/c/c3/Batwoman_TV_series_logo.png';
        else if (next.series.match(/(?:blacklightning)/i)) thimg = 'https://upload.wikimedia.org/wikipedia/en/e/ef/Black_Lightning_%28TV_series%29.png';
        else if (next.series.match(/(?:av2020)/i)) thimg = '';
    
        const nextmsg = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('Your next episode:')
        .setThumbnail(thimg)
        .addField(nxep, nxepard)
        .addField(`Powered by:`, `**[arrowverse.info](${url} '${url}')**`)
        .setTimestamp()
        .setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', gideon.user.avatarURL());
    
        message.channel.send(nextmsg);
    }

    catch (ex) {
        console.log(ex);
        return message.channel.send("Failed to fetch data, please try again later!");
    }
}

module.exports.help = {
    name: "next"
}