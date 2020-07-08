import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 */
export async function run(message) {
    let shards = process.gideon.shard ? process.gideon.shard.count : 1;

    message.channel.send(Util.CreateEmbed('Shard Count:', {description: `Gideon is currently running on \`${shards}\` ${shards > 1 ? 'shards' : 'shard'}`}, message.member));
}

export const help = {
    name: 'shards',
    type: 'stats',
    help_text: 'shards',
    help_desc: 'Displays amount of spawned shards',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};