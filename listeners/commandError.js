import Akairo from 'discord-akairo';
const Listener = Akairo.Listener;

class commandError extends Listener {
    constructor() {
        super('commandError', {
            emitter: 'commandHandler',
            event: 'error'
        });
    }

    async exec(error) {
        console.log(error);
    }
}

export default commandError;