import Akairo from 'discord-akairo';
const Inhibitor = Akairo.Inhibitor;

class Rules extends Inhibitor {
    constructor() {
        super('rules', {
            reason: 'rules'
        });
    }

    async exec(message) {
        if (message.guild.id === '595318490240385037') {
            return !message.member.roles.cache.has('688430418466177082'); //NO COMMANDS FOR NON RULE READERS, FEEL MY WRATH
        }
        else return null;
    }
}

export default Rules;