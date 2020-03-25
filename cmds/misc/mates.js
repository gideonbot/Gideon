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
    if (!message.channel.permissionsFor(message.guild.me).has('CONNECT')) return message.reply('sorry can\'t do that without \`CONNECT\`!');
    if (!message.channel.permissionsFor(message.guild.me).has('SPEAK')) return message.reply('sorry can\'t do that without \`SPEAK\`!');
      
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
        async function PodCast(num) {
            const api = `https://matescast.com/rss/mates_archive.rss`;
            const rss = await fetch(api).then(res => res.text());
            const mates = await parsePodcast(rss).catch(ex => console.log(ex));
            const episodes = mates.episodes.reverse();

            let ep = episodes[num-1];
            let title = mates.title;
            let desc = mates.description.long;
            let img = mates.image;
            let eptitle = ep.title;
            let epdesc = ep.rawDescription;
            let stream = ep.enclosure.url;
            let duration = moment.utc(ep.duration*1000).format('mm:ss');
            let pubdate = moment.utc(ep.published).local().format('YYYY-MM-DD HH:mm:ss');

            return [title, desc, img, eptitle, epdesc, stream, duration, pubdate];
        }

        let vcname = message.member.voice.channel.name;
        message.reply(`now joining voice channel: \`${vcname}\`!`);
        const connection = await message.member.voice.channel.join();

        let matescast = await PodCast(epnum);

        const matesembed = Util.CreateEmbed(matescast[0], {
            description: matescast[1],
            thumbnail: matescast[2],
            author: {
                name: `Playing MATES for ${message.author.tag}:`,
                icon: message.author.avatarURL()
            },
            fields: [
                {
                    name: `Currently playing:`,
                    value: `\`${matescast[0]} ${matescast[3]}\`\n\n\`\`\`\n${matescast[4]}\n\`\`\``
                },
                {
                    name: `Episode duration:`,
                    value: `\`${matescast[6]} min\``
                },
                {
                    name: `Published at:`,
                    value: `\`${matescast[7]}\``
                },
            ]
        })

        const stopembed = Util.CreateEmbed(matescast[0], {
            description: matescast[1],
            thumbnail: matescast[2],
            author: {
                name: `Played MATES for ${message.author.tag}:`,
                icon: message.author.avatarURL()
            },
            fields: [
                {
                    name: `Playback stopped:`,
                    value: `\`${matescast[0]} ${matescast[3]}\`\n\n\`\`\`\n${matescast[4]}\n\`\`\``
                },
                {
                    name: `Episode duration:`,
                    value: `\`${matescast[6]} min\``
                },
                {
                    name: `Published at:`,
                    value: `\`${matescast[7]}\``
                },
            ]
        })

        const pauseembed = Util.CreateEmbed(matescast[0], {
            description: matescast[1],
            thumbnail: matescast[2],
            author: {
                name: `Playing MATES for ${message.author.tag}:`,
                icon: message.author.avatarURL()
            },
            fields: [
                {
                    name: `Playback paused:`,
                    value: `\`${matescast[0]} ${matescast[3]}\`\n\n\`\`\`\n${matescast[4]}\n\`\`\``
                },
                {
                    name: `Episode duration:`,
                    value: `\`${matescast[6]} min\``
                },
                {
                    name: `Published at:`,
                    value: `\`${matescast[7]}\``
                },
            ]
        })

        const finishedembed = Util.CreateEmbed(matescast[0], {
            description: matescast[1],
            thumbnail: matescast[2],
            author: {
                name: `Played MATES for ${message.author.tag}:`,
                icon: message.author.avatarURL()
            },
            fields: [
                {
                    name: `Playback finished:`,
                    value: `\`${matescast[0]} ${matescast[3]}\`\n\n\`\`\`\n${matescast[4]}\n\`\`\``
                },
                {
                    name: `Episode duration:`,
                    value: `\`${matescast[6]} min\``
                },
                {
                    name: `Published at:`,
                    value: `\`${matescast[7]}\``
                },
            ]
        })

        let sent = await message.channel.send(matesembed);
        for (let emoji of emotes) {
            await sent.react(emoji).then(() => {}, failed => console.log("Failed to react with " + emoji + ": " + failed));
        }

        let cast = connection.play(matescast[5]);
        cast.pause();
        cast.resume();

        const rfilter = (reaction, user) => (emotes.includes(reaction.emoji.name) || emotes.includes(reaction.emoji.id)) && user.id === message.author.id;
        const rcollector = sent.createReactionCollector(rfilter, {time: matescast[6] * 1000});
    
        rcollector.on('collect', async (reaction, user) => {
            if (reaction.emoji.name == emotes[0]) {
                if (cast.paused) {
                    cast.resume()
                    sent.edit(matesembed)
                }

                else {
                    cast.pause()
                    sent.edit(pauseembed)
                }
                sent.reactions.cache.find(x => x.emoji.name == emotes[0]).users.remove(user.id);
            }

            if (reaction.emoji.name == emotes[1]) {
                cast.destroy();
                gideon.listening.remove(message.author.id);
                await sent.reactions.removeAll();
                await Util.LeaveVC(message);
                return sent.edit(stopembed);
            }

            if (reaction.emoji.name == emotes[2]) {
                cast.destroy();
                epnum - 1;

                matescast = await PodCast(epnum);

                await sent.reactions.cache.find(x => x.emoji.name == emotes[0]).users.remove(user.id);
                await sent.edit(matesembed);

                cast = connection.play(matescast[5]);
                cast.pause();
                cast.resume();
            }

            if (reaction.emoji.name == emotes[2]) {
                cast.destroy();
                epnum + 1;

                matescast = await PodCast(epnum);

                await sent.reactions.cache.find(x => x.emoji.name == emotes[0]).users.remove(user.id);
                await sent.edit(matesembed);

                cast = connection.play(matescast[5]);
                cast.pause();
                cast.resume();
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
        console.log("Caught an exception while playing podcast: " + ex.stack);
        Util.log("Caught an exception while playing podcast: " + ex.stack);
        return message.channel.send(Util.CreateEmbed('An error occurred while fetching podcast data!'));
    }
}

module.exports.help = {
    name: ['mates', 'podcast'],
    type: "misc",
    help_text: "mates <episode>",
    help_desc: "Listen to the MATES podcast"
}