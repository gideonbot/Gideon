import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(message, args) {
    const as = Util.Embed('You must supply valid input!', null, message.member);
    
    if (!args[0]) return message.channel.send(as);
    if (args[1]) return message.channel.send(as);
    let noid = isNaN(args[0]);
    if (noid) return message.channel.send(as);
    if (args[0].length > 1) return message.channel.send(as);
    let shardid = args[0];

    await message.reply(`Now killing shard \`${shardid}\`... :white_check_mark:`);
    process.gideon.shard.broadcastEval(`if (this.shard.ids[0] === ${shardid}) process.exit();`);
}

export const help = {
    name: 'ks',
    type: 'owner',
    help_text: 'ks <shardid>',
    help_desc: 'Kills the specified shard',
    owner: true,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};