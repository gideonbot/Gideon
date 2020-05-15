import Discord from 'discord.js';
import Util from '../../Util.js';
import Akairo from 'discord-akairo';
const Command = Akairo.Command;

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */

class KillShard extends Command {
    constructor() {
        super('ks', {
            aliases: ['ks', 'kill'],
            category: 'owner',
            channel: 'guild',
            ownerOnly: true,
            args: [ { id: 'shardid', type: /(?<!\S)\d(?!\S)/, prompt: true } ],
        });
    }

    async exec(message, args) {
        let shardid = args.shardid.match[0];

        await message.reply(`Now killing shard \`${shardid}\`... :white_check_mark:`);
        this.client.shard.broadcastEval(`if (this.shard.ids[0] === ${shardid}) process.exit();`);
    }
}

export default KillShard;