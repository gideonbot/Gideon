const Discord = module.require("discord.js");
const Util = require("../Util");
const fetch = require('node-fetch');
const stringSimilarity = require('string-similarity');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./data/scores.sqlite');

module.exports.run = async (gideon, message, args) => {
    const emotes = ['stop', '▶️'];
    const stopid = '669309980209446912';
    const auth = message.author.id;
    let chosenfilter;
    let tries = 3;
    let timerstart;
    let timerdiff;
    let timervalue;

    const as = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('You must supply a valid show!')
    .setDescription('Available shows:\n**flash**\n**arrow**\n**supergirl**\n**legends**\n**constantine**\n**blacklightning**\n**batwoman**')
    .setTimestamp()
    .setFooter(Util.config.footer, gideon.user.avatarURL());

    const er = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('An error occured while executing this command!')
    .setTimestamp()
    .setFooter(Util.config.footer, gideon.user.avatarURL());

    let agc = args[0];
    let filters = [
        {
            filter: (x => x.series !== 'Vixen' && x.series !== 'Freedom Fighters: The Ray')
        },
        {
            filter: (x => x.series == 'The Flash')
        },
        {
            filter: (x => x.series == 'Arrow')
        },
        {
            filter: (x => x.series == 'DC\'s Legends of Tomorrow')
        },
        {
            filter: (x => x.series == 'Supergirl')
        },
        {
            filter: (x => x.series == 'Black Lightning')
        },
        {
            filter: (x => x.series == 'Batwoman')
        },
        {
            filter: (x => x.series == 'Constantine')
        }
    ]

    let score = gideon.getScore.get(message.author.id);
    if (!score) {
        score = {
          id: `${message.author.id}`,
          user: message.author.id,
          guild: message.guild.id,
          points: 0
        }
    }

    let command = message.content.toLowerCase().split(' ')[0];

    if (command.endsWith('score') || command.endsWith('points')) {
        return message.reply(`You currently have \`${score.points}\` point(s)!`);
    }

    if (command.endsWith('leaderboard') || command.endsWith('highscores')) {
        const top10 = sql.prepare("SELECT * FROM scores ORDER BY points DESC LIMIT 10;").all();

        const leaderboard = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle(`Top 10 Leaderboard:`)
        .setTimestamp()
        .setFooter(Util.config.footer, gideon.user.avatarURL());


        for(const data of top10) {
            
            for (let i=1 ; i < top10.length +1; i++){
                const guild = gideon.guilds.get(data.guild);
                leaderboard.addField(`#\`${i < 10 ? "0" + i : i}\` User: \`${gideon.users.get(data.user).tag}\` Server: \`${guild.name}\``, `\`${data.points}\` point(s)`);
            }
        }

        return message.channel.send(leaderboard);
    }

    if (!agc) chosenfilter = filters[0].filter;
    else if (agc.match(/(?:flash)/i)) chosenfilter = filters[1].filter;
    else if (agc.match(/(?:arrow)/i)) chosenfilter = filters[2].filter;
    else if (agc.match(/(?:legends)/i)) chosenfilter = filters[3].filter;
    else if (agc.match(/(?:supergirl)/i)) chosenfilter = filters[4].filter;
    else if (agc.match(/(?:blacklightning)/i)) chosenfilter = filters[5].filter;
    else if (agc.match(/(?:batwoman)/i)) chosenfilter = filters[6].filter;
    else if (agc.match(/(?:constantine)/i)) chosenfilter = filters[7].filter;
    else return message.channel.send(as);

    async function GameEmbed(showfilter){
        const url = 'https://arrowverse.info';
        const api = "https://arrowverse.info/api";
        const body = await fetch(api).then(res => res.json());

        const shows = body.filter(showfilter);

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

    try{
        let embed = await GameEmbed(chosenfilter);

        const f = m => m.author.id === message.author.id;
        const collector = message.channel.createMessageCollector(f, {time: 30 * 1000});

        await message.channel.send(embed[0]).then(async sent => {
            await sent.react(emotes[1]).then(s => {}, failed => console.log("Failed to react with " + emoji + ": " + failed));
            await sent.react(stopid).then(s => {}, failed => console.log("Failed to react with " + emoji + ": " + failed));

            const rfilter = (reaction, user) => emotes.includes(reaction.emoji.name) && user.id === auth;
            const rcollector = sent.createReactionCollector(rfilter, {time: 30 * 1000});
            timerstart = new Date();
        
            rcollector.on('collect', async (reaction, user, reactionCollector) => {
                if (reaction.emoji.name === '▶️') {
                    let updateembed = await GameEmbed(chosenfilter);
                    await sent.edit(updateembed[0]);
                    sent.reactions.find(x => x.emoji.name === "▶️").users.remove(user.id);
                    collector.resetTimer();
                    rcollector.resetTimer();
                    embed = updateembed;
                    tries = 3;
                }
                if (reaction.emoji.name === 'stop') {
                    collector.stop();
                    return message.reply('your game round has been cancelled! :white_check_mark:');
                }
            }); 
        });

        collector.on('collect', async message => {
        const similarity = stringSimilarity.compareTwoStrings(embed[3].toLowerCase().replace(/\s/g, ""), message.content.toLowerCase().replace(/\s/g, ""));

            if (similarity >= 0.65) {
                collector.stop();
                score.points++;
                gideon.setScore.run(score);
                return message.reply(`that is correct! :white_check_mark:\n\`${embed[1]} ${embed[2]}\` is titled \`${embed[3]}\`\nYou have gained \`1\` point!`);
            }

            if (similarity <= 0.64) {
                tries = tries -1;
                let now = new Date();
                timerdiff = (now.getTime() - timerstart.getTime()) / 1000;
                timervalue = Math.round(30 - timerdiff);
                if (tries == 0) return collector.stop(), message.reply(`that is incorrect! :x:\n\`${embed[1]} ${embed[2]}\` is titled \`${embed[3]}\``);
                else message.reply(`that is incorrect! :x:\nYou have \`${tries}\` guess(es) and \`${timervalue}\` second(s) left!`);
            }
        });

        collector.on('end', (collected, reason) => {
            if (reason === 'time') return message.reply("You ran out of time!");
        });
    }
    catch (ex) {
        console.log("Caught an exception while running guesseps.js: " + ex);
        Util.log("Caught an exception while running guesseps.js: " + ex);
        return message.channel.send(er);
    }
}

module.exports.help = {
    name: ["guess", "guesseps", "points", "score", "leaderboard", "highscores"],
    type: "fun",
    help_text: "!guess",
    help_desc: "Arrowverse episode guessing game"
}