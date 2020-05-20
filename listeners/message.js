import Akairo from 'discord-akairo';
import Util from '../Util.js';
const Listener = Akairo.Listener;

class Ready extends Listener {
    constructor() {
        super('message', {
            emitter: 'client',
            event: 'message'
        });
    }

    async exec(message) {
        Util.MsgHandler.Handle(message, Util);
    }
}

export default Ready;