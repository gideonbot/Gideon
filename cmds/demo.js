const Discord = module.require("discord.js");

module.exports.run = async (gideon, message, args) => {

    const github = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('Arrowverse: Infinite Heroes - Demo Version')
    .setDescription('Click the link below to download the Arrowverse: Infinite Heroes demo version!')
    .setThumbnail('https://cdn.discordapp.com/icons/474179239068041237/guild_icon.png')
    .addField('AVIH Demo:', `**[Download]('https://serebii.net/index2.shtml' 'https://serebii.net/index2.shtml')**`)
    .setTimestamp()
    .setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png')

    message.channel.send(github);       
}

module.exports.help = {
    name: "demo"
}