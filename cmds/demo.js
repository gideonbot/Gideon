const Discord = module.require("discord.js");

module.exports.run = async (gideon, message, args) => {
    const avih = gideon.guilds.get('474179239068041237');
    const durl ='https://serebii.net/index2.shtml';
    const surl ='https://discord.gg/TCwMM3G';

    const github = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('Arrowverse: Infinite Heroes - Demo Version')
    .setDescription('Click the link below to download the Arrowverse: Infinite Heroes demo version!')
    .setThumbnail(avih.iconURL())
    .addField('AVIH Demo:', `**[Download](${durl} '${durl}')**`)
    .addField('AVIH Server:', `**[Join](${surl} '${surl}')**`)
    .setTimestamp()
    .setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', gideon.user.avatarURL())

    message.channel.send(github);       
}

module.exports.help = {
    name: "demo"
}