const Discord = require("discord.js");
const Pagination = require('discord-paginationembed');
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
        .addField('', '', true)  
        .addField('', '', true)  
        .addField('', '', true)  
        .addField('', '', true)  
        .addField('', '', true) 
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        const sp2 = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('__Speedsters possess the following abilities:__')
        .addField('', '', true)
        .addField('', '', true)
        .addField('', '', true)
        .addField('', '', true)
        .addField('', '', true)   
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        const sp3 = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('__Speedsters possess the following abilities:__')
        .addField('', '', true)  
        .addField('', '', true)  
        .addField('', '')  
        .addField('', '', true)
        .addField('', '', true)
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        const sp4 = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('__Speedsters possess the following abilities:__')
        .addField('', '', true)
        .addField('', '', true)
        .addField('', '', true)
        .addField('', '', true)
        .addField('', '', true)
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        const sp5 = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('__Speedsters possess the following abilities:__')
        .addField('', '', true)
        .addField('', '', true)
        .addField('', '', true)
        .addField('', '', true)
        .addField('', '')
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        const sp6 = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('__Speedsters possess the following abilities:__')
        .addField('', '', true)
        .addField('', '', true)
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
        .addField('', '', true)  
        .addField('', '', true)  
        .addField('', '', true)  
        .addField('', '', true)
        .addField('', '', true)
        .addField('', '', true)
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        message.channel.send(viber);
    } else if (args[0].match(/(?:kryptonian)/i)) {
        const kr1 = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('__Kryptonians possess the following abilities:\n(Only when exposed to a yellow sun\'s energy)__')
        .addField('', '', true)  
        .addField('', '', true)  
        .addField('', '', true)        
        .addField('', '', true)        
        .addField('', '', true)               
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        const kr2 = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('__Kryptonians possess the following abilities:\n(Only when exposed to a yellow sun\'s energy)__')
        .addField('', '', true)  
        .addField('', '', true)  
        .addField('', '', true)        
        .addField('', '', true)        
        .addField('', '', true)               
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        const kr3 = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('__Kryptonians possess the following abilities:\n(Only when exposed to a yellow sun\'s energy)__')
        .addField('', '', true)  
        .addField('', '', true)  
        .addField('', '', true)        
        .addField('', '', true)        
        .addField('', '', true)               
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        const kr4 = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('__Kryptonians possess the following abilities:\n(Only when exposed to a yellow sun\'s energy)__')
        .addField('', '', true)  
        .addField('', '', true)  
        .addField('', '', true)        
        .addField('', '', true)        
        .addField('', '', true)               
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        const kr5 = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('__Kryptonians possess the following abilities:\n(Only when exposed to a yellow sun\'s energy)__')
        .addField('', '', true)  
        .addField('', '.', true)  
        .addField('', '', true)        
        .addField('', '', true)        
        .addField('', '', true)                     
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        const kr6 = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('__Kryptonians possess the following abilities:\n(Only when exposed to a yellow sun\'s energy)__')
        .addField('', '', true)  
        .addField('', '', true)  
        .addField('', '', true)  
        .addField('', '', true)                  
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