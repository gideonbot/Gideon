/**
 * @param {Discord.Message} message
 */
export async function run(message) {      
    return message.channel.send('https://gideonbot.com');
}

export let help = {
    name: 'web',
    type: 'misc',
    help_text: 'website',
    help_desc: 'Displays a link to Gideon\'s homepage',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};