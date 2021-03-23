import Util from '../../Util.js';
import gideonapi from 'gideon-api';

/**
* @param {Discord.Interaction} interaction
*/
export async function run(interaction) {
    const timeline = await gideonapi.timeline();
    return interaction.reply(Util.Embed('Timeline change detected!', {description: timeline, image: 'https://i.imgur.com/qWN3luc.gif'}, interaction.member));
}

export let help = {
    id: '787024666202996776',
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};
