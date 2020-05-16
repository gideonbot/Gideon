import Akairo from 'discord-akairo';
const Inhibitor = Akairo.Inhibitor;

class Blacklist extends Inhibitor {
    constructor() {
        super('aichat', {
            reason: 'aichat'
        });
    }

    async exec(message) {
        let currentguild = this.client.getGuild.get(message.guild.id);
        if (!currentguild) {
            currentguild = {
                guild: message.guild.id,
                prefix: '!',
                cvmval: 0,
                abmval: 0,
                eastereggs: 0,
                blacklist: 0,
                chatchnl: ''
            };

            this.client.setGuild.run(currentguild);
        }

        return message.channel.id === currentguild.chatchnl;
    }
}

export default Blacklist;