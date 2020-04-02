import Discord from "discord.js";

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(gideon, message, args) {      
    message.channel.send('https://gideonbot.co.vu');
}

export const help = {
    name: ['website', 'web', 'url', 'homepage'],
    type: "misc",
    help_text: "website",
    help_desc: "Displays a link to Gideon's homepage",
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
}