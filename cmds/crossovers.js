const Discord = module.require("discord.js");
const Pagination = require('discord-paginationembed');

module.exports.run = async (gideon, message, args) => {
    const co1 = new Discord.MessageEmbed()
	    .setColor('#2791D3')
	    .setTitle('__All Arrowverse crossover episodes in their respective watching order:__')
        .addField('Flash vs. Arrow', 'The Flash 1x08 - Flash vs. Arrow\nArrow 3x08 - The Brave and the Bold')  
        .addField('Heroes Join Forces', 'The Flash 2x08 - Legends of Today\nArrow 4x08 - Legends of Yesterday')  
        .addField('Worlds Finest', 'The Flash 2x18 - Versus Zoom\nSupergirl 1x18 - Worlds Finest')  
        .addField('Invasion!', 'Supergirl 2x08 - Medusa\nThe Flash 3x08 Invasion!\nArrow 5x08 - Invasion!\nDC\'s Legends of Tomorrow 2x07 - Invasion!')  
        .setTimestamp()
        .setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png')
        
    const co2 = new Discord.MessageEmbed()
	    .setColor('#2791D3')
	    .setTitle('__All Arrowverse crossover episodes in their respective watching order:__')
        .addField('Musical Crossover', 'Supergirl 2x16 - Star-Crossed\nThe Flash 3x17 - Duet')  
        .addField('Crisis on Earth-X', 'Supergirl 3x08 - Crisis on Earth-X, Part 1\nArrow 6x08 - Crisis on Earth-X, Part 2\nThe Flash 4x08 - Crisis on Earth-X, Part 3\nDC\'s Legends of Tomorrow 3x08 - Crisis on Earth-X, Part 4')  
        .addField('Elseworlds', 'The Flash 5x09 - Elseworlds, Part 1\nArrow 7x09 - Elseworlds, Part 2\nSupergirl 4x09 - Elseworlds, Part 3')
        .addField('Crisis On Infinite Earths', 'The Flash 6x09 - Crisis on Infinite Earths\nArrow 8x09 - Crisis on Infinite Earths\nDC\'s Legends of Tomorrow 5x09 - Crisis on Infinite Earths\nSupergirl 5x09 - Crisis on Infinite Earths\nBatwoman 1x09 - Crisis on Infinite Earths')
        .setTimestamp()
    	.setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png')

        const embeds = [co1, co2];
        
        new Pagination.Embeds()
        .setArray(embeds)
        .setAuthorizedUsers([message.author.id])
        .setChannel(message.channel)
        .setPageIndicator(true)
        .setPage(1)
        .build();
}

module.exports.help = {
    name: "crossovers"
}