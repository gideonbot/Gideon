import Akairo from 'discord-akairo';
import Util from '../Util.js';
const Listener = Akairo.Listener;

class userUpdate extends Listener {
    constructor() {
        super('userUpdate', {
            emitter: 'client',
            event: 'userUpdate'
        });
    }

    async exec(oldUser, newUser) {
        if (newUser.username !== oldUser.username) Util.Checks.NameCheck(null, newUser, this.client);
    }
}

export default userUpdate;