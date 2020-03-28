const Discord = require("discord.js");
const fetch = require('node-fetch');
const Util = require("../../Util");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message) => {
    const api = 'https://api.github.com/repos/adrifcastr/Gideon/issues';
    const token = process.env.GITHUB_OAUTH_TOKEN;

    const author = message.author.tag;
    const auth = message.author.id;
    const stopid = '669309980209446912';

    let command = message.content.toLowerCase().split(' ')[0];

    if (command.endsWith('issue') || command.endsWith('bug')) {
        if (!token) {
            Util.log("Missing env variable for issues command!");
            console.log("Missing env variable for issues command!");
            return message.channel.send(Util.CreateEmbed('This command is not available currently'));
        }

        const filter = m => m.author.id === message.author.id;
        const collector = message.channel.createMessageCollector(filter, {time: 120 * 1000});

        let sent = await message.channel.send(Util.CreateEmbed('Post an issue to GitHub:', {description: 'Please type the issue\'s title below:\nYou\'ve got `2` minutes.\n\n(Press <:stop:669309980209446912> to cancel your post)'}));
        await sent.react(stopid).catch(failed => console.log("Failed to react with " + stopid + ": " + failed));

        const rfilter = (reaction, user) => user.id === auth;
        const rcollector = sent.createReactionCollector(rfilter, {time: 30 * 1000});

        rcollector.on('collect', async reaction => {
            if (reaction.emoji.id == stopid) {
                collector.stop();
                await sent.reactions.removeAll();
                await sent.edit(Util.CreateEmbed('Post an issue to GitHub:', {description: 'Your issue post has been cancelled! :white_check_mark:'}));
            }
        }); 

        rcollector.on('end', async (collected, reason) => {
            if (reason === 'time') sent.edit(Util.CreateEmbed('Post an issue to GitHub:', {description: 'You ran out of time!'}));
        });

        try {
            let collected1 = await message.channel.awaitMessages(filter, { max: 1, time: 120 * 1000, errors: ['time'] });
            if (!collected1 || !collected1.first() || !collected1.first().content) return;

            let issuetitle = collected1.first().content;
            await Util.delay(200);
            await collected1.first().delete();
            await sent.edit(Util.CreateEmbed('Post an issue to GitHub:', {description: 'Please type the issue\'s body below:\nYou\'ve got `2` minutes.\n\n(Press <:stop:669309980209446912> to cancel your post)'}));

            let collected2 = await message.channel.awaitMessages(filter, { max: 1, time: 120 * 1000, errors: ['time'] });
            if (!collected2 || !collected2.first() || !collected2.first().content) return;

            let issuebody = collected2.first().content;
            await Util.delay(200);
            await collected2.first().delete();
            await sent.edit(Util.CreateEmbed('Post an issue to GitHub:', {description: 'Thank you!\nYour issue has been submitted to GitHub! :white_check_mark:'}));
            await sent.reactions.removeAll();
            
            rcollector.stop();

            let issue = {
                'title': `Bug report by ${author}: ` + issuetitle,
                'body': issuebody + `\n\nSubmitted via Discord by ${author}.`,
                'labels': ['bug']
            }
            
            fetch(api, { method: 'POST', body: JSON.stringify(issue), headers: { 'Content-Type': 'application/json', 'Authorization': "token " + token }});
        }

        catch (ex) {
            console.log("Caught an exception while running issues.js: " + ex.stack);
            Util.log("Caught an exception while running issues.js: " + ex.stack);
            return message.channel.send(Util.CreateEmbed('An error occured while executing this command!'));
        }
    }

    else try {
        const body = await fetch(api).then(res => res.json()); 
        const issues = Util.CreateEmbed('Issues: ' + body.length);

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
        console.log("Caught an exception while fetching issues: " + ex.stack);
        Util.log("Caught an exception while fetching issues: " + ex.stack);
        return message.channel.send(Util.CreateEmbed('An error occured while executing this command!'));
    }
}

module.exports.help = {
    name: ["issues", "issue", "bug"],
    type: "misc",
    help_text: "issues",
    help_desc: "Displays Github issues and allows to submit new ones.",
    owner: false,
    voice: false,
    timevault: false,
    roles: [],
    user_perms: [],
    bot_perms: []
}