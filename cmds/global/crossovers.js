import Util from '../../Util.js';

/**
* @param {Discord.Interaction} interaction
 */
export async function run(interaction) {
    const embed = Util.Embed('__All Arrowverse crossover episodes in their respective watching order:__', null, interaction.member)
        .addField('Flash vs. Arrow', 'The Flash 1x08 - Flash vs. Arrow\nArrow 3x08 - The Brave and the Bold')  
        .addField('Heroes Join Forces', 'The Flash 2x08 - Legends of Today\nArrow 4x08 - Legends of Yesterday')  
        .addField('Worlds Finest', 'The Flash 2x18 - Versus Zoom\nSupergirl 1x18 - Worlds Finest')  
        .addField('Invasion!', 'Supergirl 2x08 - Medusa\nThe Flash 3x08 Invasion!\nArrow 5x08 - Invasion!\nDC\'s Legends of Tomorrow 2x07 - Invasion!')
        .addField('Musical Crossover', 'Supergirl 2x16 - Star-Crossed\nThe Flash 3x17 - Duet')  
        .addField('Crisis on Earth-X', 'Supergirl 3x08 - Crisis on Earth-X, Part 1\nArrow 6x08 - Crisis on Earth-X, Part 2\nThe Flash 4x08 - Crisis on Earth-X, Part 3\nDC\'s Legends of Tomorrow 3x08 - Crisis on Earth-X, Part 4')  
        .addField('Elseworlds', 'The Flash 5x09 - Elseworlds, Part 1\nArrow 7x09 - Elseworlds, Part 2\nSupergirl 4x09 - Elseworlds, Part 3')
        .addField('Crisis On Infinite Earths', 'Supergirl 5x09 - Crisis on Infinite Earths: Hour One\nBatwoman 1x09 - Crisis on Infinite Earths: Hour Two\nThe Flash 6x09 - Crisis on Infinite Earths: Hour Three\nArrow 8x09 - Crisis on Infinite Earths: Hour Four\nDC\'s Legends of Tomorrow 5x00 - Crisis on Infinite Earths: Hour Five');

    interaction.reply(embed);
}

export let help = {
    id: '786983909890981908',
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: ['MANAGE_MESSAGES', 'ADD_REACTIONS']
};