import Discord from "discord.js";
import Util from "../../Util.js";
import { Readable } from 'stream';
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
export async function run(gideon, message, args) {
    let command = message.content.toLowerCase().split(' ')[0];

    const voicehelp = Util.CreateEmbed(`Usage of Voice™ Commands:`, {
    description: `Use \`!voice tutorial\` for a video tutorial.\n\nUse Gideon Voice™ commands by speaking into your microphone\n\nNo further response means the input was not recognized or no Voice™ enabled command was used`}, message.member)
    .setAuthor(`Note: Not all commands are Voice™ compatible!`, message.author.avatarURL())

    if (command.endsWith('leave')) {
       await Util.Voice.LeaveVC(message);
       return;
    }

    if (args[0] === 'help') {
       await message.channel.send(voicehelp);
       return;
    }

    if (args[0] === 'tutorial') {
       const url = 'https://drive.google.com/file/d/1nShWSKfnMoksKgcWao-kdLeeZjJ9K2-e/view';
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
                })

                const SpeechRec = await Util.Voice.SpeechRecognition(audio, message.channel, gideon);

                if (SpeechRec) {
                    let entities = SpeechRec.entities;
                    if (!entities) return;
    
                    let intent = Object.values(entities)[0];
                    if (!intent) return;
    
                    let value = intent[0].value;
                    await Util.Voice.VoiceResponse(value, gideon, message, connection, Util);
                }
            }
        }); 
    }
    
    catch (ex) {
        console.log("Caught an exception while running voice.js: " + ex.stack);
        Util.log("Caught an exception while running voice.js: " + ex.stack);
        message.channel.send(Util.CreateEmbed('An error occured while executing this command!', null, message.member));
    } 
}

export const help = {
    name: ["voice", "join", "leave"],
    type: "fun",
    help_text: "voice",
    help_desc: "Use Gideon Voice™",
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: ['CONNECT', 'SPEAK', 'USE_VAD'],
    bot_perms: ['CONNECT', 'SPEAK', 'USE_VAD']
}