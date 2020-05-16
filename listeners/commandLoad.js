import Akairo from 'discord-akairo';
const Listener = Akairo.Listener;

class commandLoad extends Listener {
    constructor() {
        super('commandLoad', {
            emitter: 'commandHandler',
            event: 'load'
        });
    }

    async exec(command) {
        console.log(`${command.id} loaded!`);
    }
}

export default commandLoad;