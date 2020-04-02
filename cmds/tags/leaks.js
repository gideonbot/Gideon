import Discord from "discord.js";
import Util from "../../Util.js";
/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(gideon, message, args) {
    const tag = '**Leaks of any kind must be marked as spoiler aswell, and also be clearly declared as leaks at the beginning of the message.**\n**"Leak" refers to any information regarding the plot or any other type of content of any upcoming Arrowverse episode.**\n**Theories do count as leaks aswell and therefore mustn\'t be posted without the above mentioned steps of clarification.**';
    message.channel.send(tag);
}

export const help = {
    name: ["leaks", "leak"],
    type: "tags",
    help_text: "leaks",
    help_desc: "Leaks Tag",
    owner: false,
    voice: false,
    timevault: true,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
}