const Discord = module.require("discord.js");
const Util = require("../Util");

module.exports.run = async (gideon, message, args) => {

    const credits = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('Development Credits:')
    .addField('adrifcastr', 'Development & maintenance')
    .addField('MBR#0001', 'Development, support & testing')
    .addField('Klaus#5857', 'Server hosting')
    .addField('AceFire6', 'Development & hosting of [arrowverse.info](https://arrowverse.info) and its [API](https://arrowverse.info/api)')
    .addField('7coil', 'PR [#24](https://github.com/adrifcastr/Gideon/pull/24) and [#25](https://github.com/adrifcastr/Gideon/pull/25)')
    .setThumbnail(gideon.user.avatarURL())
    .setFooter(Util.config.footer, gideon.user.avatarURL());

    message.channel.send(credits);
}

module.exports.help = {
    name: ["credits", "creds"],
    type: "misc",
    help_text: "credits",
    help_desc: "Displays people who contributed to development of this bot"
}