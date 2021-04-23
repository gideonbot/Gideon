import Util from '../../Util.js';
import { Guild } from 'discord.js';

export default {
    name: 'guildDelete',
    async run(guild: Guild): Promise<void> {
        Util.log(Util.Embed('Left guild:', {description: `Guild: \`${guild.name}\` (${guild.id})\nMembers: \`${guild.members.cache.filter(x => x?.user && !x.user.bot).size}\` Bots: \`${guild.members.cache.filter(x => x?.user?.bot).size}\`\nCreated at: \`${guild.createdAt.toDateString()}\`\nOwner: \`${guild.ownerID ?? 'Unknown'}\` (${guild.ownerID})`, thumbnail: (guild.iconURL() as string)}));
    }
};