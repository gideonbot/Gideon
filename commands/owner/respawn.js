import Discord from 'discord.js';
import Akairo from 'discord-akairo';
const Command = Akairo.Command;

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */

class Respawn extends Command {
    constructor() {
        super('rs', {
            aliases: ['rs', 'respawn'],
            category: 'owner',
            channel: 'guild',
            ownerOnly: true
        });
    }

    async exec(message) {
        await message.reply('Now respawning all shards... :white_check_mark:');
        this.client.shard.respawnAll();
    }
}

export default Respawn;