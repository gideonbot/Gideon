const Discord = require("discord.js");
const Util = require("../../Util");
const { Readable } = require('stream');
const SILENCE_FRAME = Buffer.from([0xF8, 0xFF, 0xFE]);

class Silence extends Readable {
    _read() {
        this.push(SILENCE_FRAME);
        this.destroy();
    }
}

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message, args) => {
    let command = message.content.toLowerCase().split(' ')[0];
    let awake = false;

    const er = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('An error occured while executing this command!')
    .setFooter(Util.config.footer, gideon.user.avatarURL());

    const voicehelp = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setAuthor(`Note: You must wake Gideon up before using any commands!`, message.author.avatarURL())
    .setTitle(`Available Voice Commands:`)
    .setDescription(`Use \`!voice tutorial\` for a video tutorial.`)
    .addField(`Wakeword:`,`Say something like:\n\`\`\`'Gideon'\n'Hey Gideon'\n'Hello Gideon'\n etc...\`\`\`\nGideon will be ready!`, true)
    .addField(`Random Phrases:`,`Say something like:\n\`\`\`'Talk'\n'Talk to me'\n'Say something'\n etc...\`\`\`\nGideon will randomly respond!`, true)
    .addField(`Time Travel:`,`Say something like:\n\`\`\`'Plot a course'\n'Time travel'\n'Timejump'\n etc...\`\`\`\nGideon will plot a course!`, true)
    .addField(`Future:`,`Say something like:\n\`\`\`'Show me the future'\n'What's the future'\n'future'\n etc...\`\`\`\nGideon show you the future!`, true)
    .addField(`Upcoming Eps:`,`Say something like:\n\`\`\`'Upcoming Episodes'\n'Next Arrowverse episodes'\n'Next episodes'\n etc...\`\`\`\nGideon will show you the next eps!`, true)
    .addField(`Leave VC:`,`Say something like:\n\`\`\`'Leave'\n'Stop'\n'Get out'\n etc...\`\`\`\nGideon will leave the VC!`, true)
    .setFooter(Util.config.footer, gideon.user.avatarURL());

    if (command.endsWith('leave')) {
       await Util.LeaveVC(message);
       return;
    }

    if (args[0] == 'help') {
       await message.channel.send(voicehelp);
       return;
    }

    if (args[0] == 'tutorial') {
       const url = 'https://drive.google.com/open?id=1or3CxJCQXkEaaKTU0jz7ZDGO4zwfRP8L';
       await message.channel.send(url);
       return;
    }

    if (!message.member.voice.channel) return message.reply('You need to join a voice channel first!');

    function stopTimout() {
        if (awake) clearTimeout(checkWake);
    }

    async function checkWake() {
        if (awake) stopTimout();
        else if (gideon.emptyvc) stopTimout();
        else {
            await Util.LeaveVC(message);
            return message.reply('no wakeword detected the last `20` seconds after joining VC!');
        }
    }
    
    try {
        let vcname = message.member.voice.channel.name;
        message.reply(`now joining voice channel: \`${vcname}\`!`);
        const connection = await message.member.voice.channel.join();
        connection.play(new Silence(), { type: 'opus' }); //enable voice receive by sending silence buffer

        await message.channel.send(Util.GetUserTag(message.author), { embed: voicehelp });

        setTimeout(checkWake, 20000); //check if wakeword has been used since joining

        connection.on('speaking', async (user, speaking) => {
            if (gideon.vcmdexec) return; //disable speechrocgnition while voice command is running
            
            if (speaking.has('SPEAKING')) {
                console.log(`Scribe: listening to ${user.username}`);
                console.log(`Scribe: SPEAKING ${speaking}`, speaking);

                const audio = connection.receiver.createStream(user, { mode: 'pcm' });

                audio.on('end', () => console.log(`Scribe: stopped listening to ${user.username}`));

                let wake = await Util.SpeechRecognition(audio);

                if (wake) {
                    let entities = wake.entities;
                    if (!entities) return;
    
                    let intent = Object.values(entities)[0];
                    if (!intent) return;
    
                    let value = intent[0].value;
    
                    if (value == 'wakeword') awake = true;
                    await Util.VoiceResponse(value, connection, message, gideon);
                }
            }
        }); 
    }
    
    catch (ex) {
        console.log("Caught an exception while running voice.js: " + ex);
        Util.log("Caught an exception while running voice.js: " + ex);
        return message.channel.send(er);
    } 
}

module.exports.help = {
    name: ["voice", "join", "leave"],
    type: "fun",
    help_text: "voice",
    help_desc: "Joins voice channel for voice commands"
}