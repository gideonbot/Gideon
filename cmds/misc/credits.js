import Discord from "discord.js";
import Util from "../../Util.js";

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(gideon, message, args) {

    const fields = [
        {name: 'adrifcastr', value: 'Development & maintenance'},
        {name: 'MBR#0001', value: 'Development, support & testing'},
        {name: 'Klaus#5857', value: 'Website development & server hosting'},
        {name: 'Stevenson Johnson', value: 'Artwork'},
        {name: 'AceFire6', value: 'Development & hosting of [arrowverse.info](https://arrowverse.info) and its [API](https://arrowverse.info/api)'},
        {name: '7coil', value: 'PR [#24](https://github.com/adrifcastr/Gideon/pull/24) and [#25](https://github.com/adrifcastr/Gideon/pull/25)'}
    ]

    message.channel.send(Util.CreateEmbed('Development Credits:', {fields: fields, thumbnail: gideon.user.avatarURL()}));
}

export const help = {
    name: ["credits", "creds"],
    type: "misc",
    help_text: "credits",
    help_desc: "Displays people who contributed to development of this bot",
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
}