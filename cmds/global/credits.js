import Util from '../../Util.js';

/**
* @param {Discord.Interaction} interaction
*/
export async function run(interaction) {

    const fields = [
        {name: 'adrifcastr', value: 'Development, maintenance & domain'},
        {name: 'MBR#0001', value: 'Development, support, & hosting'},
        {name: 'Klaus#5857', value: 'Website development'},
        {name: 'Stevenson Johnson', value: 'Artwork'},
        {name: 'AceFire6', value: 'Development & hosting of [arrowverse.info](https://arrowverse.info) and its [API](https://arrowverse.info/api)'},
        {name: '7coil', value: 'PR [#24](https://github.com/adrifcastr/Gideon/pull/24) and [#25](https://github.com/adrifcastr/Gideon/pull/25)'}
    ];

    return interaction.reply(Util.Embed('Development Credits:', {fields: fields, thumbnail: process.gideon.user.avatarURL()}, interaction.member));
}

export const help = {
    id: '787023206779322468',
    owner: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};