import Discord from 'discord.js';
import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 */
export async function run(message) {
    const url = 'https://discordapp.com/api/oauth2/authorize?client_id=' + process.gideon.user.id + '&permissions=37088321&scope=bot';

    message.channel.send(Util.CreateEmbed('Gideon - Oauth2 Invite', {
        description: 'Click the link below to add me to your server!',
        thumbnail: process.gideon.user.avatarURL(),
        fields: [
            {
                name: 'Discord Oauth2:',
                value: `**[Add to server](${url} '${url}')**`
            }
        ]
    }, message.member));       
}

export const help = {
    name: ['add', 'oauth'],
    type: 'misc',
    help_text: 'add',
    help_desc: 'Displays Gideon\'s oauth2 invite link',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};