const Discord = module.require("discord.js");

module.exports.run = async (gideon, message, args) => {

    const github = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('Gideon - Selfhosting Documentation')
    .setDescription('Click the link below to read the GitHub documentation on how to selfhost me!')
    .setThumbnail(gideon.user.avatarURL())
    .addField('GitHub Wiki:', `**[Read Docs](https://github.com/adrifcastr/Gideon/wiki 'https://github.com/adrifcastr/Gideon/wiki')**`)
    .setTimestamp()
    .setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', gideon.user.avatarURL());

    message.channel.send(github);       
}

module.exports.help = {
    name: "docs"
}