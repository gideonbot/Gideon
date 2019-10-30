const Discord = module.require("discord.js");

module.exports.run = async (gideon, message, args) => {

    const credits = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('Development Credits:')
    .addField('adrifcastr', 'Development, hosting & maintenance')
    .addField('MBR#0001', 'Development, support & testing')
    .addField('AceFire6', 'Development & hosting of [arrowverse.info](https://arrowverse.info) and its [API](https://arrowverse.info/api)')
    .setThumbnail(gideon.user.avatarURL())
    .setTimestamp()
    .setFooter(Util.config.footer, gideon.user.avatarURL());

    message.channel.send(credits);
}

module.exports.help = {
    name: "credits"
}