import Akairo from 'discord-akairo';
import Util from '../Util.js';
const Listener = Akairo.Listener;

class shardError extends Listener {
    constructor() {
        super('shardError', {
            emitter: 'client',
            event: 'shardError'
        });
    }

    async exec(error, shardID) {
        Util.log(`Shard \`${shardID}\` has encountered a connection error:\n\n\`\`\`\n${error}\n\`\`\``);
    }
}

export default shardError;