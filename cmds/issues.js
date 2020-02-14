const Discord = module.require("discord.js");
const fetch = require('node-fetch');
const Util = require("../Util");

module.exports.run = async (gideon, message, args) => {
    const api = 'https://api.github.com/repos/adrifcastr/Gideon/issues';
    const token = process.env.GITHUB_OAUTH_TOKEN
    let issuetitle;
    let issuebody;
    const author = message.author.tag;
    const auth = message.author.id;
    const emote = 'stop';
    const stopid = '669309980209446912';

    const er = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('An error occured while executing this command!')
    .setFooter(Util.config.footer, gideon.user.avatarURL());

    const issuerequest = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('Post an issue to GitHub:')
    .setDescription('Please type the issue\'s title below:\nYou\'ve got `2` minutes.\n\n(Press <:stop:669309980209446912> to cancel your post)')
    .setFooter(Util.config.footer, gideon.user.avatarURL());

    const timeouttembed = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('Post an issue to GitHub:')
    .setDescription('You ran out of time!')
    .setFooter(Util.config.footer, gideon.user.avatarURL());

    const stopembed = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('Post an issue to GitHub:')
    .setDescription('Your issue post has been cancelled! :white_check_mark:')
    .setFooter(Util.config.footer, gideon.user.avatarURL());

    const issuebodyembed = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('Post an issue to GitHub:')
    .setDescription('Please type the issue\'s body below:\nYou\'ve got `2` minutes.\n\n(Press <:stop:669309980209446912> to cancel your post)')
    .setFooter(Util.config.footer, gideon.user.avatarURL());

    const finishedembed = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('Post an issue to GitHub:')
    .setDescription('Thank you!\nYour issue has been submitted to GitHub! :white_check_mark:')
    .setFooter(Util.config.footer, gideon.user.avatarURL());

    let command = message.content.toLowerCase().split(' ')[0];

    if (command.endsWith('issue') || command.endsWith('bug')) {
        const filter = m => m.author.id === message.author.id;
        const collector = message.channel.createMessageCollector(filter, {time: 120 * 1000});

        await message.channel.send(issuerequest).then(async sent => {
            await sent.react(stopid).then(s => {}, failed => console.log("Failed to react with " + emoji + ": " + failed));

            const rfilter = (reaction, user) => emote.includes(reaction.emoji.name) && user.id === auth;
            const rcollector = sent.createReactionCollector(rfilter, {time: 30 * 1000});

            rcollector.on('collect', async (reaction, reactionCollector) => {
                if (reaction.emoji.name === 'stop') {
                    await collector.stop();
                    await sent.reactions.removeAll();
                    await sent.edit(stopembed);
                    return;
                }
            }); 

            rcollector.on('end', async (collected, reason) => {
                if (reason === 'time') {
                    await sent.edit(timeouttembed);
                } 
            });

            try{
                await message.channel.awaitMessages(filter, { max: 1, time: 120 * 1000, errors: ['time'] })
                .then(async collected => {
                    issuetitle = collected.map(x => x.content);
                    await Util.delay(200);
                    await collected.first().delete();
                    await sent.edit(issuebodyembed);
                })
                .catch(async collected => {
                });

                await message.channel.awaitMessages(filter, { max: 1, time: 120 * 1000, errors: ['time'] })
                .then(async collected => {
                    issuebody = collected.map(x => x.content);
                    await Util.delay(200);
                    await collected.first().delete();
                    await sent.edit(finishedembed);
                    await sent.reactions.removeAll();
                    await rcollector.stop();
                })
                .catch(async collected => {
                });
            }
            catch (ex) {
                console.log("Caught an exception while running issues.js: " + ex);
                Util.log("Caught an exception while running issues.js: " + ex);
                return message.channel.send(er);
            }
            
            let issue = {
                'title': `Bug report by ${author}: ` + issuetitle,
                'body': issuebody + `\n\nSubmitted via Discord by ${author}.`,
                'labels': ['bug']
            }
            
            await fetch(api, {
            method: 'POST',
            body:    JSON.stringify(issue),
            headers: { 'Content-Type': 'application/json',
                        'Authorization': "token " + token },
            })
        });
    }
    else
    try {
        const body = await fetch(api).then(res => res.json()); 
    
        const issues = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('Issues: ' + body.length)
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        let issues_array = body.reverse();
        for (let item of issues_array) {
            try {
                issues.addField(`Issue #${item.number}: ${item.title}`, `Link: [GitHub](${item.html_url} '${item.html_url}') | Comments: \`${item.comments}\` | Opened by: \`${item.user.login}\``);
            }
            
            catch (ex) {
                console.log(`Error while fetching issues: ${ex.error ? ex.error : ex}`);
                Util.log(`Error while fetching issues: ${ex.error ? ex.error : ex}`);
            }
        }
    
        message.channel.send(issues);
    }
    
    catch (ex) {
        console.log("Caught an exception while fetching issues: " + ex);
        Util.log("Caught an exception while fetching issues: " + ex);
        return message.channel.send(er);
    }
}

module.exports.help = {
    name: ["issues", "issue", "bug"],
    type: "misc",
    help_text: "issues",
    help_desc: "Displays Github issues and allows to submit new ones."
}