const Discord = module.require("discord.js");


module.exports.run = async (gideon, message, args) => {
    if(!message.member.hasPermission('ADMINISTRATOR') || !message.member.roles.has('602311948809273344')){
        return message.channel.send('You don\'t have the required permissions to use this command!')
    }   else{

    let flash = message.guild.roles.get('596074712682070061');
    let arrow = message.guild.roles.get('596075000151277568');
    let batwoman = message.guild.roles.get('596075415898947584');
    let constantine = message.guild.roles.get('596075638285139988');
    let legends = message.guild.roles.get('596075305861513246');
    let supergirl = message.guild.roles.get('596075165780017172');

    flash.edit({ mentionable: false })
    .then(r => console.log(r.mentionable))
    .catch(console.error);

    arrow.edit({ mentionable: false })
    .then(r => console.log(r.mentionable))
    .catch(console.error);

    batwoman.edit({ mentionable: false })
    .then(r => console.log(r.mentionable))
    .catch(console.error);

    constantine.edit({ mentionable: false })
    .then(r => console.log(r.mentionable))
    .catch(console.error);

    legends.edit({ mentionable: false })
    .then(r => console.log(r.mentionable))
    .catch(console.error);

    supergirl.edit({ mentionable: false })
    .then(r => console.log(r.mentionable))
    .catch(console.error);

    message.channel.send('The DCTV roles are now no longer mentionable!:white_check_mark: ');

    }
}

module.exports.help = {
    name: "ddm"
}