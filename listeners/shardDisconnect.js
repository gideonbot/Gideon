import Akairo from 'discord-akairo';
import Util from '../Util.js';
const Listener = Akairo.Listener;

class shardDisconnect extends Listener {
    constructor() {
        super('shardDisconnect', {
            emitter: 'client',
            event: 'shardDisconnect'
        });
    }

    async exec(event, id) {
        Util.log(`Shard \`${id}\` has lost its WebSocket connection:\n\n\`\`\`\nCode: ${event.code}\nReason: ${event.reason}\n\`\`\``);
    }
}

export default shardDisconnect;