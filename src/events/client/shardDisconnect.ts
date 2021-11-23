import Discord from 'discord.js';
import { log } from 'src/Util';

export default {
    name: 'shardDisconnect',
    async run(event: Discord.CloseEvent, id: string): Promise<void> {
        log(`Shard \`${id}\` disconnected:\n\n\`\`\`\nCode: ${event.code}\nReason: ${event.reason}\n\`\`\``);
    }
};