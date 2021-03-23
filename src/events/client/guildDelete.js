import Util from '../../Util.js';

export default {
    name: 'guildDelete',
    async run(guild) {
        Util.log(Util.Embed('Left guild:', {description: `Guild: \`${guild.name}\` (${guild.id})\nMembers: \`${guild.members.cache.filter(x => x?.user && !x.user.bot).size}\` Bots: \`${guild.members.cache.filter(x => x?.user?.bot).size}\`\nCreated at: \`${guild.createdAt.toDateString()}\`\nOwner: \`${guild.owner?.user?.tag ?? 'Unknown'}\` (${guild.ownerID})`, thumbnail: guild.iconURL()}));
    }
};