const Discord = require("discord.js");
const Util = require("../../Util");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message, args) => {
    const as = Util.CreateEmbed("You must supply valid input!");
    if (!args[0]) return message.channel.send(as);  
    if (!args[0].match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/)) return message.channel.send(as);  

    const emoji = gideon.emojis.cache.get(args[0].match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/)[3])

    const embed = Util.CreateEmbed(`Info about \`${emoji.name}\` (ID: \`${emoji.id}\`)`, {
        thumbnail: emoji.url,
        fields: [
            {
                name: `❯ Info`,
                value: 
                `• Identifier: \`${emoji}\`\n
                 • Creation Date: \`${emoji.createdAt.toUTCString()}\`\n
                 • URL: ${emoji.url}
                `
            }
        ]
    })

    message.channel.send(embed);
}

module.exports.help = {
    name: ["emoji", "emote"],
    type: "misc",
    help_text: "emoji <emoji>",
    help_desc: "Displays a GuildEmoji's info",
    owner: false,
    voice: false,
    timevault: false,
    roles: [],
    user_perms: [],
    bot_perms: []
}
