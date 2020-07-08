
/**
 * @param {Discord.Message} message
 */
export async function run(message) {
    message.channel.send('https://discord.new/EDWFjQqYu8Zs');
}

export const help = {
    name: 'template',
    type: 'general',
    help_text: 'template',
    help_desc: 'Sends a Time Vault template',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};