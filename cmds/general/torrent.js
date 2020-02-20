const Discord = require("discord.js");
const torrentSearch = require('torrent-search-api');
const Util = require("../../Util");
const Magnet2torrent = require('magnet2torrent-js');

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message, args) => {
    let agc = args[0];
    const auth = message.author.id;

    const ia = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle(`"${agc}" is not a valid argument!`)
    .setDescription('Available shows:\n**flash**\n**arrow**\n**supergirl**\n**legends**\n**constantine**\n**batwoman**\n**blacklightning**\n**canaries**\n**supesnlois**\n**stargirl**')
    .setFooter(Util.config.footer, gideon.user.avatarURL());

    const na = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('You must supply the shows name, season and its episode number!')
    .setFooter(Util.config.footer, gideon.user.avatarURL());

    const er = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('An error occured while executing this command!')
    .setFooter(Util.config.footer, gideon.user.avatarURL());

    const nt = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('No torrents available for this episode!')
    .setFooter(Util.config.footer, gideon.user.avatarURL());

    if (!agc) return message.channel.send(na);

    let season_and_ep = Util.parseSeriesEpisodeString(args[1]);
    if (!season_and_ep) {
        const es = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('You must supply a valid episode and season!')
        .setDescription('Acceptable formats: S00E00 and 00x00')
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

    const emotes = gideon.guilds.cache.get('525341081727008788');
    if (!emotes) return message.channel.send(er);

    /**
     * @type {Discord.TextChannel}
     */
    const torrent_channel = emotes.channels.cache.get('677861559682465802');
    if (!torrent_channel) return message.channel.send(er);
        
    let ts = `${showtitle} S${Util.normalize(season_and_ep.season)}E${Util.normalize(season_and_ep.episode)}`;
    
    const pw = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setAuthor(`Torrents for ${message.author.tag}`, message.author.avatarURL())
    .setTitle('Gathering torrents: ' + ts)
    .setDescription(`Please stand by... This may take up to a minute`)
    .setFooter(Util.config.footer, gideon.user.avatarURL());

    let sent = await message.channel.send(pw);
    try {
        torrentSearch.enablePublicProviders();

        const torrents = await torrentSearch.search(['1337x', 'TorrentProject', 'ThePirateBay', 'KickassTorrents', 'Torrentz2'], ts, 'TV', 5);

        if (torrents.length < 1) return message.channel.send(nt);

        const epdwn = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setAuthor(`Torrents for ${message.author.tag}`, message.author.avatarURL())
        .setTitle(ts)
        .setDescription(`:warning:Always enable a VPN before downloading!:warning:`)
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        const m2t = new Magnet2torrent({timeout: 60});

        let list = [];

        for (let torrent of torrents) {
            try {
                const magnet = await torrentSearch.getMagnet(torrent);
                const buffer = await m2t.getTorrentBuffer(magnet);

                list.push({
                    attachment: new Discord.MessageAttachment(buffer, `${list.length + 1}_${torrent.title}.torrent`),
                    torrent: torrent
                });
            }

            catch (ex) {
                if (ex == "Timeout") continue;
            }
        }

        let msg = await torrent_channel.send(list.map(x => x.attachment));

        for (let attachment of msg.attachments.values()) {
            let match = attachment.name.match(/\d+/g);

            if (match && match.length > 0) {
                let id = Number(match[0]);
                let item = list[id - 1];

                if (item) epdwn.addField(item.torrent.title, `Size: \`${item.torrent.size}\` Seeds: \`${item.torrent.seeds}\` Provider: \`${item.torrent.provider}\` **[Download](${attachment.url} '${attachment.url}')**`);
            }
        }

        await sent.edit(`<@${auth}>`, {embed: epdwn});
    }
    catch (ex) {
        console.log(ex);
        Util.log("Caught an exception while running torrent.js: " + ex);
        return message.channel.send(er);
    }
}

module.exports.help = {
    name: ["torrent", "download"],
    type: "general",
    help_text: "torrent <show> <NxNN/SNNENN> ~ N -> number",
    help_desc: "Searches torrent providers for the specified episode"
}