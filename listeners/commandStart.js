import Akairo from 'discord-akairo';
import Util from '../Util.js';
const Listener = Akairo.Listener;

class commandStart extends Listener {
    constructor() {
        super('commandStart', {
            emitter: 'commandHandler',
            event: 'commandStarted'
        });
    }

    async exec() {
        Util.IncreaseStat('commands_ran');
    }
}

export default commandStart;