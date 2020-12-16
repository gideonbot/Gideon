/**
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(message) {     
    const url = 'https://cdn.discordapp.com/attachments/679864620864765983/711545574662340659/chat.gif';
    message.reply('This command is deprecated. Please ask somone with the appropriate permissions to use the `chatchnl` command to set an AI chat channel!\n' + url);
}

export let help = {
    name: 'chat',
    type: 'fun',
    help_text: 'chat',
    help_desc: 'Chat with an AI',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};