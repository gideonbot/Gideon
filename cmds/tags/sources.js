import Discord from "discord.js";
import Util from "../../Util.js";
/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(gideon, message, args) {
    const tag = '**"Official sources" refers to any social media in association with the Arrowverse franchise or The CW Televison Network.**';
    message.channel.send(tag);
}

export const help = {
    name: ["sources", "official sources"],
    type: "tags",
    help_text: "sources",
    help_desc: "Sources Tag",
    owner: false,
    voice: false,
    timevault: true,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
}