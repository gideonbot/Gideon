const Discord = require("discord.js");
const Util = require("../../Util");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message, args) => {
    let tr = await Util.TR.Translate(args.join(' '));

    message.channel.send(Util.CreateEmbed(null, {
        author: {
            name: `Translation for ${message.author.tag}:`,
            icon: message.author.avatarURL()
        },
        fields: [
            {
                name: `Original Text: ${tr[1]}`,
                value: '```' + args.join(' ') + '```'
            },
            {
                name: `Translated Text: :flag_gb:`,
                value: '```' + tr[0] + '```'
            }
        ]
    }));
}

module.exports.help = {
    name: ["tr", "translate"],
    type: "misc",
    help_text: "tr <text>",
    help_desc: "Translates text",
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {force: true},
    roles: [],
    user_perms: [],
    bot_perms: []
}