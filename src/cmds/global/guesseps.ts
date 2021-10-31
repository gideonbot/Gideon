/* eslint-disable @typescript-eslint/ban-ts-comment */
import Util from '../../Util.js';
import stringSimilarity from 'string-similarity';
import { CommandInteraction, GuildMember, TextChannel, Message, MessageButton, Permissions, MessageComponentInteraction, MessageActionRow } from 'discord.js';
import { Command, GuessingScore } from 'src/@types/Util.js';
import gideonapi from 'gideon-api';

export async function run(interaction: CommandInteraction): Promise<unknown> {
    await interaction.deferReply();
    const url = 'https://arrowverse.info';
    const s = ['guess', 'second', 'point', 'try', 'tries', 'got', 'had'];
    const buttons = [
        new MessageButton().setStyle('PRIMARY').setLabel('Skip').setCustomId('skip'),
        new MessageButton().setStyle('DANGER').setLabel('Cancel').setCustomId('cancel'),
    ];
    // eslint-disable-next-line no-unused-vars
    let chosenfilter: (x: gideonapi.AviInfo) => boolean = () => { return true; };
    let tries = 3;
    let points = 0;
    let timerstart = new Date();

    if (interaction.user.guessing) {
        return interaction.editReply({embeds: [Util.Embed('A guessing game is already running!', undefined, interaction.member as GuildMember)]});
    }
    
    interaction.user.guessing = true;

    const filters = [
        ((x: gideonapi.AviInfo) => x.series !== 'Vixen' && x.series !== 'Freedom Fighters: The Ray' && x.series !== 'Black Lightning'),
        ((x: gideonapi.AviInfo) => x.series == 'The Flash'),
        ((x: gideonapi.AviInfo) => x.series == 'Arrow'),
        ((x: gideonapi.AviInfo) => x.series == 'DC\'s Legends of Tomorrow'),
        ((x: gideonapi.AviInfo) => x.series == 'Supergirl'),
        ((x: gideonapi.AviInfo) => x.series == 'Batwoman'),
        ((x: gideonapi.AviInfo) => x.series == 'Constantine')
    ];

    let score: GuessingScore = process.gideon.getScore.get(interaction.user.id);
    if (!score) {
        score = {
            id: interaction.user.id,
            user: interaction.user.tag,
            guild: interaction.guild?.id as string,
            points: 0
        };
        process.gideon.setScore.run(score);
    }

    if (!interaction.options.data[0]) chosenfilter = filters[0];
    else if (interaction.options.data[0]?.value === 'flash') chosenfilter = filters[1];
    else if (interaction.options.data[0]?.value === 'arrow') chosenfilter = filters[2];
    else if (interaction.options.data[0]?.value === 'legends') chosenfilter = filters[3];
    else if (interaction.options.data[0]?.value === 'supergirl') chosenfilter = filters[4];
    else if (interaction.options.data[0]?.value === 'batwoman') chosenfilter = filters[5];
    else if (interaction.options.data[0]?.value === 'constantine') chosenfilter = filters[6];

    function Countdown() {
        const timerdiff = (Date.now() - timerstart.getTime()) / 1000;
        return Math.round(30 - timerdiff);
    }

    function IncreasePoints(points: number) {
        score.points += points;
    }

    function CalculateAirDatePoints(airdate: Date) {
        const difference = Math.floor(Math.floor(new Date().getTime() - new Date(airdate).getTime()) / (1000 * 60 * 60 * 24));
        return Math.round(difference / 100);
    }

    // eslint-disable-next-line no-unused-vars
    async function GetGame(showfilter: (x: gideonapi.AviInfo) => boolean) {
        const body = await gideonapi.avi();

        const shows = body.filter(showfilter);

        const randomep = shows[Math.floor(Math.random() * shows.length)];
        const show = randomep.series;
        const epnum = randomep.episode_id;
        const epname = randomep.episode_name;
        const epairdate = new Date(randomep.air_date);

        const gameembed = Util.Embed(`Guessing game for ${interaction.user.tag}:`, {
            description: `Please guess the following Arrowverse episode's name:\n\`${show} ${epnum}\``,
            author: {
                name: `You've got ${tries} ${tries !== 1 ? s[4] : s[3]} and ${Countdown()} ${Countdown() != 1 ? s[1] + 's' : s[1]} left!`,
                icon: interaction.user.displayAvatarURL()
            },
            fields: [
                {
                    name: 'Powered by:',
                    value: `**[arrowverse.info](${url} '${url}')**`
                }
            ]
        }, interaction.member as GuildMember);

        return {embed: gameembed, show: show, ep_and_s: epnum, ep_name: epname, airdate: epairdate};
    }

    try {
        let game = await GetGame(chosenfilter);

        const f = (m: Message) => m.author.id === interaction.user.id;
        const collector = (interaction.channel as TextChannel)?.createMessageCollector({filter: f, time: 30 * 1000} );

        await interaction.editReply({embeds: [game.embed], components: [new MessageActionRow().addComponents(buttons)]});
        const message = await interaction.fetchReply() as Message;

        const filter = (i: MessageComponentInteraction) => i.user.id === interaction.user.id;
        const bcollector = message.createMessageComponentCollector({ filter, time: 840000 });
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        bcollector.on('collect', async i => {
            if (i.customId === 'skip') {
                tries = 3;
                points = 0;

                game = await GetGame(chosenfilter);

                collector.resetTimer();
                
                await interaction.editReply({embeds: [game.embed], components: [new MessageActionRow().addComponents(buttons)]});
                
                timerstart = new Date();
                return;
            }
            else if (i.customId === 'cancel') {
                collector.stop();

                const stopembed = Util.Embed(`Guessing game for ${interaction.user.tag}:`, {
                    description: 'Your game round has been cancelled! :white_check_mark:',
                    author: {
                        name: `You've had ${tries} ${tries !== 1 ? s[4] : s[3]} and ${Countdown()} ${Countdown() > 1 ? s[1] + 's' : s[1]} left!`,
                        icon: interaction.user.displayAvatarURL()
                    },
                    fields: [
                        {
                            name: 'Powered by:',
                            value: `**[arrowverse.info](${url} '${url}')**`   
                        }
                    ]
                }, interaction.member as GuildMember);

                interaction.user.guessing = false;
                return interaction.editReply({embeds: [stopembed], components: []});
            }
        });
        //@ts-ignore
        bcollector.on('end', async () => await interaction.editReply('The game has ended. You can start a new one.'));
    
        //@ts-ignore
        collector.on('collect', async message => {
            const similarity = stringSimilarity.compareTwoStrings(game.ep_name.toLowerCase().replace(/\s/g, ''), message.content.toLowerCase().replace(/\s/g, ''));

            if (similarity >= 0.65) {
                collector.stop();

                if (tries === 3) points = 3;
                else if (tries === 2) points = 2;
                else if (tries === 1) points = 1;

                const airdate_bonus = CalculateAirDatePoints(game.airdate);
                points += airdate_bonus;
                IncreasePoints(points);
                process.gideon.setScore.run(score);
                tries--;

                const correctembed = Util.Embed(`Guessing game for ${interaction.user.tag}:`, {
                    description: `That is correct! :white_check_mark:\n\`${game.show} ${game.ep_and_s} - ${game.ep_name}\`\n\n**You have gained \`${points}\` ${points > 1 ? s[2] + 's' : s[2]}!**\n(Airdate point bonus: \`+${airdate_bonus}\`)`,
                    author: {
                        name: `You've had ${tries} ${tries !== 1 ? s[4] : s[3]} and ${Countdown()} ${Countdown() != 1 ? s[1] + 's' : s[1]} left!`,
                        icon: interaction.user.displayAvatarURL()
                    },
                    fields: [
                        {
                            name: 'Powered by:',
                            value: `**[arrowverse.info](${url} '${url}')**`
                        }
                    ]
                }, interaction.member as GuildMember);

                interaction.user.guessing = false;
                await interaction.editReply({embeds: [correctembed], components: []});
            }

            tries--;
            const question = `\`${game.show} ${game.ep_and_s}\``;
            const solution = `\`${game.show} ${game.ep_and_s} - ${game.ep_name}\``;

            const incorrectembed = Util.Embed(`Guessing game for ${interaction.user.tag}:`, {
                description: `That is incorrect! :x:\n${tries == 0 ? solution : question}`,
                author: {
                    name: `You've ${tries == 0 ? s[6] : s[5]} ${tries} ${tries !== 1 ? s[4] : s[3]} and ${Countdown()} ${Countdown() != 1 ? s[1] + 's' : s[1]} left!`,
                    icon: interaction.user.displayAvatarURL()
                },
                fields: [
                    {
                        name: 'Powered by:',
                        value: `**[arrowverse.info](${url} '${url}')**`
                    }
                ]
            }, interaction.member as GuildMember);

            if (tries == 0) {
                collector.stop();
                interaction.user.guessing = false;
                return interaction.editReply({embeds: [incorrectembed], components: []});
            }

            else await interaction.editReply({embeds: [incorrectembed], components: [new MessageActionRow().addComponents(buttons)]});
        });
    
        //@ts-ignore
        collector.on('end', async (collected, reason) => {
            if (reason === 'time') {
                const timeouttembed = Util.Embed(`Guessing game for ${interaction.user.tag}:`, {
                    description: `You ran out of time!\n\`${game.show} ${game.ep_and_s} - ${game.ep_name}\``,
                    author: {
                        name: `You've had ${tries} ${tries !== 1 ? s[4] : s[3]} left!`,
                        icon: interaction.user.displayAvatarURL()
                    },
                    fields: [
                        {
                            name: 'Powered by:',
                            value: `**[arrowverse.info](${url} '${url}')**`
                        }
                    ]
                }, interaction.member as GuildMember);

                interaction.user.guessing = false;
                return interaction.editReply({embeds: [timeouttembed], components: []});
            }
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (ex: any) {
        Util.log('Caught an exception while running guesseps.js: ' + ex.stack);
        return interaction.reply({ content: 'An error occurred while processing your request:```\n' + ex + '```', ephemeral: true });
    }
}

export const info: Command['info'] = {
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: [Permissions.FLAGS.MANAGE_MESSAGES]
};

export const data: Command['data'] = {
    name: 'guess',
    description: 'Arrowverse episode guessing game',
    defaultPermission: true,
    options: [
        {
            type: 'STRING',
            name: 'show',
            description: 'The show you want to guess for',
            choices: [
                {
                    name: 'The Flash',
                    value: 'flash'
                },
                {
                    name: 'Arrow',
                    value: 'arrow'
                },
                {
                    name: 'DC\'s Legends of Tomorrow',
                    value: 'legends'
                },
                {
                    name: 'Supergirl',
                    value: 'supergirl'
                },
                {
                    name: 'Batwoman',
                    value: 'batwoman'
                },
                {
                    name: 'Constantine',
                    value: 'constantine'
                }
            ]
        }
    ]
};