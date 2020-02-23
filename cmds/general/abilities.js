const Discord = require("discord.js");
const Pagination = require('discord-paginationembed');
const fetch = require('node-fetch');
const Util = require("../../Util");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message, args) => {
    const ia = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle(`${args[0]} is not a valid argument!`)
    .setFooter(Util.config.footer, gideon.user.avatarURL());

    const api = 'https://gideonbot.co.vu/api/abilities';
    const body = await fetch(api).then(res => res.json());

    if (!args[0]) {
        const cmdinfo = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('__You can check the list of available commands below:__')
        .addField('!abilities speedster', 'Displays Speedster abilities')  
        .addField('!abilities viber', 'Displays Viber abilities')  
        .addField('!abilities kryptonian', 'Displays Kryptonian abilities')  
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        message.channel.send(cmdinfo);
    } else if (args[0].match(/(?:speedster)/i)) {
        const sp1 = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('__Speedsters possess the following abilities:__')
        .addField(body.speedsters.title1, body.speedsters.ability1, true)  
        .addField(body.speedsters.title2, body.speedsters.ability2, true)  
        .addField(body.speedsters.title3, body.speedsters.ability3, true)  
        .addField(body.speedsters.title4, body.speedsters.ability4, true)  
        .addField(body.speedsters.title5, body.speedsters.ability5, true) 
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        const sp2 = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('__Speedsters possess the following abilities:__')
        .addField(body.speedsters.title6, body.speedsters.ability6, true)
        .addField(body.speedsters.title7, body.speedsters.ability7, true)
        .addField(body.speedsters.title8, body.speedsters.ability8, true)
        .addField(body.speedsters.title9, body.speedsters.ability9, true)
        .addField(body.speedsters.title10, body.speedsters.ability10, true)   
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        const sp3 = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('__Speedsters possess the following abilities:__')
        .addField(body.speedsters.title11, body.speedsters.ability11, true)  
        .addField(body.speedsters.title12, body.speedsters.ability12, true)  
        .addField(body.speedsters.title13, body.speedsters.ability13, true)  
        .addField(body.speedsters.title14, body.speedsters.ability14, true)
        .addField(body.speedsters.title15, body.speedsters.ability15, true)
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        const sp4 = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('__Speedsters possess the following abilities:__')
        .addField(body.speedsters.title16, body.speedsters.ability16, true)
        .addField(body.speedsters.title17, body.speedsters.ability17, true)
        .addField(body.speedsters.title18, body.speedsters.ability18, true)
        .addField(body.speedsters.title19, body.speedsters.ability19, true)
        .addField(body.speedsters.title20, body.speedsters.ability20, true)
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        const sp5 = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('__Speedsters possess the following abilities:__')
        .addField(body.speedsters.title21, body.speedsters.ability21, true)
        .addField(body.speedsters.title22, body.speedsters.ability22, true)
        .addField(body.speedsters.title23, body.speedsters.ability23, true)
        .addField(body.speedsters.title24, body.speedsters.ability24, true)
        .addField(body.speedsters.title25, body.speedsters.ability25, true)
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        const sp6 = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('__Speedsters possess the following abilities:__')
        .addField(body.speedsters.title26, body.speedsters.ability26, true)
        .addField(body.speedsters.title27, body.speedsters.ability27, true)
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        const spembeds = [sp1, sp2, sp3, sp4, sp5, sp6];
        
        new Pagination.Embeds()
        .setArray(spembeds)
        .setAuthorizedUsers([message.author.id])
        .setChannel(message.channel)
        .setPageIndicator(true)
        .setPage(1)
        .build();
    } else if (args[0].match(/(?:viber)/i)) {
        const viber = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('__Vibers possess the following abilities:__') 
        .addField(body.vibers.title1, body.vibers.ability1, true)  
        .addField(body.vibers.title2, body.vibers.ability2, true)  
        .addField(body.vibers.title3, body.vibers.ability3, true)  
        .addField(body.vibers.title4, body.vibers.ability4, true)
        .addField(body.vibers.title5, body.vibers.ability5, true)
        .addField(body.vibers.title6, body.vibers.ability6, true)
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        message.channel.send(viber);
    } else if (args[0].match(/(?:kryptonian)/i)) {
        const kr1 = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('__Kryptonians possess the following abilities:\n(Only when exposed to a yellow sun\'s energy)__')
        .addField(body.kryptonians.title1, body.kryptonians.ability1, true)  
        .addField(body.kryptonians.title2, body.kryptonians.ability2, true)  
        .addField(body.kryptonians.title3, body.kryptonians.ability3, true)  
        .addField(body.kryptonians.title4, body.kryptonians.ability4, true)  
        .addField(body.kryptonians.title5, body.kryptonians.ability5, true)              
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        const kr2 = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('__Kryptonians possess the following abilities:\n(Only when exposed to a yellow sun\'s energy)__')
        .addField(body.kryptonians.title6, body.kryptonians.ability6, true)
        .addField(body.kryptonians.title7, body.kryptonians.ability7, true)
        .addField(body.kryptonians.title8, body.kryptonians.ability8, true)
        .addField(body.kryptonians.title9, body.kryptonians.ability9, true)
        .addField(body.kryptonians.title10, body.kryptonians.ability10, true)            
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        const kr3 = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('__Kryptonians possess the following abilities:\n(Only when exposed to a yellow sun\'s energy)__')
        .addField(body.kryptonians.title11, body.kryptonians.ability11, true)  
        .addField(body.kryptonians.title12, body.kryptonians.ability12, true)  
        .addField(body.kryptonians.title13, body.kryptonians.ability13, true)  
        .addField(body.kryptonians.title14, body.kryptonians.ability14, true)
        .addField(body.kryptonians.title15, body.kryptonians.ability15, true)         
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        const kr4 = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('__Kryptonians possess the following abilities:\n(Only when exposed to a yellow sun\'s energy)__')
        .addField(body.kryptonians.title16, body.kryptonians.ability16, true)
        .addField(body.kryptonians.title17, body.kryptonians.ability17, true)
        .addField(body.kryptonians.title18, body.kryptonians.ability18, true)
        .addField(body.kryptonians.title19, body.kryptonians.ability19, true)
        .addField(body.kryptonians.title20, body.kryptonians.ability20, true)           
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        const kr5 = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('__Kryptonians possess the following abilities:\n(Only when exposed to a yellow sun\'s energy)__')
        .addField(body.kryptonians.title21, body.kryptonians.ability21, true)
        .addField(body.kryptonians.title22, body.kryptonians.ability22, true)
        .addField(body.kryptonians.title23, body.kryptonians.ability23, true)
        .addField(body.kryptonians.title24, body.kryptonians.ability24, true)
        .addField(body.kryptonians.title25, body.kryptonians.ability25, true)                 
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        const kr6 = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('__Kryptonians possess the following abilities:\n(Only when exposed to a yellow sun\'s energy)__')
        .addField(body.kryptonians.title26, body.kryptonians.ability26, true)
        .addField(body.kryptonians.title27, body.kryptonians.ability27, true) 
        .addField(body.kryptonians.title28, body.kryptonians.ability28, true)
        .addField(body.kryptonians.title29, body.kryptonians.ability29, true)             
        .setFooter(Util.config.footer, gideon.user.avatarURL());
        
        const krembeds = [kr1, kr2, kr3, kr4, kr5, kr6];
        
        new Pagination.Embeds()
        .setArray(krembeds)
        .setAuthorizedUsers([message.author.id])
        .setChannel(message.channel)
        .setPageIndicator(true)
        .setPage(1)
        .build();
    }
    else return message.channel.send(ia);
}   

module.exports.help = {
    name: ["abilities", "powers"],
    type: "general",
    help_text: "abilities <term>",
    help_desc: "Shows abilities of a following: <speedster | viber | kryptonian>"
}