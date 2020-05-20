import Akairo from 'discord-akairo';
import Util from '../Util.js';
const Listener = Akairo.Listener;

class voiceStateUpdate extends Listener {
    constructor() {
        super('voiceStateUpdate', {
            emitter: 'client',
            event: 'voiceStateUpdate'
        });
    }

    async exec(oldState, newState) {
        Util.Checks.VCCheck(oldState, newState);
    }
}

export default voiceStateUpdate;