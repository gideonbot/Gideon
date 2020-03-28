const Discord = require("discord.js");
const randomFile = require('select-random-file');
const path = require('path');
const Util = require("../../Util");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 * @param {Discord.VoiceConnection} connection
 */
module.exports.run = async (gideon, message, args, connection) => {
    const dir = path.resolve(__dirname, '../../data/audio/phrases');
    randomFile(dir, (err, file) => {
        let rfile = `${dir}/${file}`;
        const phrase = connection.play(rfile);
        phrase.pause();
        phrase.resume();

        phrase.on('finish', () => {
            phrase.destroy();
            gideon.vcmdexec = false;
        }); 
    })
}

module.exports.help = {
    name: "talk",
    type: "voice",
    help_text: "Talk to me",
    help_desc: "Talks to the user",
    owner: false,
    voice: true,
    timevault: false,
    roles: [],
    user_perms: [],
    bot_perms: []
}