import Akairo from 'discord-akairo';
const Inhibitor = Akairo.Inhibitor;

class Blacklist extends Inhibitor {
    constructor() {
        super('blacklist', {
            reason: 'blacklist'
        });
    }

    async exec(message) {
        const ubl = this.client.getUser.get(message.author.id);
        if (!ubl || !ubl.blacklist) return null;
        return ubl.blacklist === 1;
    }
}

export default Blacklist;