import Util from '../../Util.js';
import { Guild, Client } from 'discord.js';

export default {
    name: 'guildCreate',
    async run(guild: Guild, gideon: Client): Promise<void> {
        await guild.members.fetch();
        Util.log(Util.Embed('Joined a new guild:', {description: `Guild: \`${guild.name}\` (${guild.id})\nMembers: \`${guild.members.cache.filter(x => !x.user.bot).size}\` Bots: \`${guild.members.cache.filter(x => x.user.bot).size}\`\nCreated at: \`${guild.createdAt.toDateString()}\`\nOwner: \`${guild.ownerId ?? 'Unknown'}\` (${guild.ownerId})`, thumbnail: (guild.iconURL() as string)}));
    
        let currentguild = gideon.getGuild.get(guild.id) as any;
        if (!currentguild) {
            currentguild = {
                guild: guild.id,
                cvmval: 0,
                abmval: 0,
                eastereggs: 0,
                blacklist: 0,
                chatchnl: '',
                gpd: 0
            };
            
            gideon.setGuild.run(currentguild);
        }
    
        const ub = process.gideon.getUser.get(guild.ownerId) as any;
        if (ub) {
            if (ub.blacklist === 1) {
                currentguild.blacklist = 1;
                process.gideon.setGuild.run(currentguild);
            }
        }
    
        Util.Checks.LBG(guild); //check if guild is blacklisted, if yes, leave
        Util.Checks.BotCheck(guild); //check if guild collects bots, if yes, leave
    }
};