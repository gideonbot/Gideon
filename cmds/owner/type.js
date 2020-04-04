import Discord from "discord.js";

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(gideon, message, args) {
    if (gideon.user.typingIn(message.channel)) message.channel.stopTyping(true);
    else message.channel.startTyping();
}

export const help = {
    name: ["type", "typing"],
    type: "owner",
    help_text: "type",
    help_desc: "Toggles typing",
    owner: true,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
}