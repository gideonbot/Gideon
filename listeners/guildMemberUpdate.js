import Akairo from 'discord-akairo';
import Util from '../Util.js';
const Listener = Akairo.Listener;

class guildMemberUpdate extends Listener {
    constructor() {
        super('guildMemberUpdate', {
            emitter: 'client',
            event: 'guildMemberUpdate'
        });
    }

    async exec(oldMember, newMember) {
        if (newMember.nickname !== oldMember.nickname) Util.Checks.NameCheck(newMember, null);
    }
}

export default guildMemberUpdate;