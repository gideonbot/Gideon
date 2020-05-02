import Discord from 'discord.js';
import fetch from 'node-fetch';
import parsePodcast from '@activediscourse/podcast-parser';
import moment from 'moment';
import Util from '../../Util.js';

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(gideon, message, args) {   
    const as = Util.CreateEmbed('You must supply valid input!', null, message.member);
    if (!args[0]) return message.channel.send(as);
    if (args[1]) return message.channel.send(as);
    let noep = isNaN(args[0]);

    if (noep) return message.channel.send(as);
    else if (!noep && args[0].length > 3) return message.channel.send(as);
    else

    if (!message.member.voice.channel) return message.reply('You need to join a voice channel first!');

    if (gideon.listening.includes(message.author.id)) return message.channel.send(Util.CreateEmbed('A podcast episode is already playing!', null, message.member));
    gideon.listening.push(message.author.id);
    
    let epnum = args[0];
    const emotes = ['⏯️','⏹️','⏮️','⏭️'];

    try {
        let vcname = message.member.voice.channel.name;
        message.reply(`Now joining voice channel: \`${vcname}\`!`);
        const connection = await message.member.voice.channel.join();

        let matescast = await PodCast(epnum);

        let matesembed = Util.CreateEmbed(matescast[0], {
            description: matescast[1],
            thumbnail: matescast[2],
            author: {
                name: `Playing MATES for ${message.author.tag}:`,
                icon: message.author.avatarURL()
            },
            fields: [
                {
                    name: 'Currently playing:',
                    value: `\`${matescast[0]} ${matescast[3]}\`\n\n\`\`\`\n${matescast[4]}\n\`\`\``
                },
                {
                    name: 'Episode duration:',
                    value: `\`${matescast[6]} min\``
                },
                {
                    name: 'Published at:',
                    value: `\`${matescast[7]}\``
                },
            ]
        }, message.member);

        const stopembed = Util.CreateEmbed(matescast[0], {
            description: matescast[1],
            thumbnail: matescast[2],
            author: {
                name: `Played MATES for ${message.author.tag}:`,
                icon: message.author.avatarURL()
            },
            fields: [
                {
                    name: 'Playback stopped:',
                    value: `\`${matescast[0]} ${matescast[3]}\`\n\n\`\`\`\n${matescast[4]}\n\`\`\``
                },
                {
                    name: 'Episode duration:',
                    value: `\`${matescast[6]} min\``
                },
                {
                    name: 'Published at:',
                    value: `\`${matescast[7]}\``
                },
            ]
        }, message.member);

        const pauseembed = Util.CreateEmbed(matescast[0], {
            description: matescast[1],
            thumbnail: matescast[2],
            author: {
                name: `Playing MATES for ${message.author.tag}:`,
                icon: message.author.avatarURL()
            },
            fields: [
                {
                    name: 'Playback paused:',
                    value: `\`${matescast[0]} ${matescast[3]}\`\n\n\`\`\`\n${matescast[4]}\n\`\`\``
                },
                {
                    name: 'Episode duration:',
                    value: `\`${matescast[6]} min\``
                },
                {
                    name: 'Published at:',
                    value: `\`${matescast[7]}\``
                },
            ]
        }, message.member);

        const finishedembed = Util.CreateEmbed(matescast[0], {
            description: matescast[1],
            thumbnail: matescast[2],
            author: {
                name: `Played MATES for ${message.author.tag}:`,
                icon: message.author.avatarURL()
            },
            fields: [
                {
                    name: 'Playback finished:',
                    value: `\`${matescast[0]} ${matescast[3]}\`\n\n\`\`\`\n${matescast[4]}\n\`\`\``
                },
                {
                    name: 'Episode duration:',
                    value: `\`${matescast[6]} min\``
                },
                {
                    name: 'Published at:',
                    value: `\`${matescast[7]}\``
                },
            ]
        }, message.member);

        let sent = await message.channel.send(matesembed);
        for (let emoji of emotes) {
            await sent.react(emoji).then(() => {}, failed => console.log('Failed to react with ' + emoji + ': ' + failed));
        }

        let cast = connection.play(matescast[5]);
        cast.pause();
        cast.resume();

        const rfilter = (reaction, user) => (emotes.includes(reaction.emoji.name) || emotes.includes(reaction.emoji.id)) && user.id === message.author.id;
        const rcollector = sent.createReactionCollector(rfilter, {time: matescast[6] * 1000});
    
        rcollector.on('collect', async (reaction, user) => {
            if (reaction.emoji.name === emotes[0]) {
                if (cast.paused) {
                    cast.resume();
                    sent.edit(matesembed);
                }

                else {
                    cast.pause();
                    sent.edit(pauseembed);
                }
                sent.reactions.cache.find(x => x.emoji.name === emotes[0]).users.remove(user.id);
            }

            if (reaction.emoji.name === emotes[1]) {
                cast.destroy();
                gideon.listening.remove(message.author.id);
                await sent.reactions.removeAll();
                await Util.LeaveVC(message);
                return sent.edit(stopembed);
            }

            if (reaction.emoji.name === emotes[2]) {
                cast.end();
                epnum - 1;

                matescast = await PodCast(epnum);

                await sent.edit(matesembed);

                cast = connection.play(matescast[5]);
                cast.pause();
                cast.resume();
                sent.reactions.cache.find(x => x.emoji.name === emotes[2]).users.remove(user.id);
            }

            if (reaction.emoji.name === emotes[3]) {
                cast.end();
                epnum + 1;

                matescast = await PodCast(epnum);

                await sent.edit(matesembed);

                cast = connection.play(matescast[5]);
                cast.pause();
                cast.resume();
                sent.reactions.cache.find(x => x.emoji.name === emotes[3]).users.remove(user.id);
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
        console.log('Caught an exception while playing podcast: ' + ex.stack);
        Util.log('Caught an exception while playing podcast: ' + ex.stack);
        return message.channel.send(Util.CreateEmbed('An error occurred while fetching podcast data!', null, message.member));
    }
}

async function PodCast(num) {
    const api = 'https://matescast.com/rss/mates_archive.rss';
    const rss = await fetch(api).then(res => res.text());
    const mates = await parsePodcast(rss).catch(ex => console.log(ex));
    const episodes = mates.episodes.reverse();

    let ep = episodes[num - 1];
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

export const help = {
    name: ['mates', 'podcast'],
    type: 'misc',
    help_text: 'mates <episode>',
    help_desc: 'Listen to the MATES podcast',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: ['CONNECT', 'SPEAK', 'USE_VAD'],
    bot_perms: ['CONNECT', 'SPEAK', 'USE_VAD']
};