import Discord from 'discord.js';

/**
 * @param {Discord.Message} message
 */
export async function run(message) {
    if (process.gideon.user.typingIn(message.channel)) message.channel.stopTyping(true);
    else message.channel.startTyping();
}

export const help = {
    name: ['type', 'typing'],
    type: 'owner',
    help_text: 'type',
    help_desc: 'Toggles typing',
    owner: true,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};