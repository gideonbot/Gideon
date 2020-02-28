const Discord = require("discord.js");
const fetch = require('node-fetch');
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
    
    let epnum = args[0]
    console.log(epnum);
    const url = 'https://listennotes.com/';
    const emotes = ['⏯️','⏹️','⏮️','⏭️'];

    try {
        async function GetCast(){
            const api = `https://listen-api.listennotes.com/api/v2/search?q=${encodeURI(`"Episode ${epnum}"`)}&sort_by_date=0&type=episode&offset=0&published_after=0&only_in=title&language=English&ocid=0d0da5d93a484063ae92aef8b1be4c75&safe_mode=0`;
            console.log(api);
            const header = { 'X-ListenAPI-Key': process.env.PODCAST_API_KEY };
            const body = await fetch(api, {headers: header}).then(res => res.json());
            console.log(body);
            return body.results[0];
        }

        let vcname = message.member.voice.channel.name;
        message.reply(`now joining voice channel: \`${vcname}\`!`);
        const connection = await message.member.voice.channel.join();
        
        const body = await GetCast();
        const stream = body.audio;

        const matesembed = Util.CreateEmbed(`Mike & Tom Eat Snacks ${body.title_original}`, {
            description: body.description_original,
            thumbnail: body.thumbnail,
            author: {
                name: `Playing MATES for ${message.author.tag}:`,
                icon: message.author.avatarURL()
            },
            fields: [
                {
                    name: `Powered by:`,
                    value: `**[listennotes.com](${url} '${url}')**`
                }
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
        const rcollector = sent.createReactionCollector(rfilter, {time: body.audio.audio_length_sec * 1000});
    
        rcollector.on('collect', async (reaction, user) => {
            if (reaction.emoji.name == emotes[0]) {
                if (cast.paused) cast.resume(), message.reply('playback resumed!');
                else cast.pause(), message.reply('playback paused!');
                gideon.listening.remove(message.author.id);
            }

            if (reaction.emoji.id == emotes[1]) {
                cast.destroy();
                await sent.reactions.removeAll();
                const stopembed = Util.CreateEmbed(`Mike & Tom Eat Snacks ${body.title_original}`, {
                    description: body.description_original + '\n\n Playback stopped! :white_check_mark:',
                    thumbnail: body.thumbnail,
                    author: {
                        name: `Played MATES for ${message.author.tag}:`,
                        icon: message.author.avatarURL()
                    },
                    fields: [
                        {
                            name: `Powered by:`,
                            value: `**[listennotes.com](${url} '${url}')**`
                        }
                    ]
                })
                return sent.edit(stopembed);
            }

            if (reaction.emoji.id == emotes[2]) {
                cast.destroy();
                epnum--;
                const previousbody = await GetCast();
                const previousstream = previousbody.audio;

                const previousembed = Util.CreateEmbed(`Mike & Tom Eat Snacks ${previousbody.title_original}`, {
                    description: previousbody.description_original,
                    thumbnail: previousbody.thumbnail,
                    author: {
                        name: `Playing MATES for ${message.author.tag}:`,
                        icon: message.author.avatarURL()
                    },
                    fields: [
                        {
                            name: `Powered by:`,
                            value: `**[listennotes.com](${url} '${url}')**`
                        }
                    ]
                })

                cast = connection.play(previousstream);
                cast.pause();
                cast.resume();

                sent.edit(previousembed);
                gideon.listening.remove(message.author.id);
            }

            if (reaction.emoji.id == emotes[2]) {
                cast.destroy();
                epnum++;
                const nextbody = await GetCast();
                const nextstream = nextbody.audio;

                const nextembed = Util.CreateEmbed(`Mike & Tom Eat Snacks ${nextbody.title_original}`, {
                    description: nextbody.description_original,
                    thumbnail: nextbody.thumbnail,
                    author: {
                        name: `Playing MATES for ${message.author.tag}:`,
                        icon: message.author.avatarURL()
                    },
                    fields: [
                        {
                            name: `Powered by:`,
                            value: `**[listennotes.com](${url} '${url}')**`
                        }
                    ]
                })

                cast = connection.play(nextstream);
                cast.pause();
                cast.resume();

                sent.edit(nextembed);
                gideon.listening.remove(message.author.id);
            }
        }); 

        cast.on('finish', async () => {
           cast.destroy();
           rcollector.stop();

           const finishedembed = Util.CreateEmbed(`Mike & Tom Eat Snacks ${body.title_original}`, {
            description: stripHtml(body.description + '\n\n Playback finished! :white_check_mark:'),
            thumbnail: body.thumbnail,
            author: {
                name: `Played MATES for ${message.author.tag}:`,
                icon: message.author.avatarURL()
            },
            fields: [
                {
                    name: `Powered by:`,
                    value: `**[listennotes.com](${url} '${url}')**`
                }
            ]
        })

            sent.edit(finishedembed);
        }); 
    }
    
    catch (ex) {
        console.log("Caught an exception while fetching API data: " + ex);
        Util.log("Caught an exception while fetching API data: " + ex);
        return message.channel.send(Util.CreateEmbed('An error occurred while fetching podcast data!'));
    }
}

module.exports.help = {
    name: ['mates', 'podcast'],
    type: "misc",
    help_text: "mates",
    help_desc: "Listen to the MATES podcast"
}