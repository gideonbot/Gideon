import Discord from 'discord.js';
import fetch from 'node-fetch';
import { Transform } from 'stream';

class Voice {
    constructor() {
        throw new Error('This class cannot be instantiated!');
    }

    /**
     * Leave current VoiceChannel 
     * @param {Discord.Message} message 
     */
    static async LeaveVC(message) {
        if (!message.guild.me.voice.channel) return;
        let vcname = message.guild.me.voice.channel.name;
        message.reply(`Now leaving voice channel: \`${vcname}\`!`);
        await message.guild.me.voice.channel.leave();
    }

    /**
     * Voicechannel Speech-To-Text 
     * @param {ReadableStream} speech 
     */
    static async SpeechRecognition(speech) {
        if (!process.env.WITAI_TOKEN) return null;

        function convertBufferTo1Channel(buffer) {
            const convertedBuffer = Buffer.alloc(buffer.length / 2);

            for (let i = 0; i < convertedBuffer.length / 2; i++) {
                const uint16 = buffer.readUInt16LE(i * 4);
                convertedBuffer.writeUInt16LE(uint16, i * 2);
            }

            return convertedBuffer;
        }

        class ConvertTo1ChannelStream extends Transform {
            constructor(source, options) {
                super(options);
            }

            _transform(data, encoding, next) {
                next(null, convertBufferTo1Channel(data));
            }
        }

        const convertTo1ChannelStream = new ConvertTo1ChannelStream();
        const rawaudio = speech.pipe(convertTo1ChannelStream);

        const api = 'https://api.wit.ai/speech';
        const content_type = 'audio/raw;encoding=signed-integer;bits=16;rate=48000;endian=little';
        const headers = { 'Content-Type': content_type, Authorization: 'Bearer ' + process.env.WITAI_TOKEN, Accept: 'application/vnd.wit.' + '20170217' };
        const options = { method: 'POST', body: rawaudio, headers: headers };

        let result = await fetch(api, options).then(res => res.json());

        console.log(result);
        return result;
    }

    /**
     * Audio Response/Voice cmd exec 
     * @param {string} intent 
     * @param {Discord.VoiceConnection} connection 
     * @param {Discord.Message} message
     */
    static async VoiceResponse(intent, message, connection, Util) {
        const data = {
            channel: message.channel,
            id: message.id,
            type: 0,
            content: `<@${process.gideon.user.id}> ${intent}`,
            author: message.author,
            partial: message.partial
        };
        
        let voicemsg = new Discord.Message(process.gideon, data, message.channel);
        voicemsg.voice = true;
        Util.MsgHandler.Handle(voicemsg, Util, connection);
    }
}

export default Voice;
