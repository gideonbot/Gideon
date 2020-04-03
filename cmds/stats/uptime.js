import Discord from "discord.js";
import Util from "../../Util.js";

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(gideon, message, args) {
    message.channel.send(Util.CreateEmbed('Enter Flashtime!', {description: Util.secondsToDifferenceString(gideon.uptime / 1000, { enableSeconds: true })}));
}

export const help = {
    name: "uptime",
    type: "stats",
    help_text: "uptime",
    help_desc: "Displays the bot's uptime",
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
}