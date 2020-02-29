const Discord = require("discord.js");
const fetch = require('node-fetch');
const parsePodcast = require("@activediscourse/podcast-parser")
const moment = require('moment');
const Util = require("../../Util");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message, args) => {     
    const as = Util.CreateEmbed("You must supply valid input!");
    if (!args[0]) return message.channel.send(as);
    if (args[1]) return message.channel.send(as);
    let noep = isNaN(args[0]);

    if (noep) return message.channel.send(as);
    else if (!noep && args[0].length > 3) return message.channel.send(as);
    else

    if (!message.member.voice.channel) return message.reply('You need to join a voice channel first!');

    if (gideon.listening.includes(message.author.id)) return message.channel.send(Util.CreateEmbed('A podcast episode is already playing!'));
    gideon.listening.push(message.author.id);
    
    let epnum = args[0];
    const emotes = ['⏯️','⏹️','⏮️','⏭️'];

    try {
        const api = `https://matescast.com/rss/mates_archive.rss`;
        const rss = await fetch(api).then(res => res.text());
        const mates = await parsePodcast(rss).catch(ex => console.log(ex));
        const episodes = mates.episodes.reverse();

        let ep = episodes[epnum-1];
        let title = mates.title;
        let desc = mates.description.long;
        let img = mates.image;
        let eptitle = ep.title;
        let epdesc = ep.rawDescription;
        let stream = ep.enclosure.url;
        let duration = moment.utc(ep.duration*1000).format('mm:ss');
        let pubdate = moment.utc(ep.published).local().format('YYYY-MM-DD HH:mm:ss');

        let vcname = message.member.voice.channel.name;
        message.reply(`now joining voice channel: \`${vcname}\`!`);
        const connection = await message.member.voice.channel.join();

        const matesembed = Util.CreateEmbed(title, {
            description: desc,
            thumbnail: img,
            author: {
                name: `Playing MATES for ${message.author.tag}:`,
                icon: message.author.avatarURL()
            },
            fields: [
                {
                    name: `Currently playing:`,
                    value: `\`${title} ${eptitle}\`\n\n\`\`\`\n${epdesc}\n\`\`\``
                },
                {
                    name: `Episode duration:`,
                    value: `\`${duration} min\``
                },
                {
                    name: `Published at:`,
                    value: `\`${pubdate}\``
                },
            ]
        })

        const stopembed = Util.CreateEmbed(title, {
            description: desc,
            thumbnail: img,
            author: {
                name: `Played MATES for ${message.author.tag}:`,
                icon: message.author.avatarURL()
            },
            fields: [
                {
                    name: `Playback stopped:`,
                    value: `\`${title} ${eptitle}\`\n\n\`\`\`\n${epdesc}\n\`\`\``
                },
                {
                    name: `Episode duration:`,
                    value: `\`${duration} min\``
                },
                {
                    name: `Published at:`,
                    value: `\`${pubdate}\``
                },
            ]
        })

        const pauseembed = Util.CreateEmbed(title, {
            description: desc,
            thumbnail: img,
            author: {
                name: `Playing MATES for ${message.author.tag}:`,
                icon: message.author.avatarURL()
            },
            fields: [
                {
                    name: `Playback paused:`,
                    value: `\`${title} ${eptitle}\`\n\n\`\`\`\n${epdesc}\n\`\`\``
                },
                {
                    name: `Episode duration:`,
                    value: `\`${duration} min\``
                },
                {
                    name: `Published at:`,
                    value: `\`${pubdate}\``
                },
            ]
        })

        const finishedembed = Util.CreateEmbed(title, {
            description: desc,
            thumbnail: img,
            author: {
                name: `Played MATES for ${message.author.tag}:`,
                icon: message.author.avatarURL()
            },
            fields: [
                {
                    name: `Playback finished:`,
                    value: `\`${title} ${eptitle}\`\n\n\`\`\`\n${epdesc}\n\`\`\``
                },
                {
                    name: `Episode duration:`,
                    value: `\`${duration} min\``
                },
                {
                    name: `Published at:`,
                    value: `\`${pubdate}\``
                },
            ]
        })

        let sent = await message.channel.send(matesembed);
        for (let emoji of emotes) {
            await sent.react(emoji).then(() => {}, failed => console.log("Failed to react with " + emoji + ": " + failed));
        }

        let cast = connection.play(stream);
        cast.pause();
        cast.resume();

        const rfilter = (reaction, user) => (emotes.includes(reaction.emoji.name) || emotes.includes(reaction.emoji.id)) && user.id === message.author.id;
        const rcollector = sent.createReactionCollector(rfilter, {time: ep.duration * 1000});
    
        rcollector.on('collect', async (reaction, user) => {
            if (reaction.emoji.name == emotes[0]) {
                if (cast.paused) cast.resume(), sent.edit(matesembed);
                else cast.pause(), sent.edit(pauseembed);
                sent.reactions.cache.find(x => x.emoji.name == emotes[0]).users.remove(user.id);
            }

            if (reaction.emoji.id == emotes[1]) {
                cast.destroy();
                gideon.listening.remove(message.author.id);
                await sent.reactions.removeAll();
                return sent.edit(stopembed);
            }

            if (reaction.emoji.id == emotes[2]) {
                cast.destroy();
                epnum--;

                cast = connection.play(stream);
                cast.pause();
                cast.resume();

                sent.reactions.cache.find(x => x.emoji.name == emotes[0]).users.remove(user.id);
                sent.edit(matesembed);
            }

            if (reaction.emoji.id == emotes[2]) {
                cast.destroy();
                epnum++;

                cast = connection.play(stream);
                cast.pause();
                cast.resume();

                sent.reactions.cache.find(x => x.emoji.name == emotes[0]).users.remove(user.id);
                sent.edit(matesembed);
            }
        }); 

        cast.on('finish', async () => {
           cast.destroy();
           rcollector.stop();
           gideon.listening.remove(message.author.id);
           sent.edit(finishedembed);
           await sent.reactions.removeAll();
        }); 
    } 
    
    catch (ex) {
        console.log("Caught an exception while playing podcast: " + ex);
        Util.log("Caught an exception while playing podcast: " + ex);
        return message.channel.send(Util.CreateEmbed('An error occurred while fetching podcast data!'));
    }
}

module.exports.help = {
    name: ['mates', 'podcast'],
    type: "misc",
    help_text: "mates",
    help_desc: "Listen to the MATES podcast"
}