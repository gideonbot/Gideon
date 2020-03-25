const Discord = require("discord.js");
const Pagination = require('discord-paginationembed');
const gideonapi = require('gideon-api');
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

    const abilities = await gideonapi.abilities();

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
        .addField(abilities.speedsters.title1, abilities.speedsters.ability1, true)  
        .addField(abilities.speedsters.title2, abilities.speedsters.ability2, true)  
        .addField(abilities.speedsters.title3, abilities.speedsters.ability3, true)  
        .addField(abilities.speedsters.title4, abilities.speedsters.ability4, true)  
        .addField(abilities.speedsters.title5, abilities.speedsters.ability5, true) 
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        const sp2 = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('__Speedsters possess the following abilities:__')
        .addField(abilities.speedsters.title6, abilities.speedsters.ability6, true)
        .addField(abilities.speedsters.title7, abilities.speedsters.ability7, true)
        .addField(abilities.speedsters.title8, abilities.speedsters.ability8, true)
        .addField(abilities.speedsters.title9, abilities.speedsters.ability9, true)
        .addField(abilities.speedsters.title10, abilities.speedsters.ability10, true)   
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        const sp3 = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('__Speedsters possess the following abilities:__')
        .addField(abilities.speedsters.title11, abilities.speedsters.ability11, true)  
        .addField(abilities.speedsters.title12, abilities.speedsters.ability12, true)  
        .addField(abilities.speedsters.title13, abilities.speedsters.ability13, true)  
        .addField(abilities.speedsters.title14, abilities.speedsters.ability14, true)
        .addField(abilities.speedsters.title15, abilities.speedsters.ability15, true)
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        const sp4 = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('__Speedsters possess the following abilities:__')
        .addField(abilities.speedsters.title16, abilities.speedsters.ability16, true)
        .addField(abilities.speedsters.title17, abilities.speedsters.ability17, true)
        .addField(abilities.speedsters.title18, abilities.speedsters.ability18, true)
        .addField(abilities.speedsters.title19, abilities.speedsters.ability19, true)
        .addField(abilities.speedsters.title20, abilities.speedsters.ability20, true)
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        const sp5 = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('__Speedsters possess the following abilities:__')
        .addField(abilities.speedsters.title21, abilities.speedsters.ability21, true)
        .addField(abilities.speedsters.title22, abilities.speedsters.ability22, true)
        .addField(abilities.speedsters.title23, abilities.speedsters.ability23, true)
        .addField(abilities.speedsters.title24, abilities.speedsters.ability24, true)
        .addField(abilities.speedsters.title25, abilities.speedsters.ability25, true)
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        const sp6 = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('__Speedsters possess the following abilities:__')
        .addField(abilities.speedsters.title26, abilities.speedsters.ability26, true)
        .addField(abilities.speedsters.title27, abilities.speedsters.ability27, true)
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
        .addField(abilities.vibers.title1, abilities.vibers.ability1, true)  
        .addField(abilities.vibers.title2, abilities.vibers.ability2, true)  
        .addField(abilities.vibers.title3, abilities.vibers.ability3, true)  
        .addField(abilities.vibers.title4, abilities.vibers.ability4, true)
        .addField(abilities.vibers.title5, abilities.vibers.ability5, true)
        .addField(abilities.vibers.title6, abilities.vibers.ability6, true)
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        message.channel.send(viber);
    } else if (args[0].match(/(?:kryptonian)/i)) {
        const kr1 = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('__Kryptonians possess the following abilities:\n(Only when exposed to a yellow sun\'s energy)__')
        .addField(abilities.kryptonians.title1, abilities.kryptonians.ability1, true)  
        .addField(abilities.kryptonians.title2, abilities.kryptonians.ability2, true)  
        .addField(abilities.kryptonians.title3, abilities.kryptonians.ability3, true)  
        .addField(abilities.kryptonians.title4, abilities.kryptonians.ability4, true)  
        .addField(abilities.kryptonians.title5, abilities.kryptonians.ability5, true)              
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        const kr2 = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('__Kryptonians possess the following abilities:\n(Only when exposed to a yellow sun\'s energy)__')
        .addField(abilities.kryptonians.title6, abilities.kryptonians.ability6, true)
        .addField(abilities.kryptonians.title7, abilities.kryptonians.ability7, true)
        .addField(abilities.kryptonians.title8, abilities.kryptonians.ability8, true)
        .addField(abilities.kryptonians.title9, abilities.kryptonians.ability9, true)
        .addField(abilities.kryptonians.title10, abilities.kryptonians.ability10, true)            
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        const kr3 = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('__Kryptonians possess the following abilities:\n(Only when exposed to a yellow sun\'s energy)__')
        .addField(abilities.kryptonians.title11, abilities.kryptonians.ability11, true)  
        .addField(abilities.kryptonians.title12, abilities.kryptonians.ability12, true)  
        .addField(abilities.kryptonians.title13, abilities.kryptonians.ability13, true)  
        .addField(abilities.kryptonians.title14, abilities.kryptonians.ability14, true)
        .addField(abilities.kryptonians.title15, abilities.kryptonians.ability15, true)         
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        const kr4 = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('__Kryptonians possess the following abilities:\n(Only when exposed to a yellow sun\'s energy)__')
        .addField(abilities.kryptonians.title16, abilities.kryptonians.ability16, true)
        .addField(abilities.kryptonians.title17, abilities.kryptonians.ability17, true)
        .addField(abilities.kryptonians.title18, abilities.kryptonians.ability18, true)
        .addField(abilities.kryptonians.title19, abilities.kryptonians.ability19, true)
        .addField(abilities.kryptonians.title20, abilities.kryptonians.ability20, true)           
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        const kr5 = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('__Kryptonians possess the following abilities:\n(Only when exposed to a yellow sun\'s energy)__')
        .addField(abilities.kryptonians.title21, abilities.kryptonians.ability21, true)
        .addField(abilities.kryptonians.title22, abilities.kryptonians.ability22, true)
        .addField(abilities.kryptonians.title23, abilities.kryptonians.ability23, true)
        .addField(abilities.kryptonians.title24, abilities.kryptonians.ability24, true)
        .addField(abilities.kryptonians.title25, abilities.kryptonians.ability25, true)                 
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        const kr6 = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('__Kryptonians possess the following abilities:\n(Only when exposed to a yellow sun\'s energy)__')
        .addField(abilities.kryptonians.title26, abilities.kryptonians.ability26, true)
        .addField(abilities.kryptonians.title27, abilities.kryptonians.ability27, true) 
        .addField(abilities.kryptonians.title28, abilities.kryptonians.ability28, true)
        .addField(abilities.kryptonians.title29, abilities.kryptonians.ability29, true)             
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
    help_desc: "Shows abilities of a following: <speedster | viber | kryptonian>",
    owner: false,
    timevault: false,
    roles: [],
    user_perms: [],
    bot_perms: ['MANAGE_MESSAGES']
}