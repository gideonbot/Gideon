import { Guild, Client, MessageEmbed } from 'discord.js';
import { BotCheck, LBG } from 'src/handlers/Checks';
import { log } from 'src/Util';

export default {
    name: 'guildCreate',
    async run(guild: Guild, gideon: Client): Promise<void> {
        await guild.members.fetch();
        log(new MessageEmbed().setTitle('Joined a new guild:').setDescription(`Guild: \`${guild.name}\` (${guild.id})\nMembers: \`${guild.members.cache.filter(x => !x.user.bot).size}\` Bots: \`${guild.members.cache.filter(x => x.user.bot).size}\`\nCreated at: \`${guild.createdAt.toDateString()}\`\nOwner: \`${guild.ownerId ?? 'Unknown'}\` (${guild.ownerId})`).setThumbnail(guild.iconURL() ?? 'https://i.imgur.com/XqYQQ8l.png'));

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
    
        const ub = guild.client.getUser.get(guild.ownerId);
        if (ub) {
            if (ub.blacklist === 1) {
                currentguild.blacklist = 1;
                guild.client.setGuild.run(currentguild);
            }
        }
    
        LBG(guild.client, guild); //check if guild is blacklisted, if yes, leave
        BotCheck(guild.client, guild); //check if guild collects bots, if yes, leave
    }
};