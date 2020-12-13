import Util from '../../Util.js';

/**
* @param {Discord.Interaction} interaction
*/
export async function run(interaction) {
    return interaction.reply(Util.Embed('Donations', {
        description: 'Donations are gladly accepted. \nPlease send them to one of the options below. \nDonating supports the development, maintenance and hosting of this project. \nThank you!',
        thumbnail: 'https://i.imgur.com/f3fvsRe.png',
        fields: [
            {
                name: 'PayPal',
                value: '[Paypal.me](https://www.paypal.me/adrifcastr \'https://www.paypal.me/adrifcastr\')'
            },
            {
                name: 'Patreon',
                value: '[Patreon.com](https://www.patreon.com/gideonbot \'https://www.patreon.com/gideonbot\')'
            }
        ]
    }, interaction.member));
}

export const help = {
    id: '787027564052217866',
    owner: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};