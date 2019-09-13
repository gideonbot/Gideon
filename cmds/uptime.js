const Discord = module.require("discord.js");

module.exports.run = async (gideon, message, args) => {
    let totalSeconds = (gideon.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${Math.ceil(seconds)} seconds`;

    const uptime_embed = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('Enter Flashtime!')
    .setDescription(uptime)
    .setTimestamp()
    .setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', gideon.user.avatarURL());

    message.channel.send(uptime_embed);
}

module.exports.help = {
    name: "uptime"
}