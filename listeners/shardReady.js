import Akairo from 'discord-akairo';
import Util from '../Util.js';
const Listener = Akairo.Listener;

class shardReady extends Listener {
    constructor() {
        super('shardReady', {
            emitter: 'client',
            event: 'shardReady'
        });
    }

    async exec(id, unavailableGuilds) {
        if (!unavailableGuilds) Util.log(`Shard \`${id}\` is connected!`);
        else Util.log(`Shard \`${id}\` is connected!\n\nThe following guilds are unavailable due to a server outage:\n${Array.from(unavailableGuilds).join('\n')}`);

    }
}

export default shardReady;