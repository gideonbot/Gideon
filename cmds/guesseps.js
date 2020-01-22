const Discord = module.require("discord.js");
const Util = require("../Util");
const fetch = require('node-fetch');
const stringSimilarity = require('string-similarity');

module.exports.run = async (gideon, message, args) => {
    const emotes = ['stop', '▶️'];
    const stopid = '669309980209446912';
    const auth = message.author.id;

    async function GameEmbed(){
        const url = 'https://arrowverse.info';
        const api = "https://arrowverse.info/api";
        const body = await fetch(api).then(res => res.json());
        const shows = body.filter(x => x.series !== 'Vixen' && x.series !== 'Freedom Fighters: The Ray');

        const randomep = shows[Math.floor(Math.random() * shows.length)];
        const show = randomep.series;
        const epnum = randomep.episode_id;
        const epname = randomep.episode_name;

        const gameembed = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle(`Guessing game started for ${message.author.tag}:`)
        .setDescription(`Please guess the following Arrowverse episode's name:\n\`${show} ${epnum}\`\n\n(Press :arrow_forward: to skip this episode or <:stop:669309980209446912> to end this round)`)
        .addField(`Powered by:`, `**[arrowverse.info](${url} '${url}')**`)
        .setTimestamp()
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        return [gameembed, show, epnum, epname];
    }

    let embed = await GameEmbed();

    const f = m => m.author.id === message.author.id;
        const collector = message.channel.createMessageCollector(f, {time: 30 * 1000});

        await message.channel.send(embed[0]).then(async sent => {
            await sent.react(emotes[1]).then(s => {}, failed => console.log("Failed to react with " + emoji + ": " + failed));
            await sent.react(stopid).then(s => {}, failed => console.log("Failed to react with " + emoji + ": " + failed));
    
            const rfilter = (reaction, user) => emotes.includes(reaction.emoji.name) && user.id === auth;
            const rcollector = sent.createReactionCollector(rfilter, {time: 30 * 1000});
        
            rcollector.on('collect', (reaction, user, reactionCollector) => {
                if (reaction.emoji.name === '▶️') {
                    //let updateembed = GameEmbed();
                    //console.log(updateembed[0]);
                    //sent.edit(updateembed[0]);
                    sent.reactions.find(x => x.emoji.name === "▶️").users.remove(user.id);
                    collector.time = 30 * 1000;
                    rcollector.time = 30 * 1000;
                    //embed = updateembed;
                }
                if (reaction.emoji.name === 'stop') {
                    collector.stop();
                    return message.reply('your game round has been cancelled! :white_check_mark:');
                }
            });
        });

    collector.on('collect', async message => {
    const similarity = stringSimilarity.compareTwoStrings(embed[3].toLowerCase().replace(/\s/g, ""), message.content.toLowerCase().replace(/\s/g, ""));

        if (similarity >= 0.5) {
            collector.stop();
            return message.reply(`that is correct! :white_check_mark:\n\`${embed[1]} ${embed[2]}\` is titled \`${embed[3]}\``);
        }

        if (similarity <= 0.49) {
            collector.stop();
            return message.reply(`that is incorrect! :x:\n\`${embed[1]} ${embed[2]}\` is titled \`${embed[3]}\``);
        }
    });

    collector.on('end', (collected, reason) => {
        if (reason === 'time') return message.reply("You ran out of time!");
    });
}

module.exports.help = {
    name: ["guess", "guesseps"],
    type: "fun",
    help_text: "!guess",
    help_desc: "Arrowverse episode guessing game"
}