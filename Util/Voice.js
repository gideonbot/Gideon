const Discord = require('discord.js');
const path = require('path');
const fetch = require('node-fetch');

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
        message.reply(`now leaving voice channel: \`${vcname}\`!`);
        await message.guild.me.voice.channel.leave();
    }

    /**
     * Voicechannel Speech-To-Text 
     * @param {ReadableStream} speech 
     */
    static async SpeechRecognition(speech) {
        if (!process.env.WITAI_TOKEN) return null;
        
        const { Transform } = require('stream')

        function convertBufferTo1Channel(buffer) {
            const convertedBuffer = Buffer.alloc(buffer.length / 2)

            for (let i = 0; i < convertedBuffer.length / 2; i++) {
                const uint16 = buffer.readUInt16LE(i * 4)
                convertedBuffer.writeUInt16LE(uint16, i * 2)
            }

            return convertedBuffer;
        }

        class ConvertTo1ChannelStream extends Transform {
            constructor(source, options) {
                super(options);
            }

            _transform(data, encoding, next) {
                next(null, convertBufferTo1Channel(data))
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
     * @param {string} value 
     * @param {Discord.VoiceConnection} connection 
     * @param {Discord.Message} message
     * @param {Discord.Client} gideon
     */
    static async VoiceResponse(value, connection, message, gideon) {
        const randomFile = require('select-random-file');
        
        if (value === 'wakeword') {
            gideon.vcmdexec = true;
            const orders = connection.play(path.resolve(__dirname, '../data/audio/captain/Awaiting orders, Captain.m4a'));
            orders.pause();
            orders.resume();

            orders.on('finish', async () => {
                orders.destroy();
                await message.reply('voice command succesfully executed!');
                gideon.vcmdexec = false;
            }); 
            return;
        }

        if (value == 'talk') {
            gideon.vcmdexec = true;
            const dir = path.resolve(__dirname, '../data/audio/phrases');
            await randomFile(dir, (err, file) => {
                let rfile = `${dir}/${file}`;
                const phrase = connection.play(rfile);
                phrase.pause();
                phrase.resume();

                phrase.on('finish', async () => {
                    phrase.destroy();
                    await message.reply('voice command succesfully executed!');
                    gideon.vcmdexec = false;
                }); 
            })
            return;
        }

        if (value == 'leave') {
            gideon.vcmdexec = true;
            const leave = connection.play(path.resolve(__dirname, '../data/audio/captain/Yes, Captain.m4a'));
            leave.pause();
            leave.resume();

            leave.on('finish', async () => {
                leave.destroy();
                await message.reply('voice command succesfully executed!');
                await this.LeaveVC(message);
                gideon.vcmdexec = false;
            });
            return;
        }

        if (value == 'timejump') {
            gideon.vcmdexec = true;
            const confirm = connection.play(path.resolve(__dirname, '../data/audio/captain/Right away, Captain!.m4a'));
            confirm.pause();
            confirm.resume();

            confirm.on('finish', () => {
                confirm.destroy();

                const timejump = connection.play(path.resolve(__dirname, '../data/audio/phrases/Executing timejump now.m4a'));
                timejump.pause();
                timejump.resume();

                timejump.on('finish', async () => {
                    timejump.destroy();
                    const command = gideon.commands.get('plot');
                    if (command) await command.run(gideon, message);
                    await message.reply('voice command succesfully executed!');
                    gideon.vcmdexec = false;
                });
            });
            return;
        }

        if (value == 'future') {
            gideon.vcmdexec = true;
            const confirm = connection.play(path.resolve(__dirname, '../data/audio/captain/Right away, Captain!.m4a'));
            confirm.pause();
            confirm.resume();

            confirm.on('finish', async () => {
                confirm.destroy();
                const command = gideon.commands.get('show');
                if (command) await command.run(gideon, message);
                await message.reply('voice command succesfully executed!');
                gideon.vcmdexec = false;
            });
            return;
        }
        
        if (value == 'nxeps') {
            gideon.vcmdexec = true;
            const confirm = connection.play(path.resolve(__dirname, '../data/audio/captain/Right away, Captain!.m4a'));
            confirm.pause();
            confirm.resume();

            confirm.on('finish', async () => {
                confirm.destroy();
                const command = gideon.commands.get('nxeps');
                if (command) await command.run(gideon, message);
                await message.reply('voice command succesfully executed!');
                gideon.vcmdexec = false;
            });
            return;
        }
        else return;
    }
}

module.exports = Voice;
