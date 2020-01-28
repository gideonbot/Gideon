const Discord = module.require("discord.js");
const Util = require("../Util");
const randomFile = require('select-random-file');

module.exports.run = async (gideon, message, args) => {
    const er = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('An error occured while executing this command!')
    .setTimestamp()
    .setFooter(Util.config.footer, gideon.user.avatarURL());

    if (message.member.voice.channel) {
        try {
            const connection = await message.member.voice.channel.join();
            const dir = './data/audio';
            await randomFile(dir, async (err, file) => {
                const test = './data/audio/Dr. Heywood.mp3';
                let rfile = `${dir}/${file}`;
                const dispatcher = connection.play(rfile);
                dispatcher.pause();
                dispatcher.resume();

                dispatcher.on('finish', async () => {
                    await message.reply('playback finished!');
                    dispatcher.destroy();
                    await message.member.voice.channel.leave();
                });
            })
        }
        catch (ex) {
            console.log("Caught an exception while running voice.js: " + ex);
            Util.log("Caught an exception while running voice.js: " + ex);
            return message.channel.send(er);
        }
    } else {
        return message.reply('You need to join a voice channel first!');
    }
}

module.exports.help = {
    name: ["voice", "join"],
    type: "misc",
    help_text: "voice",
    help_desc: "Joins voice channel for voice commands"
}