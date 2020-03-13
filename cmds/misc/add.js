const Discord = require("discord.js");
const Util = require("../../Util");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message) => {
    const url = 'https://discordapp.com/api/oauth2/authorize?client_id=' + gideon.user.id + '&permissions=37088321&scope=bot';

    message.channel.send(Util.CreateEmbed('Gideon - Oauth2 Invite', {
        description: 'Click the link below to add me to your server!',
        thumbnail: gideon.user.avatarURL(),
        fields: [
            {
                name: 'Discord Oauth2:',
                value: `**[Add to server](${url} '${url}')**`
            }
        ]
    }));       
}

module.exports.help = {
    name: ["add", "oauth"],
    type: "misc",
    help_text: "add",
    help_desc: "Displays Gideon's oauth2 invite link"
}