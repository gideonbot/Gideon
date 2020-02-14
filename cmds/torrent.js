const Discord = module.require("discord.js");
const torrentSearch = require('torrent-search-api');
const Util = require("../Util");
const Magnet2torrent = require('magnet2torrent-js');

module.exports.run = async (gideon, message, args) => {
    let agc = args[0];
    const auth = message.author.id;

    const ia = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle(`"${agc}" is not a valid argument!`)
    .setDescription('Available shows:\n**flash**\n**arrow**\n**supergirl**\n**legends**\n**constantine**\n**batwoman**\n**blacklightning**\n**canaries**\n**supesnlois**\n**stargirl**')
    .setTimestamp()
    .setFooter(Util.config.footer, gideon.user.avatarURL());

    const na = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('You must supply the shows name, season and its episode number!')
    .setTimestamp()
    .setFooter(Util.config.footer, gideon.user.avatarURL());

    const er = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('An error occured while executing this command!')
    .setTimestamp()
    .setFooter(Util.config.footer, gideon.user.avatarURL());

    if (!agc) return message.channel.send(na);

    let season_and_ep = Util.parseSeriesEpisodeString(args[1]);
    if (!season_and_ep) {
        const es = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('You must supply a valid episode and season!')
        .setDescription('Acceptable formats: S00E00 and 00x00')
        .setTimestamp()
        .setFooter(Util.config.footer, gideon.user.avatarURL());
        
        return message.channel.send(es);
    }

    let showtitle = "";

    if (agc.match(/(?:flash)/i)) showtitle = "The Flash";
    else if (agc.match(/(?:arrow)/i)) showtitle = "Arrow";
    else if (agc.match(/(?:supergirl)/i)) showtitle = "Supergirl";
    else if (agc.match(/(?:legends)/i)) showtitle = "DC's Legends of Tomorrow";
    else if (agc.match(/(?:constantine)/i)) showtitle = "Constantine";
    else if (agc.match(/(?:batwoman)/i)) showtitle = "Batwoman"; 
    else if (agc.match(/(?:blacklightning)/i)) showtitle = "Black Lightning";
    //else if (agc.match(/(?:canaries)/i)) showtitle = "Green Arrow and the Canaries"; 
    //else if (agc.match(/(?:supesnlois)/i)) showtitle = "Superman & Lois"; 
    //else if (agc.match(/(?:stargirl)/i)) showtitle = "Stargirl"; 

    else return message.channel.send(ia);
        
    let ts = `${showtitle} S${season_and_ep.season < 10 ? "0" + season_and_ep.season : season_and_ep.season}E${season_and_ep.episode < 10 ? "0" + season_and_ep.episode : season_and_ep.episode}`;
    
    const pw = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setAuthor(`Torrents for ${message.author.tag}`, message.author.avatarURL())
    .setTitle('Gathering torrents: ' + ts)
    .setDescription(`Please stand by...`)
    .setTimestamp()
    .setFooter(Util.config.footer, gideon.user.avatarURL());

    await message.channel.send(pw).then(async sent => {
        try {
            await torrentSearch.enablePublicProviders();
            const torrents = await torrentSearch.search(['1337x', 'TorrentProject', 'ThePirateBay', 'KickassTorrents', 'Torrentz2'], ts, 'TV', 5);
            
            const epdwn = new Discord.MessageEmbed()
            .setColor('#2791D3')
            .setAuthor(`Torrents for ${message.author.tag}`, message.author.avatarURL())
            .setTitle(ts)
            .setDescription(`:warning:Always enable a VPN before downloading!:warning:`)
            .setTimestamp()
            .setFooter(Util.config.footer, gideon.user.avatarURL());
    
            const m2t = new Magnet2torrent({
                timeout: 60
            });
    
    
            for (let i=0 ; i < torrents.length ; i++) {
                const magnet = await torrentSearch.getMagnet(torrents[i]);
                const buffer = await m2t.getTorrentBuffer(magnet);
                const attachment = new Discord.MessageAttachment(buffer, `${torrents[i].title}.torrent`);
    
                const emotes = gideon.guilds.cache.get('525341081727008788');
                if (!emotes) {
                    return message.channel.send(er);
                }
    
                const torrent_channel = emotes.channels.cache.get('677861559682465802');
                if (!torrent_channel) {
                    return message.channel.send(er);
                }
    
                await torrent_channel.send(attachment).then(async msg =>{
                    const url = msg.attachments.first().url;
                    epdwn.addField(torrents[i].title, `Size: \`${torrents[i].size}\` Seeds: \`${torrents[i].seeds}\` Provider: \`${torrents[i].provider}\` **[Download](${url} '${url}')**`)
                });
            } 
    
            await sent.edit(epdwn);
            await message.channel.send(`<@${auth}>`);
        }
        catch (ex) {
            console.log("Caught an exception while running torrent.js: " + ex.stack);
            Util.log("Caught an exception while running torrent.js: " + ex.stack);
            return message.channel.send(er);
        }
    });
}

module.exports.help = {
    name: ["torrent", "download"],
    type: "general",
    help_text: "torrent <show> <NxNN/SNNENN> ~ N -> number",
    help_desc: "Searches torrent providers for the specified episode"
}