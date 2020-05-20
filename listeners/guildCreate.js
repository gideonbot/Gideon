import Akairo from 'discord-akairo';
import Util from '../Util.js';
const Listener = Akairo.Listener;

class guildCreate extends Listener {
    constructor() {
        super('guildCreate', {
            emitter: 'client',
            event: 'guildCreate'
        });
    }

    async exec(guild) {
        Util.log('Joined a new guild:\n' + guild.id + ' - `' + guild.name + '`');

        let currentguild = this.client.getGuild.get(guild.id);
        if (!currentguild) {
            currentguild = {
                guild: guild.id,
                prefix: '!',
                cvmval: 0,
                abmval: 0,
                eastereggs: 0,
                blacklist: 0,
                chatchnl: ''
            };
            
            this.client.setGuild.run(currentguild);
        }

        Util.Checks.LBG(guild, Util); //check if guild is blacklisted, if yes, leave
        Util.Checks.BotCheck(guild, Util); //check if guild collects bots, if yes, leave
    }
}

export default guildCreate;