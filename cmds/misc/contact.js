import Discord from "discord.js";
import Util from "../../Util.js";

export async function run(gideon, message, args) {
    message.channel.send(Util.CreateEmbed('Contact:', {
        description: `Server: [Time Vault](https://discord.gg/h9SEQaU 'https://discord.gg/h9SEQaU')\nEmail: adrifcastr@gmail.com`
    }, message.member));  
}

export const help = {
    name: ["contact", "about"],
    type: "misc",
    help_text: "contact",
    help_desc: "Displays contact info",
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
}