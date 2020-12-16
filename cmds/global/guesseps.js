import Util from '../../Util.js';
import stringSimilarity from 'string-similarity';

/**
 * @param {Discord.Intercation} interaction
 * @param {object[]} args
 */
export async function run(interaction, args) {
    const url = 'https://arrowverse.info';
    const emotes = ['▶️', '669309980209446912'];
    let s = ['guess', 'second', 'point', 'try', 'tries', 'got', 'had'];
    let chosenfilter;
    let tries = 3;
    let points = 0;
    let timerstart = new Date();

    if (interaction.member.user.guessing) return interaction.reply(Util.Embed('A guessing game is already running!', null, interaction.member));
    
    interaction.member.user.guessing = true;

    let filters = [
        (x => x.series !== 'Vixen' && x.series !== 'Freedom Fighters: The Ray' && x.series !== 'Black Lightning'),
        (x => x.series == 'The Flash'),
        (x => x.series == 'Arrow'),
        (x => x.series == 'DC\'s Legends of Tomorrow'),
        (x => x.series == 'Supergirl'),
        (x => x.series == 'Batwoman'),
        (x => x.series == 'Constantine')
    ];

    let score = process.gideon.getScore.get(interaction.member.id);
    if (!score) {
        score = {
            id: interaction.member.id,
            user: interaction.member.user.tag,
            guild: interaction.guild.id,
            points: 0
        };
        process.gideon.setScore.run(score);
    }

    if (!args) chosenfilter = filters[0];
    else if (args[0].value === 'flash') chosenfilter = filters[1];
    else if (args[0].value === 'arrow') chosenfilter = filters[2];
    else if (args[0].value === 'legends') chosenfilter = filters[3];
    else if (args[0].value === 'supergirl') chosenfilter = filters[4];
    else if (args[0].value === 'batwoman') chosenfilter = filters[5];
    else if (args[0].value === 'constantine') chosenfilter = filters[6];

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
        const body = await Util.fetchJSON('https://arrowverse.info/api');

        const shows = body.filter(showfilter);

        const randomep = shows[Math.floor(Math.random() * shows.length)];
        const show = randomep.series;
        const epnum = randomep.episode_id;
        const epname = randomep.episode_name;
        const epairdate = new Date(randomep.air_date);

        const gameembed = Util.Embed(`Guessing game for ${interaction.member.user.tag}:`, {
            description: `Please guess the following Arrowverse episode's name:\n\`${show} ${epnum}\`\n\n(Press :arrow_forward: to skip this episode or <:stop:669309980209446912> to end this round)`,
            author: {
                name: `You've got ${tries} ${tries !== 1 ? s[4] : s[3]} and ${Countdown()} ${Countdown() != 1 ? s[1] + 's' : s[1]} left!`,
                value: interaction.member.user.avatarURL()
            },
            fields: [
                {
                    name: 'Powered by:',
                    value: `**[arrowverse.info](${url} '${url}')**`
                }
            ]
        }, interaction.member);

        return {embed: gameembed, show: show, ep_and_s: epnum, ep_name: epname, airdate: epairdate};
    }

    try {
        let game = await GetGame(chosenfilter);

        const f = m => m.author.id === interaction.member.id;
        const collector = interaction.channel.createMessageCollector(f, {time: 30 * 1000});

        let sent = await interaction.channel.send(game.embed); //interaction.edit() not supported yet

        for (let emoji of emotes) {
            await sent.react(emoji).then(async () => { await Util.delay(2000); }, failed => console.log('Failed to react with ' + emoji + ': ' + failed));
        }

        const rfilter = (reaction, user) => (emotes.includes(reaction.emoji.name) || emotes.includes(reaction.emoji.id)) && user.id === interaction.member.id;
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

                const stopembed = Util.Embed(`Guessing game for ${interaction.member.user.tag}:`, {
                    description: 'Your game round has been cancelled! :white_check_mark:',
                    author: {
                        name: `You've had ${tries} ${tries !== 1 ? s[4] : s[3]} and ${Countdown()} ${Countdown() > 1 ? s[1] + 's' : s[1]} left!`,
                        icon: interaction.member.user.avatarURL()
                    },
                    fields: [
                        {
                            name: 'Powered by:',
                            value: `**[arrowverse.info](${url} '${url}')**`   
                        }
                    ]
                }, interaction.member);

                interaction.member.user.guessing = false;
                return sent.edit(stopembed);
            }
        }); 

        collector.on('collect', async message => {
            const similarity = stringSimilarity.compareTwoStrings(game.ep_name.toLowerCase().replace(/\s/g, ''), message.content.toLowerCase().replace(/\s/g, ''));

            if (similarity >= 0.65) {
                collector.stop();

                if (tries === 3) points = 3;
                else if (tries === 2) points = 2;
                else if (tries === 1) points = 1;

                let airdate_bonus = CalculateAirDatePoints(game.airdate);
                points += airdate_bonus;
                IncreasePoints(points);
                process.gideon.setScore.run(score);
                tries--;

                const correctembed = Util.Embed(`Guessing game for ${interaction.member.user.tag}:`, {
                    description: `That is correct! :white_check_mark:\n\`${game.show} ${game.ep_and_s} - ${game.ep_name}\`\n\n**You have gained \`${points}\` ${points > 1 ? s[2] + 's' : s[2]}!**\n(Airdate point bonus: \`+${airdate_bonus}\`)`,
                    author: {
                        name: `You've had ${tries} ${tries !== 1 ? s[4] : s[3]} and ${Countdown()} ${Countdown() != 1 ? s[1] + 's' : s[1]} left!`,
                        icon: interaction.member.user.avatarURL()
                    },
                    fields: [
                        {
                            name: 'Powered by:',
                            value: `**[arrowverse.info](${url} '${url}')**`
                        }
                    ]
                }, interaction.member);

                interaction.member.user.guessing = false;
                await sent.edit(correctembed);
                return sent.reactions.removeAll();
            }

            tries--;
            let question = `\`${game.show} ${game.ep_and_s}\``;
            let solution = `\`${game.show} ${game.ep_and_s} - ${game.ep_name}\``;

            const incorrectembed = Util.Embed(`Guessing game for ${interaction.member.user.tag}:`, {
                description: `That is incorrect! :x:\n${tries == 0 ? solution : question}`,
                author: {
                    name: `You've ${tries == 0 ? s[6] : s[5]} ${tries} ${tries !== 1 ? s[4] : s[3]} and ${Countdown()} ${Countdown() != 1 ? s[1] + 's' : s[1]} left!`,
                    icon: interaction.member.user.avatarURL()
                },
                fields: [
                    {
                        name: 'Powered by:',
                        value: `**[arrowverse.info](${url} '${url}')**`
                    }
                ]
            }, interaction.member);

            if (tries == 0) {
                collector.stop();
                interaction.member.user.guessing = false;
                await sent.reactions.removeAll();
                return sent.edit(incorrectembed);
            }

            else await sent.edit(incorrectembed);
        });
    
        collector.on('end', async (collected, reason) => {
            if (reason === 'time') {
                const timeouttembed = Util.Embed(`Guessing game for ${interaction.member.user.tag}:`, {
                    description: `You ran out of time!\n\`${game.show} ${game.ep_and_s} - ${game.ep_name}\``,
                    author: {
                        name: `You've had ${tries} ${tries !== 1 ? s[4] : s[3]} left!`,
                        icon: interaction.member.user.avatarURL()
                    },
                    fields: [
                        {
                            name: 'Powered by:',
                            value: `**[arrowverse.info](${url} '${url}')**`
                        }
                    ]
                }, interaction.member);

                interaction.member.user.guessing = false;
                await sent.reactions.removeAll();
                return sent.edit(timeouttembed);
            }
        });
    }

    catch (ex) {
        Util.log('Caught an exception while running guesseps.js: ' + ex.stack);
        interaction.reply(Util.Embed('An error occurred while executing this command!', null, interaction.member));
    }
}

export let help = {
    id: '788776924561801226',
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: ['MANAGE_MESSAGES']
};