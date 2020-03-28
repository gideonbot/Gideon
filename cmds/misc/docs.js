const Discord = require("discord.js");
const Util = require("../../Util");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message) => {
    message.channel.send(Util.CreateEmbed('Gideon - Selfhosting Documentation', {
        description: 'Click the link below to read the GitHub documentation on how to selfhost me!',
        thumbnail: gideon.user.avatarURL(),
        fields: [
            {
                name: 'GitHub Wiki:',
                value: `**[Read Docs](https://github.com/adrifcastr/Gideon/wiki 'https://github.com/adrifcastr/Gideon/wiki')**`
            }
        ]
    }));
}

module.exports.help = {
    name: ["docs", "hosting"],
    type: "misc",
    help_text: "docs",
    help_desc: "Displays Gideon's Github Wiki link",
    owner: false,
    voice: false,
    timevault: false,
    roles: [],
    user_perms: [],
    bot_perms: []
}