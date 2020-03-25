const Discord = require("discord.js");
const Util = require("../../Util");
const fetch = require('node-fetch');
const stringSimilarity = require('string-similarity');

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message, args) => {
    if (!message.channel.permissionsFor(message.guild.me).has('MANAGE_MESSAGES')) return message.reply('sorry can\'t do that without `MANAGE_MESSAGES`!');
    
    const url = 'https://arrowverse.info';
    const emotes = ['▶️', '669309980209446912'];
    let s = ['guess', 'second', 'point', 'try', 'tries', 'got', 'had'];
    let chosenfilter;
    let tries = 3;
    let points = 0;
    let timerstart = new Date();

    if (gideon.guessing.includes(message.author.id)) return message.channel.send(Util.CreateEmbed('A guessing game is already running!'));
    
    gideon.guessing.push(message.author.id);

    let agc = args[0];
    let filters = [
        (x => x.series !== 'Vixen' && x.series !== 'Freedom Fighters: The Ray'),
        (x => x.series == 'The Flash'),
        (x => x.series == 'Arrow'),
        (x => x.series == 'DC\'s Legends of Tomorrow'),
        (x => x.series == 'Supergirl'),
        (x => x.series == 'Black Lightning'),
        (x => x.series == 'Batwoman'),
        (x => x.series == 'Constantine')
    ]

    let command = message.content.toLowerCase().split(' ')[0];

    if (command.endsWith('leaderboard') || command.endsWith('highscores') || command.endsWith('lb')) {
        let leaderboard = Util.CreateEmbed(`Top 10 Leaderboard:`);

        let top10 = gideon.getTop10.all().filter(x => x.points > 0);

        if (top10.length < 1) leaderboard.setDescription("No entries yet!");

        else {
            leaderboard.setDescription(top10.map((data, i) => {
                let guild = gideon.guilds.cache.get(data.guild);
                let user = guild && guild.members.cache.get(data.user) ? guild.members.cache.get(data.user).user.tag : data.user;
                return "**#" + (i + 1) + "** - " + user + " in `" + (guild ? guild.name : "Unknown") + "`: **" + data.points + "** " + (data.points != 1 ? s[2] + "s" : s[2]);
            }).join("\n"));
        }

        return message.channel.send(leaderboard);
    }

    let score = gideon.getScore.get(message.author.id);
    if (!score) {
        score = {
            id: message.author.id,
            user: message.author.tag,
            guild: message.guild.id,
            points: 0
        }
        gideon.setScore.run(score);
    }

    if (command.endsWith('score') || command.endsWith('points')) {
        return message.reply(`You currently have \`${score.points}\` point(s)!`);
    }

    if (!agc) chosenfilter = filters[0];
    else if (agc.match(/(?:flash)/i)) chosenfilter = filters[1];
    else if (agc.match(/(?:arrow)/i)) chosenfilter = filters[2];
    else if (agc.match(/(?:legends)/i)) chosenfilter = filters[3];
    else if (agc.match(/(?:supergirl)/i)) chosenfilter = filters[4];
    else if (agc.match(/(?:blacklightning)/i)) chosenfilter = filters[5];
    else if (agc.match(/(?:batwoman)/i)) chosenfilter = filters[6];
    else if (agc.match(/(?:constantine)/i)) chosenfilter = filters[7];
    else return message.channel.send(Util.CreateEmbed('You must supply a valid show!', {
        description: 'Available shows:\n**flash**\n**arrow**\n**supergirl**\n**legends**\n**constantine**\n**blacklightning**\n**batwoman**'
    }));

    function Countdown() {
        let timerdiff = (Date.now() - timerstart.getTime()) / 1000;
        return Math.round(30 - timerdiff);
    }

    function IncreasePoints(points) {
        score.points += points;
    }

    /**
     * @param {Date} airdate 
     */
    function CalculateAirDatePoints(airdate) {
        const difference = Math.floor(Math.floor(new Date() - new Date(airdate)) / (1000 * 60 * 60 * 24));
        return Math.round(difference / 100);
    }

    /**
     * @param {Function} showfilter 
     * @returns {Promise<{embed: Discord.MessageEmbed, show: string, ep_and_s: string, airdate: Date, ep_name: string}>}
     */
    async function GetGame(showfilter) {
        const body = await fetch("https://arrowverse.info/api").then(res => res.json());

        const shows = body.filter(showfilter);

        const randomep = shows[Math.floor(Math.random() * shows.length)];
        const show = randomep.series;
        const epnum = randomep.episode_id;
        const epname = randomep.episode_name;
        const epairdate = new Date(randomep.air_date);

        const gameembed = Util.CreateEmbed(`Guessing game for ${message.author.tag}:`, {
            description: `Please guess the following Arrowverse episode's name:\n\`${show} ${epnum}\`\n\n(Press :arrow_forward: to skip this episode or <:stop:669309980209446912> to end this round)`,
            author: {
                name: `You've got ${tries} ${tries !== 1 ? s[4] : s[3]} and ${Countdown()} ${Countdown() != 1 ? s[1] + "s" : s[1]} left!`,
                value: message.author.avatarURL()
            },
            fields: [
                {
                    name: `Powered by:`,
                    value: `**[arrowverse.info](${url} '${url}')**`
                }
            ]
        });

        return {embed: gameembed, show: show, ep_and_s: epnum, ep_name: epname, airdate: epairdate};
    }

    try {
        let game = await GetGame(chosenfilter);

        const f = m => m.author.id === message.author.id;
        const collector = message.channel.createMessageCollector(f, {time: 30 * 1000});

        let sent = await message.channel.send(game.embed);
        for (let emoji of emotes) {
            await sent.react(emoji).then(() => {}, failed => console.log("Failed to react with " + emoji + ": " + failed));
        }

        const rfilter = (reaction, user) => (emotes.includes(reaction.emoji.name) || emotes.includes(reaction.emoji.id)) && user.id === message.author.id;
        const rcollector = sent.createReactionCollector(rfilter, {time: 30 * 1000});
    
        rcollector.on('collect', async (reaction, user) => {
            if (reaction.emoji.name == emotes[0]) {
                tries = 3;
                points = 0;

                game = await GetGame(chosenfilter);

                sent.reactions.cache.find(x => x.emoji.name == emotes[0]).users.remove(user.id);

                collector.resetTimer();
                rcollector.resetTimer();
                
                await sent.edit(game.embed);
                
                timerstart = new Date();
                return;
            }

            if (reaction.emoji.id == emotes[1]) {
                collector.stop();
                await sent.reactions.removeAll();

                const stopembed = Util.CreateEmbed(`Guessing game for ${message.author.tag}:`, {
                    description: `Your game round has been cancelled! :white_check_mark:`,
                    author: {
                        name: `You've had ${tries} ${tries !== 1 ? s[4] : s[3]} and ${Countdown()} ${Countdown() > 1 ? s[1] + "s" : s[1]} left!`,
                        icon: message.author.avatarURL()
                    },
                    fields: [
                        {
                            name: `Powered by:`,
                            value: `**[arrowverse.info](${url} '${url}')**`   
                        }
                    ]
                });

                gideon.guessing.remove(message.author.id);
                return sent.edit(stopembed);
            }
        }); 

        collector.on('collect', async message => {
            const similarity = stringSimilarity.compareTwoStrings(game.ep_name.toLowerCase().replace(/\s/g, ""), message.content.toLowerCase().replace(/\s/g, ""));

            if (similarity >= 0.65) {
                collector.stop();

                if (tries === 3) points = 3;
                else if (tries === 2) points = 2;
                else if (tries === 1) points = 1;

                let airdate_bonus = CalculateAirDatePoints(game.airdate);
                points += airdate_bonus;
                IncreasePoints(points);
                gideon.setScore.run(score);
                tries--;

                const correctembed = Util.CreateEmbed(`Guessing game for ${message.author.tag}:`, {
                    description: `That is correct! :white_check_mark:\n\`${game.show} ${game.ep_and_s} - ${game.ep_name}\`\n\n**You have gained \`${points}\` ${points > 1 ? s[2] + "s" : s[2]}!**\n(Airdate point bonus: \`+${airdate_bonus}\`)`,
                    author: {
                        name: `You've had ${tries} ${tries !== 1 ? s[4] : s[3]} and ${Countdown()} ${Countdown() != 1 ? s[1] + "s" : s[1]} left!`,
                        icon: message.author.avatarURL()
                    },
                    fields: [
                        {
                            name: `Powered by:`,
                            value: `**[arrowverse.info](${url} '${url}')**`
                        }
                    ]
                })

                gideon.guessing.remove(message.author.id);
                await sent.edit(correctembed);
                return sent.reactions.removeAll();
            }

            tries--;
            let question = `\`${game.show} ${game.ep_and_s}\``;
            let solution = `\`${game.show} ${game.ep_and_s} - ${game.ep_name}\``;

            const incorrectembed = Util.CreateEmbed(`Guessing game for ${message.author.tag}:`, {
                description: `That is incorrect! :x:\n${tries == 0 ? solution : question}`,
                author: {
                    name: `You've ${tries == 0 ? s[6] : s[5]} ${tries} ${tries !== 1 ? s[4] : s[3]} and ${Countdown()} ${Countdown() != 1 ? s[1] + "s" : s[1]} left!`,
                    icon: message.author.avatarURL()
                },
                fields: [
                    {
                        name: `Powered by:`,
                        value: `**[arrowverse.info](${url} '${url}')**`
                    }
                ]
            })

            if (tries == 0) {
                collector.stop();
                gideon.guessing.remove(message.author.id);
                await sent.reactions.removeAll();
                return sent.edit(incorrectembed);
            }

            else await sent.edit(incorrectembed);
        });
    
        collector.on('end', async (collected, reason) => {
            if (reason === 'time') {
                const timeouttembed = Util.CreateEmbed(`Guessing game for ${message.author.tag}:`, {
                    description: `You ran out of time!\n\`${game.show} ${game.ep_and_s} - ${game.ep_name}\``,
                    author: {
                        name: `You've had ${tries} ${tries !== 1 ? s[4] : s[3]} left!`,
                        icon: message.author.avatarURL()
                    },
                    fields: [
                        {
                            name: `Powered by:`,
                            value: `**[arrowverse.info](${url} '${url}')**`
                        }
                    ]
                });

                gideon.guessing.remove(message.author.id);
                await sent.reactions.removeAll();
                return sent.edit(timeouttembed);
            }
        });
    }

    catch (ex) {
        console.log("Caught an exception while running guesseps.js: " + ex.stack);
        Util.log("Caught an exception while running guesseps.js: " + ex.stack);
        message.channel.send(Util.CreateEmbed('An error occured while executing this command!'));
    }
}

module.exports.help = {
    name: ["guess", "guesseps", "points", "score", "leaderboard", "highscores", "lb"],
    type: "fun",
    help_text: "guess",
    help_desc: "Arrowverse episode guessing game"
}