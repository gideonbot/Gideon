/**
 * @param {Discord.Message} message
 */
export async function run(message) {
    await message.reply('Now respawning all shards... :white_check_mark:');
    process.gideon.shard.respawnAll();
}

export const help = {
    name: ['rs', 'respawn'],
    type: 'owner',
    help_text: 'rs',
    help_desc: 'Respawns all shards',
    owner: true,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};