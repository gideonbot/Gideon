const Discord = module.require("discord.js");


module.exports.run = async (gideon, message, args) => {
    const fsurl = 'https://discordapp.com/channels/595318490240385037/595935089070833708';

    const crossovers = new Discord.RichEmbed()
	    .setColor('#2791D3')
	    .setTitle('__Below you\'ll find a list of all Arrowverse crossover episodes in ther respective watching order:__')
        .addField('Flash vs. Arrow', 'The Flash 1x08 - Flash vs. Arrow\nArrow 3x08 - The Brave and the Bold')  
        .addField('Heroes Join Forces', 'The Flash 2x08 - Legends of Today\nArrow 4x08 - Legends of Yesterday')  
        .addField('Worlds Finest', 'The Flash 2x18 - Versus Zoom\nSupergirl 1x18 - Worlds Finest')  
        .addField('Invasion!', 'Supergirl 2x08 - Medusa\nThe Flash 3x08 Invasion!\nArrow 5x08 - Invasion!\nDC\'s Legends of Tomorrow - Invasion!')  
        .addField('Musical Crossover', 'Supergirl 2x16 - Star-Crossed\nThe Flash 3x17 - Duet')  
        .addField('Crisis on Earth-X', 'Supergirl 3x08 - Crisis on Earth-X, Part 1Arrow 6x08 - Crisis on Earth-X, Part 2The Flash 4x08 - Crisis on Earth-X, Part 3      DC's Legends of Tomorrow 3x08 - Crisis on Earth-X, Part 4')  
        .addField('!cuddle <user>', 'Gives the selected user a Beebo-tastic cuddle')
        .addField('!at <attack> <user>', 'Attacks the selected user with the selected attack\n(replace <attack> with: iceblast | lthrow | reverseflash | vibeblast | shootarrow | heatvision)')
        .addField('Gideon, show me the future!', 'Displays an easter egg')
        .addField('Gideon, plot a course!', 'Displays an easter egg')
        .addField('!github', 'Displays Github repository info')
        .addField('!donate', 'Displays info to support maintainance and hosting of Gideon')       
        .addField('Feature Suggestions:', `**[Click here to suggest a feature](${fsurl} 'Time Vault - #feature-suggestions')**`)
        .setTimestamp()
    	.setFooter('Gideon - The Arrowverse Bot | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

        message.channel.send(crossovers);
}

module.exports.help = {
    name: "crossovers"
}