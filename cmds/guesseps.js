const Discord = module.require("discord.js");
const Util = require("../Util");
const fetch = require('node-fetch');
const stringSimilarity = require('string-similarity');

module.exports.run = async (gideon, message, args) => {
    await StartGame();

    async function StartGame(){
        const url = 'https://arrowverse.info';
        const api = "https://arrowverse.info/api";
        const body = await fetch(api).then(res => res.json());
        const shows = body.filter(x => x.series !== 'Vixen' && x.series !== 'Freedom Fighters: The Ray');

        const randomep = shows[Math.floor(Math.random() * shows.length)];
        const show = randomep.series;
        const epnum = randomep.episode_id;
        const epname = randomep.episode_name;

        const emotes = ['stop', '▶️'];
        const stopid = '669309980209446912';
        const auth = message.author.id;

        const startgame = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle(`Guessing game started for ${message.author.tag}:`)
        .setDescription(`Please guess the following Arrowverse episode's name:\n\`${show} ${epnum}\`\n\n(React to :arrow_forward: to skip this episode or <:stop:669309980209446912> to end this round)`)
        .addField(`Powered by:`, `**[arrowverse.info](${url} '${url}')**`)
        .setTimestamp()
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        const f = m => m.author.id === message.author.id;
        const collector = message.channel.createMessageCollector(f, {time: 30 * 1000});

        await message.channel.send(startgame).then(async sent => {
            await sent.react(emotes[1]).then(s => {}, failed => console.log("Failed to react with " + emoji + ": " + failed));
            await sent.react(stopid).then(s => {}, failed => console.log("Failed to react with " + emoji + ": " + failed));

            const rfilter = (reaction, user) => emotes.includes(reaction.emoji.name) && user.id === auth;

            const rcollector = sent.createReactionCollector(rfilter, {time: 30 * 1000});
        
            rcollector.on('collect', (reaction, reactionCollector) => {
                if (reaction.emoji.name === '▶️') {
                    collector.stop()
                    message.reply('skipping this episode! :white_check_mark:');
                    return StartGame();
                }
                if (reaction.emoji.name === 'stop') {
                    collector.stop();
                    return message.reply('your game round has been cancelled! :white_check_mark:');
                }
            });
        });

        collector.on('collect', async message => {
            const similarity = stringSimilarity.compareTwoStrings(epname.toLowerCase().replace(/\s/g, ""), message.content.toLowerCase().replace(/\s/g, ""));

            if (message.content.toLowerCase() === 'cancel' || message.content.toLowerCase() === 'stop') {
                collector.stop();
                return message.reply('your game round has been cancelled! :white_check_mark:');
            }

            if (message.content.toLowerCase() === 'next' || message.content.toLowerCase() === 'skip') {
                collector.stop();
                message.reply('skipping this episode! :white_check_mark:');
                return StartGame();
            }

            if (similarity >= 0.5) {
                collector.stop();
                return message.reply(`that is correct! :white_check_mark:\n\`${show} ${epnum}\` is titled \`${epname}\``);
            }

            if (similarity <= 0.49) {
                collector.stop();
                return message.reply(`that is incorrect! :x:\n\`${show} ${epnum}\` is titled \`${epname}\``);
            }
        });

        collector.on('end', (collected, reason) => {
            if (reason === 'time') return message.reply("You ran out of time!");
        });

    }
}

module.exports.help = {
    name: ["guess", "guesseps"],
    type: "fun",
    help_text: "!guess",
    help_desc: "Arrowverse episode guessing game"
}