import Akairo from 'discord-akairo';
import Util from '../Util.js';
const Listener = Akairo.Listener;

class inviteCreate extends Listener {
    constructor() {
        super('inviteCreate', {
            emitter: 'client',
            event: 'inviteCreate'
        });
    }

    async exec(Invite) {
        if (Invite.guild.id !== '595318490240385037') return;
        Util.log(`Invite for \`${Invite.guild.name ? Invite.guild.name : 'Not available'}\` has been created:\n\nChannel: \`${Invite.channel.name}\`\n${Invite.url}`);
    }
}

export default inviteCreate;