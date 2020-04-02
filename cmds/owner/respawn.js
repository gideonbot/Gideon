import Discord from "discord.js";

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(gideon, message, args) {
    await message.reply(`now respawning all shards... :white_check_mark:`);
    gideon.shard.respawnAll();
}

export const help = {
    name: ["rs", "respawn"],
    type: "owner",
    help_text: "rs <:gideon:686678560798146577>",
    help_desc: "Respawns all shards",
    owner: true,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
}