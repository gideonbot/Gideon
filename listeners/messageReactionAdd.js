import Akairo from 'discord-akairo';
import Util from '../Util.js';
const Listener = Akairo.Listener;

class messageReactionAdd extends Listener {
    constructor() {
        super('messageReactionAdd', {
            emitter: 'client',
            event: 'messageReactionAdd'
        });
    }

    async exec(messageReaction, user) {
        Util.Starboard(messageReaction, user);
    }
}

export default messageReactionAdd;