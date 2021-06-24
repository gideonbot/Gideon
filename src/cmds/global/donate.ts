import { CommandInteraction, GuildMember } from 'discord.js';
import { Command } from 'src/@types/Util.js';
import Util from '../../Util.js';

export async function run(interaction: CommandInteraction): Promise<void> {
    return interaction.reply({embeds: [(Util.Embed('Donations', {
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
    }, interaction.member as GuildMember))]});
}

export const info: Command['info'] = {
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};

export const data: Command['data'] = {
    name: 'donate',
    description: 'Displays info to support maintainance and hosting of Gideon',
    defaultPermission: true
};