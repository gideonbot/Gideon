const Discord = require("discord.js");
const Util = require("../../Util");
const fetch = require('node-fetch');
const Turndown = require('turndown');

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message, args) => {
    try {
        const source = `https://raw.githubusercontent.com/discordjs/discord.js/docs/12.0.2.json`;
        const queryString = encodeURI(args.join(' '));
        const api = `https://djsdocs.sorta.moe/v2/embed?src=${source}&q=${queryString}`;
        const body = await fetch(api).then(res => res.json());
        message.channel.send({ embed: body });
    }

    catch (ex) {
        console.log("Caught an exception while running djs.js: " + ex.stack);
        Util.log("Caught an exception while running djs.js: " + ex.stack);
        return message.channel.send(Util.CreateEmbed('An error occured while executing this command!'));
    }
}

module.exports.help = {
    name: ["djs", "discordjs", "lib"],
    type: "misc",
    help_text: "djs <query>",
    help_desc: "Searches discord.js docs",
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {force: true},
    roles: [],
    user_perms: [],
    bot_perms: []
}