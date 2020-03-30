const Discord = require("discord.js");
const Util = require("../../Util");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message, args) => {
    const auth = message.author;

    const user = message.mentions.users.first();
    if (!user) return message.channel.send('You must use a proper mention if you want to cuddle someone!');
    
    message.channel.send(Util.CreateEmbed(null, {
        description: `**${auth} you have cuddled ${user}!**\n\nA Beebo-tastic cuddle always brightens the mood!`,
        image: 'https://i.imgur.com/IOpmt2j.gif'
    }));
}

module.exports.help = {
    name: ["cuddle", "hug"],
    type: "fun",
    help_text: "cuddle <user>",
    help_desc: "Gives the selected user a Beebo-tastic cuddle",
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
}