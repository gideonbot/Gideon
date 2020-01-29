const Discord = module.require("discord.js");
const Util = require("../Util");
const randomFile = require('select-random-file');
const fetch = require('node-fetch');

module.exports.run = async (gideon, message, args) => {
    let command = message.content.toLowerCase().split(' ')[0];

    const er = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('An error occured while executing this command!')
    .setTimestamp()
    .setFooter(Util.config.footer, gideon.user.avatarURL());

    if (command.endsWith('leave')) {
        if (!message.guild.me.voice.channel) return;
        let vcname = message.guild.me.voice.channel.name;
        message.reply(`now leaving voice channel: \`${vcname}\`!`);
        await message.guild.me.voice.channel.leave();
        return;
    }
    else 

    if (!message.member.voice.channel) return message.reply('You need to join a voice channel first!');
    
    try {
        let vcname = message.member.voice.channel.name;
        message.reply(`now joining voice channel: \`${vcname}\`!`);
        const connection = await message.member.voice.channel.join();
/*
        const enableinput = connection.play('./data/audio/misc/silence.mp3');
        enableinput.pause();
        enableinput.resume();

        enableinput.on('finish', async () => {
            enableinput.destroy();
        }); 

        async function SpeechRecognition(speech){
            const api = 'https://api.wit.ai/speech';
            const content_type = 'audio/raw;encoding=signed-integer;bits=16;rate=48000;endian=little';

            const headers = {'Content-Type': content_type,
                             'Authorization': 'Bearer ' + process.env.WITAI_TOKEN,
                             'Accept': 'application/vnd.wit.' + '20170217'
            }

            const options = {
                method: 'POST',
                body: speech,
                headers: headers,
            }

            let result = await fetch(api, options)
            .then(res => res.json());

            return result;
        }

        connection.on('speaking', async (user, speaking) => {
            console.log('Detecting Input');
            const audio = connection.receiver.createStream(user, { mode: 'pcm' });
            let wake = await SpeechRecognition(audio);
            let entities = wake.entities;
            if (!entities) return;
            let value = Object.values(entities)[0];
            if (!value) return;
        
            if (value[0].value == 'wakeword'){
                console.log('awake!')
                connection.removeListener('speaking', async (user, speaking) => {});
                const orders = connection.play('./data/audio/captain/Awaiting orders, Captain.mp3');
                orders.pause();
                await orders.resume();
                return message.reply('voice command succesfully executed!');
            }  
        }) */

        const dirs = ['./data/audio/captain', './data/audio/phrases'];
        const dir = dirs[Math.floor(Math.random() * dirs.length)];
        await randomFile(dir, async (err, file) => {
            let rfile = `${dir}/${file}`;
            const dispatcher = connection.play(rfile);
            dispatcher.pause();
            dispatcher.resume();

            dispatcher.on('finish', async () => {
                await message.reply('playback finished!');
                dispatcher.destroy();
                await message.guild.me.voice.channel.leave();
            }); 
        }) 
    }
    catch (ex) {
        console.log("Caught an exception while running voice.js: " + ex);
        Util.log("Caught an exception while running voice.js: " + ex);
        return message.channel.send(er);
    } 
}

module.exports.help = {
    name: ["voice", "join", "leave"],
    type: "misc",
    help_text: "voice",
    help_desc: "Joins voice channel for voice commands"
}