const Discord = module.require("discord.js");
const Util = require("../Util");

module.exports.run = async (gideon, message, args) => {
    let agm = args.join("").toLowerCase();
    if (agm.match(/(?:me)/i) && agm.match(/(?:the)/i) && agm.match(/(?:future)/i)) {
        const future = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('The Central City Citizen\nFLASH MISSING VANISHES IN CRISIS')
        .setDescription(`BY IRIS WEST-ALLEN\nTHURSDAY, APRIL 25, 2024\n\nAfter an extreme street battle with the Reverse-Flash, our city's very own Scarlet Speedster disappeared in an explosion of light. The cause of the fight is currently unknown. According to witnesses, The Flash, The Atom, and Hawkgirl, began fighting the Reverse-Flash around midnight last night. The sky took on a deep crimson color as the ensuing battle created the most destruction this city has ever seen since The Flash first arrived in Central City.`)
        .setImage('https://i.imgur.com/cS3fZZv.jpg')
        .setTimestamp()
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        message.channel.send('Yes Dr. Wells!', {embed: future});
    }   
}

module.exports.help = {
    name: "show",
    type: "fun",
    help_text: "Gideon, show me the future!",
    help_desc: "Displays an easter egg"
}