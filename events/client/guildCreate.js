import Util from '../../Util.js';

export default {
    name: 'guildCreate',
    async run(guild, gideon) {
        await guild.members.fetch();
        Util.log(Util.Embed('Joined a new guild:', {description: `Guild: \`${guild.name}\` (${guild.id})\nMembers: \`${guild.members.cache.filter(x => !x.user.bot).size}\` Bots: \`${guild.members.cache.filter(x => x.user.bot).size}\`\nCreated at: \`${guild.createdAt.toDateString()}\`\nOwner: \`${guild.owner?.user.tag ?? 'Unknown'}\` (${guild.ownerID})`, thumbnail: guild.iconURL()}));
    
        let currentguild = gideon.getGuild.get(guild.id);
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
    
        let ub = process.gideon.getUser.get(guild.ownerID);
        if (ub) {
            if (ub.blacklist === 1) {
                currentguild.blacklist = 1;
                process.gideon.setGuild.run(currentguild);
            }
        }
    
        Util.Checks.LBG(guild, Util); //check if guild is blacklisted, if yes, leave
        Util.Checks.BotCheck(guild, Util); //check if guild collects bots, if yes, leave
    }
};