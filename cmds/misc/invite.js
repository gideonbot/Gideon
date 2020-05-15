import Discord from 'discord.js';

/**
 * @param {Discord.Message} message
 */
export async function run(message) {     
    message.channel.send('https://discord.gg/h9SEQaU'); 
}

export const help = {
    name: 'invite',
    type: 'misc',
    help_text: 'invite',
    help_desc: 'Sends an invite link to the Time Vault',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};