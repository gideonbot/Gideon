import Discord from "discord.js";
import torrentSearch from 'torrent-search-api';
import Util from "../../Util.js";
import Magnet2torrent from 'magnet2torrent-js';

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(gideon, message, args) {
    let agc = args[0];
    const auth = message.author.id;

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
    else return message.channel.send(Util.CreateEmbed(`"${agc}" is not a valid argument!`, {description: 'Available shows:\n**flash**\n**arrow**\n**supergirl**\n**legends**\n**constantine**\n**batwoman**\n**blacklightning**\n**canaries**\n**supesnlois**\n**stargirl**'}));

    const emotes = gideon.guilds.cache.get('525341081727008788');
    if (!emotes) return message.channel.send(Util.CreateEmbed('An error occured while executing this command!'));

    /**
     * @type {Discord.TextChannel}
     */
    const torrent_channel = emotes.channels.cache.get('677861559682465802');
    if (!torrent_channel) return message.channel.send(Util.CreateEmbed('An error occured while executing this command!'));

    let season_and_ep = Util.parseSeriesEpisodeString(args[1]);
    if (!season_and_ep) {
        return message.channel.send(Util.CreateEmbed('You must supply a valid episode and season!', {description: 'Acceptable formats: S00E00 and 00x00'}));
    }
        
    let ts = `${showtitle} S${Util.normalize(season_and_ep.season)}E${Util.normalize(season_and_ep.episode)}`;

    let sent = await message.channel.send(Util.CreateEmbed('Gathering torrents: ' + ts, {description: `Please stand by... This may take up to a minute`}));
    try {
        torrentSearch.enablePublicProviders();

        const torrents = await torrentSearch.search(['1337x', 'TorrentProject', 'ThePirateBay', 'KickassTorrents', 'Torrentz2'], ts, 'TV', 5);

        if (torrents.length < 1) return message.channel.send(Util.CreateEmbed('No torrents available for this episode!'));

        const embed = Util.CreateEmbed(ts, {description: `:warning:Always enable a VPN before downloading!:warning:`});
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

                if (item) embed.addField(item.torrent.title, `Size: \`${item.torrent.size}\` Seeds: \`${item.torrent.seeds}\` Provider: \`${item.torrent.provider}\` **[Download](${attachment.url} '${attachment.url}')**`);
            }
        }

        await sent.edit(`<@${auth}>`, {embed: embed});
    }
    catch (ex) {
        console.log(ex);
        Util.log("Caught an exception while running torrent.js: " + ex.stack);
        return message.channel.send(Util.CreateEmbed('An error occured while executing this command!'));
    }
}

export const help = {
    name: ["torrent", "download"],
    type: "general",
    help_text: "torrent <show> <NxNN/SNNENN> ~ N -> number",
    help_desc: "Searches torrent providers for the specified episode",
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {force: true, amount: 2, type: 'episode'},
    roles: [],
    user_perms: [],
    bot_perms: ['MANAGE_MESSAGES']
}