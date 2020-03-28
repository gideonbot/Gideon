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

    const voicehelp = Util.CreateEmbed(`Usage of Voice™ Commands:`, {description: `Use \`!voice tutorial\` for a video tutorial.`})
    .setAuthor(`Note: Not all commands are Voice™ compatible!`, message.author.avatarURL())
/*    .addField(`Wakeword:`,`Say something like:\n\`\`\`'Gideon'\n'Hey Gideon'\n'Hello Gideon'\n etc...\`\`\`\nGideon will be ready!`, true)
    .addField(`Random Phrases:`,`Say something like:\n\`\`\`'Talk'\n'Talk to me'\n'Say something'\n etc...\`\`\`\nGideon will randomly respond!`, true)
    .addField(`Time Travel:`,`Say something like:\n\`\`\`'Plot a course'\n'Time travel'\n'Timejump'\n etc...\`\`\`\nGideon will plot a course!`, true)
    .addField(`Future:`,`Say something like:\n\`\`\`'Show me the future'\n'What's the future'\n'future'\n etc...\`\`\`\nGideon show you the future!`, true)
    .addField(`Upcoming Eps:`,`Say something like:\n\`\`\`'Upcoming Episodes'\n'Next Arrowverse episodes'\n'Next episodes'\n etc...\`\`\`\nGideon will show you the next eps!`, true)
    .addField(`Leave VC:`,`Say something like:\n\`\`\`'Leave'\n'Stop'\n'Get out'\n etc...\`\`\`\nGideon will leave the VC!`, true);
    //peepee
*/
    if (command.endsWith('leave')) {
       await Util.Voice.LeaveVC(message);
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
    
    try {
        let vcname = message.member.voice.channel.name;
        message.reply(`now joining voice channel: \`${vcname}\`!`);
        const connection = await message.member.voice.channel.join();
        connection.play(new Silence(), { type: 'opus' }); //enable voice receive by sending silence buffer

        await message.channel.send(message.author.toString(), { embed: voicehelp });

        connection.on('speaking', async (user, speaking) => {
            if (gideon.vcmdexec) return; //disable speechrocgnition while voice command is running
            
            if (speaking.has('SPEAKING')) {
                console.log(`Listening to ${user.username}`);
                console.log(`SPEAKING:`, speaking);

                const audio = connection.receiver.createStream(user, { mode: 'pcm' });

                audio.on('end', () => {
                    console.log(`Stopped listening to ${user.username}`);

                    const SpeechRec = await Util.Voice.SpeechRecognition(audio, message.channel);

                    if (SpeechRec) {
                        let entities = SpeechRec.entities;
                        if (!entities) return;
        
                        let intent = Object.values(entities)[0];
                        if (!intent) return;
        
                        let value = intent[0].value;
        
                        await Util.Voice.VoiceResponse(value, gideon, message, connection, Util);
                    }
                })
            }
        }); 
    }
    
    catch (ex) {
        console.log("Caught an exception while running voice.js: " + ex.stack);
        Util.log("Caught an exception while running voice.js: " + ex.stack);
        message.channel.send(Util.CreateEmbed('An error occured while executing this command!'));
    } 
}

module.exports.help = {
    name: ["voice", "join", "leave"],
    type: "fun",
    help_text: "voice",
    help_desc: "Use Gideon Voice™",
    owner: false,
    voice: false,
    timevault: false,
    roles: [],
    user_perms: ['CONNECT', 'SPEAK', 'USE_VAD'],
    bot_perms: ['CONNECT', 'SPEAK', 'USE_VAD']
}