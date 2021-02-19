import Util from '../../Util.js';

export default {
    name: 'shardDisconnect',
    async run(event, id) {
        Util.log(`Shard \`${id}\` disconnected:\n\n\`\`\`\nCode: ${event.code}\nReason: ${event.reason}\n\`\`\``);
    }
};