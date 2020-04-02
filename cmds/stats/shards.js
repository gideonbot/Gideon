import Discord from "discord.js";
import Util from "../../Util.js";

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(gideon, message, args) {
    let shards = gideon.shard.count;

    message.channel.send(Util.CreateEmbed('Shard Count:', {description: `Gideon is currently running on \`${shards}\` ${shards > 1 ? 'shards' : 'shard'}`}));
}

export const help = {
    name: "shards",
    type: "stats",
    help_text: "shards",
    help_desc: "Displays amount of spawned shards",
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
}