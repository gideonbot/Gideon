import Discord from 'discord.js';
/**
 * @param {Discord.Message} message
 */
export async function run(message) {
    const tag = '**"Official sources" refers to any social media in association with the Arrowverse franchise or The CW Televison Network.**';
    message.channel.send(tag);
}

export const help = {
    name: ['sources', 'official sources'],
    type: 'tags',
    help_text: 'sources',
    help_desc: 'Sources Tag',
    owner: false,
    voice: false,
    timevault: true,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};