import type { Client } from 'discord.js';
import { log } from 'src/Util';

export default {
	name: 'shardReady',
	async run(id: number, unavailableGuilds: Set<string>, gideon: Client): Promise<void> {
		if (!process.env.CI) if (gideon.guilds.cache.get('595318490240385037')) await gideon.guilds.cache.get('595318490240385037')?.members.fetch(); // fetch timevault members on shardready
		// eslint-disable-next-line no-negated-condition
		if (!unavailableGuilds) log(`Shard \`${id}\` is connected!`);
		else
			log(
				`Shard \`${id}\` is connected!\n\nThe following guilds are unavailable due to a server outage:\n${Array.from(unavailableGuilds).join(
					'\n'
				)}`
			);
	}
};
