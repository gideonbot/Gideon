import Akairo from 'discord-akairo';
import Util from '../Util.js';
const Listener = Akairo.Listener;

class guildMemberAdd extends Listener {
    constructor() {
        super('guildMemberAdd', {
            emitter: 'client',
            event: 'guildMemberAdd'
        });
    }

    async exec(member) {
        Util.Welcome(member);
        Util.Checks.NameCheck(null, member.user);
        Util.Checks.AccCheck(member, Util);
    }
}

export default guildMemberAdd;