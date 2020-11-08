import Util from '../../Util.js';
import { Readable } from 'stream';
import path from 'path';
import { fileURLToPath } from 'url';
const SILENCE_FRAME = Buffer.from([0xF8, 0xFF, 0xFE]);

class Silence extends Readable {
    _read() {
        this.push(SILENCE_FRAME);
        this.destroy();
    }
}

/**
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(message, args) {
    if (!process.env.WITAI_TOKEN) {
        Util.log('WITAI_TOKEN is missing in .env!');
        return message.reply('This command is not available currently!');
    }

    const voicehelp = Util.Embed('Usage of Voice™ Commands:', {
        description: 'Use `!voice tutorial` for a video tutorial.\n\nUse Gideon Voice™ commands by speaking into your microphone\n\nNo further response means the input was not recognized or no Voice™ enabled command was used'}, message.member)
        .setAuthor('Note: Not all commands are Voice™ compatible!', message.author.avatarURL());
    
    const command = message.content.toLowerCase().split(' ')[0];
    if (command.endsWith('leave')) return Util.Voice.LeaveVC(message);

    if (args.length > 0) {
        if (args[0].toLowerCase() === 'help') return message.channel.send(voicehelp);
        if (args[0].toLowerCase() === 'tutorial') return message.channel.send('https://drive.google.com/file/d/1nShWSKfnMoksKgcWao-kdLeeZjJ9K2-e/view');
    }

    if (message.guild.voice && message.guild.voice.channel) return message.channel.send('I am already in a voice channel in this server!');

    let vc = message.member.voice.channel;

    if (!vc) return message.reply('You need to join a voice channel first!');
    if (!vc.permissionsFor(message.guild.me).has('CONNECT')) return message.reply('I don\'t have the permission to join your voice channel!');
    
    try {
        message.reply(`Now joining voice channel: \`${vc.name}\`!`);
        const connection = await vc.join();
        connection.play(new Silence(), { type: 'opus' }); //enable voice receive by sending silence buffer

        setTimeout(() => {
            connection.play(path.resolve(fileURLToPath(import.meta.url), '../../../data/audio/extra/thisfiledoesntexist.mp3')); //fix djs bug by sending stuff that doesn't exist
        }, 2000);

        await message.channel.send(message.author.toString(), { embed: voicehelp });
        
        connection.on('speaking', async (user, speaking) => {
            if (connection.speaking.has('SPEAKING')) return; //disable speechrecognition while the bot is talking
            if (user.bot) return; //don't listen to bots
            
            if (speaking.has('SPEAKING')) {
                console.log(`Listening to ${user.tag}`);

                const audio = connection.receiver.createStream(user, { mode: 'pcm' });

                audio.on('end', () => console.log(`Stopped listening to ${user.tag}`));

                const SpeechRec = await Util.Voice.SpeechRecognition(audio).catch(ex => {
                    Util.log(ex);
                    message.reply('An error occurred, leaving the voice channel!');
                    Util.Voice.LeaveVC(message);
                });

                if (SpeechRec && SpeechRec.intents && SpeechRec.intents[0]) {
                    await Util.Voice.VoiceResponse(SpeechRec.intents[0].name, message, connection, Util, user);
                }
            }
        }); 
    }
    
    catch (ex) {
        Util.log('Caught an exception while running voice.js: ' + ex.stack);
        message.channel.send(Util.Embed('An error occurred while executing this command!', null, message.member));
    } 
}

export const help = {
    name: ['voice', 'join', 'leave'],
    type: 'fun',
    help_text: 'voice',
    help_desc: 'Use Gideon Voice™',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: ['CONNECT', 'SPEAK'],
    bot_perms: ['CONNECT', 'SPEAK']
};
