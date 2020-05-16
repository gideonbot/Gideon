import Akairo from 'discord-akairo';
import Util from '../Util.js';
const Listener = Akairo.Listener;

class guildUnavailable extends Listener {
    constructor() {
        super('guildUnavailable', {
            emitter: 'client',
            event: 'guildUnavailable'
        });
    }

    async exec(guild) {
        Util.log('The following guild turned unavailable due to a server outage:\n' + guild.id + ' - `' + guild.name + '`');
    }
}

export default guildUnavailable;