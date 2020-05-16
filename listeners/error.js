import Akairo from 'discord-akairo';
import Util from '../Util.js';
const Listener = Akairo.Listener;

class ClientError extends Listener {
    constructor() {
        super('error', {
            emitter: 'client',
            event: 'error'
        });
    }

    async exec(err) {
        Util.log('Bot error: ' + `\`\`\`\n${err.stack}\n\`\`\``);
    }
}

export default ClientError;