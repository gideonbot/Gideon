import Util from '../../Util.js';
import { Guild, User } from 'discord.js';

export default {
    name: 'guildBanAdd',
    async run(guild: Guild, user: User): Promise<void> {
        if (guild.id !== '595318490240385037') return;
        const id = user.id;
        let ub = process.gideon.getUser.get(id);
    
        if (!ub) {
            ub = {
                id: id,
                trmodeval: 0,
                blacklist: 0
            };
        }
    
        if (ub.blacklist === 0) {
            ub.blacklist = 1;
            process.gideon.setUser.run(ub);
            Util.log(`User \`${id}\` has been blacklisted due to a guild ban!`);
        }
    }
};