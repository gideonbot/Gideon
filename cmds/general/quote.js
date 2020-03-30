const Discord = require("discord.js");
const Util = require("../../Util");
const gideonapi = require('gideon-api');

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message) => {
    try {
        const quote = await gideonapi.quote();
        message.channel.send(Util.CreateEmbed(null, {description: '**' + quote.text + '**', thumbnail: quote.img}));
    }

    catch (ex) {
        console.log("An error occurred while trying to fetch a quote: " + ex.stack);
        Util.log("An error occurred while trying to fetch a quote: " + ex.stack);

        return message.channel.send(Util.CreateEmbed('Failed to fetch a quote, please try again later!'));
    }
}

module.exports.help = {
    name: "quote",
    type: "fun",
    help_text: "quote",
    help_desc: "Displays a random quote",
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
}