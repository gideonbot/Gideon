import Util from '../../Util.js';

export default {
    name: 'shardReady',
    async run(id, unavailableGuilds, gideon) {
        if (!process.env.CI) if (gideon.guilds.cache.get('595318490240385037')) await gideon.guilds.cache.get('595318490240385037').members.fetch(); //fetch timevault members on shardready
        if (!unavailableGuilds) Util.log(`Shard \`${id}\` is connected!`);
        else Util.log(`Shard \`${id}\` is connected!\n\nThe following guilds are unavailable due to a server outage:\n${Array.from(unavailableGuilds).join('\n')}`);
    }
};