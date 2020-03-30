const Discord = require("discord.js");
const path = require('path');
const Util = require("../../Util");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 * @param {Discord.VoiceConnection} connection
 */
module.exports.run = async (gideon, message, args, connection) => {
    const orders = connection.play(path.resolve(__dirname, '../../data/audio/captain/Awaiting orders, Captain.m4a'));
    orders.pause();
    orders.resume();

    orders.on('finish', () => {
        orders.destroy();
        gideon.vcmdexec = false;
    }); 
}

module.exports.help = {
    name: "wakeword",
    type: "voice",
    help_text: "Hello Gideon <:voicerecognition:693521621184413777>",
    help_desc: "Greets the user",
    owner: false,
    voice: true,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
}