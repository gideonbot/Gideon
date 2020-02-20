const Discord = require("discord.js");
const Util = require("../Util");
const fetch = require('node-fetch');
const stringSimilarity = require('string-similarity');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./data/SQL/gideon.sqlite');

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message, args) => {
    const url = 'https://arrowverse.info';
    const api = "https://arrowverse.info/api";
    const emotes = ['▶️', '669309980209446912'];
    let s = ['guess', 'second', 'point', 'try', 'tries', 'got', 'had'];
    const auth = message.author.id;
    let chosenfilter;
    let tries = 3;
    let p = 0;
    let multiplicator;
    let timerstart = new Date();
    let timerdiff;
    let timervalue;

    const as = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('You must supply a valid show!')
    .setDescription('Available shows:\n**flash**\n**arrow**\n**supergirl**\n**legends**\n**constantine**\n**blacklightning**\n**batwoman**')
    .setFooter(Util.config.footer, gideon.user.avatarURL());

    const er = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('An error occured while executing this command!')
    .setFooter(Util.config.footer, gideon.user.avatarURL());

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

    let score = gideon.getScore.get(message.author.id);
    if (!score) {
        score = {
            id: `${message.author.id}`,
            user: message.author.tag,
            guild: message.guild.id,
            points: 0
        }
        await gideon.setScore.run(score);
    }

    let command = message.content.toLowerCase().split(' ')[0];

    if (command.endsWith('score') || command.endsWith('points')) {
        console.log(score);
        console.log(score.points);
        return message.reply(`You currently have \`${score.points}\` point(s)!`);
    }

    if (command.endsWith('leaderboard') || command.endsWith('highscores') || command.endsWith('lb')) {
        const top10 = sql.prepare("SELECT * FROM scores ORDER BY points DESC LIMIT 10;").all();

        const leaderboard = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle(`Top 10 Leaderboard:`)
        .setFooter(Util.config.footer, gideon.user.avatarURL());
        
        let i = 1;
        for(let data of top10.values()) {
    /*        gideon.shard.broadcastEval(`
                const guild = this.guilds.cache.get(${data.guild});
                let msg;
                if (channel) {
                    msg = channel.fetchMessage('id').then(m => m.id);
                }
                msg;
            `);
            const guildslist = await gideon.shard.fetchClientValues('guilds.cache').then(results => {return results}).catch(console.error);
    */        const guild = gideon.guilds.cache.get(data.guild);

            let name = guild.members.cache.get(data.user) ? guild.members.cache.get(data.user).user.tag : data.user;

            leaderboard.addField(`#\`${Util.normalize(i)}\` User: \`${name}\` Server: \`${guild.name}\``, `\`${data.points}\` ${data.points != 1 ? s[2] + "s" : s[2]}`);
            i++;
        }

        return message.channel.send(leaderboard);
    }

    if (!agc) chosenfilter = filters[0];
    else if (agc.match(/(?:flash)/i)) chosenfilter = filters[1];
    else if (agc.match(/(?:arrow)/i)) chosenfilter = filters[2];
    else if (agc.match(/(?:legends)/i)) chosenfilter = filters[3];
    else if (agc.match(/(?:supergirl)/i)) chosenfilter = filters[4];
    else if (agc.match(/(?:blacklightning)/i)) chosenfilter = filters[5];
    else if (agc.match(/(?:batwoman)/i)) chosenfilter = filters[6];
    else if (agc.match(/(?:constantine)/i)) chosenfilter = filters[7];
    else return message.channel.send(as);

    function Countdown() {
        let now = new Date();
        timerdiff = (now.getTime() - timerstart.getTime()) / 1000;
        timervalue = Math.round(30 - timerdiff);
        return timervalue;
    }

    async function PointsAmt() {
        score.points++;
        console.log(score.points);
    }

    async function PointsMulti(airdate) {
        const difference = Math.floor(Math.floor(new Date() - new Date(airdate)) / (1000 * 60 * 60 * 24));

        multiplicator = difference / 100;
        const finalpoints = Math.round(multiplicator + p);
        if (finalpoints <= 0) return p = 0;
        console.log(p);
        p = finalpoints;
        console.log(p);
        for (let pa = 0; pa < p; pa++) await PointsAmt();
    }

    async function GameEmbed(showfilter) {
        const body = await fetch(api).then(res => res.json());

        const shows = body.filter(showfilter);

        const randomep = shows[Math.floor(Math.random() * shows.length)];
        const show = randomep.series;
        const epnum = randomep.episode_id;
        const epname = randomep.episode_name;
        const epairdate = randomep.air_date;

        const gameembed = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle(`Guessing game for ${message.author.tag}:`)
        .setAuthor(`You've got ${tries} ${tries !== 1 ? s[4] : s[3]} and ${Countdown()} ${Countdown() != 1 ? s[1] + "s" : s[1]} left!`, message.author.avatarURL())
        .setDescription(`Please guess the following Arrowverse episode's name:\n\`${show} ${epnum}\`\n\n(Press :arrow_forward: to skip this episode or <:stop:669309980209446912> to end this round)`)
        .addField(`Powered by:`, `**[arrowverse.info](${url} '${url}')**`)
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        return [gameembed, show, epnum, epname, epairdate];
    }

    try {
        let embed = await GameEmbed(chosenfilter);

        const f = m => m.author.id === message.author.id;
        const collector = message.channel.createMessageCollector(f, {time: 30 * 1000});

        let sent = await message.channel.send(embed[0]);
        for (let emoji of emotes) {
            await sent.react(emoji).then(() => {}, failed => console.log("Failed to react with " + emoji + ": " + failed));
        }

        const rfilter = (reaction, user) => (emotes.includes(reaction.emoji.name) || emotes.includes(reaction.emoji.id)) && user.id === auth;
        const rcollector = sent.createReactionCollector(rfilter, {time: 30 * 1000});
    
        rcollector.on('collect', async (reaction, user) => {
            if (reaction.emoji.name == emotes[0]) {
                tries = 3;
                p = 0;
                let updateembed = await GameEmbed(chosenfilter);
                sent.reactions.cache.find(x => x.emoji.name == emotes[0]).users.remove(user.id);
                collector.resetTimer();
                rcollector.resetTimer();
                await sent.edit(updateembed[0]);
                timerstart = new Date();
                embed = updateembed;
            }

            if (reaction.emoji.id == emotes[1]) {
                collector.stop();
                await sent.reactions.removeAll();

                const stopembed = new Discord.MessageEmbed()
                .setColor('#2791D3')
                .setTitle(`Guessing game for ${message.author.tag}:`)
                .setAuthor(`You've had ${tries} ${tries !== 1 ? s[4] : s[3]} and ${Countdown()} ${Countdown() > 1 ? s[1] + "s" : s[1]} left!`, message.author.avatarURL())
                .setDescription(`Your game round has been cancelled! :white_check_mark:`)
                .addField(`Powered by:`, `**[arrowverse.info](${url} '${url}')**`)
                .setFooter(Util.config.footer, gideon.user.avatarURL());

                return sent.edit(stopembed);
            }
        }); 

        collector.on('collect', async message => {
            const similarity = stringSimilarity.compareTwoStrings(embed[3].toLowerCase().replace(/\s/g, ""), message.content.toLowerCase().replace(/\s/g, ""));

            if (similarity >= 0.65) {
                collector.stop();

                if (tries === 3) p = 3;
                else if (tries === 2) p = 2;
                else if (tries === 1) p = 1;

                for (let pa = 0; pa < p; pa++) await PointsAmt();
                
                await PointsMulti(embed[4]);
                await gideon.setScore.run(score);
                tries--;

                const correctembed = new Discord.MessageEmbed()
                .setColor('#2791D3')
                .setTitle(`Guessing game for ${message.author.tag}:`)
                .setAuthor(`You've had ${tries} ${tries !== 1 ? s[4] : s[3]} and ${Countdown()} ${Countdown() != 1 ? s[1] + "s" : s[1]} left!`, message.author.avatarURL())
                .setDescription(`That is correct! :white_check_mark:\n\`${embed[1]} ${embed[2]} - ${embed[3]}\`\n\n**You have gained \`${p}\` ${p > 1 ? s[2] + "s" : s[2]}!**\n(Airdate point bonus: \`+${multiplicator}\`)`)
                .addField(`Powered by:`, `**[arrowverse.info](${url} '${url}')**`)
                .setFooter(Util.config.footer, gideon.user.avatarURL());

                await sent.edit(correctembed);
                return sent.reactions.removeAll();
            }

            tries--;
            let question = `\`${embed[1]} ${embed[2]}\``;
            let solution = `\`${embed[1]} ${embed[2]} - ${embed[3]}\``;

            const incorrectembed = new Discord.MessageEmbed()
            .setColor('#2791D3')
            .setTitle(`Guessing game for ${message.author.tag}:`)
            .setAuthor(`You've had ${tries == 0 ? s[6] : s[5]} ${tries} ${tries !== 1 ? s[4] : s[3]} and ${Countdown()} ${Countdown() != 1 ? s[1] + "s" : s[1]} left!`, message.author.avatarURL())
            .setDescription(`That is incorrect! :x:\n${tries == 0 ? solution : question}`)
            .addField(`Powered by:`, `**[arrowverse.info](${url} '${url}')**`)
            .setFooter(Util.config.footer, gideon.user.avatarURL());

            if (tries == 0) {
                collector.stop();
                await sent.reactions.removeAll();
                return sent.edit(incorrectembed);
            }

            else await sent.edit(incorrectembed);
        });
    
        collector.on('end', async (collected, reason) => {
            if (reason === 'time') {
                const timeouttembed = new Discord.MessageEmbed()
                .setColor('#2791D3')
                .setTitle(`Guessing game for ${message.author.tag}:`)
                .setAuthor(`You've had ${tries} ${tries !== 1 ? s[4] : s[3]} left!`, message.author.avatarURL())
                .setDescription(`You ran out of time!\n\`${embed[1]} ${embed[2]} - ${embed[3]}\``)
                .addField(`Powered by:`, `**[arrowverse.info](${url} '${url}')**`)
                .setFooter(Util.config.footer, gideon.user.avatarURL());

                await sent.reactions.removeAll();
                return sent.edit(timeouttembed);
            }
        });
    }

    catch (ex) {
        console.log("Caught an exception while running guesseps.js: " + ex);
        Util.log("Caught an exception while running guesseps.js: " + ex);
        return message.channel.send(er);
    }
}

module.exports.help = {
    name: ["guess", "guesseps", "points", "score", "leaderboard", "highscores", "lb"],
    type: "fun",
    help_text: "!guess",
    help_desc: "Arrowverse episode guessing game"
}