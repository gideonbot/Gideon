import Discord from "discord.js";
import Util from "../../Util.js";

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(gideon, message, args) {
    message.channel.send(Util.CreateEmbed('The fastest bot alive!', {description: `WebSocket ping: ${gideon.ws.ping.toFixed(2)} ms`}, message.member));  
}

export const help = {
    name: ["ping", "latency"],
    type: "stats",
    help_text: "ping",
    help_desc: "Displays the bot's ping",
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
}