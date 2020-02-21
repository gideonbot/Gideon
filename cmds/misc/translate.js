const Discord = require("discord.js");
const Util = require("../../Util");
const fetch = require('node-fetch');

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message, args) => {
    if (!args[0]) return message.reply('you must provide input to translate something!');

    const sourceLang = 'auto';
    const targetLang = 'en';
    const sourceText = args.join(' ');

    const api = "https://translate.googleapis.com/translate_a/single?client=gtx&sl="
    + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(sourceText);

    const body = await fetch(api).then(res => res.json());
    let sourceflag = `:flag_${body[2]}:`;
    if (body[2] == targetLang) sourceflag = ':flag_gb:';

    message.channel.send(Util.CreateEmbed(null, {
        author: {
            name: `Translation for ${message.author.tag}:`,
            icon: message.author.avatarURL()
        },
        fields: [
            {
                name: `Original Text: ${sourceflag}`,
                value: '```' + sourceText + '```'
            },
            {
                name: `Translated Text: :flag_gb:`,
                value: '```' + body[0][0][0] + '```'
            }
        ]
    }));
}

module.exports.help = {
    name: ["tr", "translate"],
    type: "misc",
    help_text: "!tr",
    help_desc: "Translates text"
}