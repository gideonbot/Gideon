const Discord = module.require("discord.js");

module.exports.run = async (gideon, message, args) => {
    if(message.guild.id !== '595318490240385037') return message.channel.send('This command only works at the Time Vault!\nhttps://discord.gg/h9SEQaU');
    if(!message.member.roles.has('602311948809273344')){
        return message.channel.send('You don\'t have the required permissions to use this command!')
    }   else{

    let flash = message.guild.roles.get('596074712682070061');
    let arrow = message.guild.roles.get('596075000151277568');
    let batwoman = message.guild.roles.get('596075415898947584');
    let constantine = message.guild.roles.get('596075638285139988');
    let legends = message.guild.roles.get('596075305861513246');
    let supergirl = message.guild.roles.get('596075165780017172');
    let blacklightning = message.guild.roles.get('607633853527359488');

    flash.edit({ mentionable: false })
    .catch(console.error);

    arrow.edit({ mentionable: false })
    .catch(console.error);

    batwoman.edit({ mentionable: false })
    .catch(console.error);

    constantine.edit({ mentionable: false })
    .catch(console.error);

    legends.edit({ mentionable: false })
    .catch(console.error);

    supergirl.edit({ mentionable: false })
    .catch(console.error);

    blacklightning.edit({ mentionable: true })
    .catch(console.error);

    message.channel.send('The DCTV roles are now no longer mentionable!:white_check_mark: ');
    }
}

module.exports.help = {
    name: "ddm"
}