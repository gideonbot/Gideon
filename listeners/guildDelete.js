import Akairo from 'discord-akairo';
import Util from '../Util.js';
const Listener = Akairo.Listener;

class guildDelete extends Listener {
    constructor() {
        super('guildDelete', {
            emitter: 'client',
            event: 'guildDelete'
        });
    }

    async exec(guild) {
        Util.log('Left guild:\n' + guild.id + ' - `' + guild.name + '`');
    }
}

export default guildDelete;