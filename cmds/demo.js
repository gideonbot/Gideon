const Discord = module.require("discord.js");

module.exports.run = async (gideon, message, args) => {
    const avih = gideon.guilds.get('474179239068041237');
    const wdurl ='https://mega.nz/#!PCJ3hSTI!HrEFBfvjmi2DoOvNcU0PgTUbsHc9NkQMf9h5aF8iJjA';
    const wturl = 'https://cdn.discordapp.com/attachments/599917281379876893/614969846249160880/AVIH_Demo_Version.7z.torrent';
    const ldurl = 'https://mega.nz/#!LKhBBSYb!20i46WHIbKrLt3eTs_QTGl6mvW80Hcu1q0CXCXJcCUM';
    const lturl = 'https://cdn.discordapp.com/attachments/525341082435715085/615155299036430337/AVIH_Demo_Version_LNX.7z.torrent';
    const adurl = '';
    const aturl = '';
    const surl = 'https://discord.gg/TCwMM3G';

    const github = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('Arrowverse: Infinite Heroes - Demo Version')
    .setDescription('Click one of the links below to download the Arrowverse: Infinite Heroes demo version!')
    .setThumbnail(avih.iconURL())
    .addField('Windows x64:', `**[[Direct Download](${wdurl} '${wdurl}')] [[Torrent Download](${wturl} '${wturl}')]**`)
    .addField('Linux x64:', `**[[Direct Download](${ldurl} '${ldurl}')] [[Torrent Download](${lturl} '${lturl}')]**`)
    .addField('Android ARM:', `**as soon as I ported it. -A**`)
    .addField('AVIH Discord:', `**[Join Server](${surl} '${surl}')**`)
    .setTimestamp()
    .setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', gideon.user.avatarURL())

    message.channel.send(github);       
}

module.exports.help = {
    name: "demo"
}