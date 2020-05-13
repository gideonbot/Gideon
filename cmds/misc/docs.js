import Discord from 'discord.js';
import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 */
export async function run(message) {
    message.channel.send(Util.CreateEmbed('Gideon - Selfhosting Documentation', {
        description: 'Click the link below to read the GitHub documentation on how to selfhost me!',
        thumbnail: process.gideon.user.avatarURL(),
        fields: [
            {
                name: 'GitHub Wiki:',
                value: '**[Read Docs](https://github.com/adrifcastr/Gideon/wiki \'https://github.com/adrifcastr/Gideon/wiki\')**'
            }
        ]
    }, message.member));
}

export const help = {
    name: ['docs', 'hosting'],
    type: 'misc',
    help_text: 'docs',
    help_desc: 'Displays Gideon\'s Github Wiki link',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};