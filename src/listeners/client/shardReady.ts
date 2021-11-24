import { Listener } from '@sapphire/framework';
import { log } from 'src/Util';

export class ShardListener extends Listener {
	public async run(id: number, unavailableGuilds: Set<string> | null) {
		if (!process.env.CI)
			if (this.container.client.guilds.cache.get('595318490240385037'))
				await this.container.client.guilds.cache.get('595318490240385037')?.members.fetch(); // fetch timevault members on shardready
		// eslint-disable-next-line no-negated-condition
		if (!unavailableGuilds) log(`Shard \`${id}\` is connected!`);
		else
			log(
				`Shard \`${id}\` is connected!\n\nThe following guilds are unavailable due to a server outage:\n${Array.from(unavailableGuilds).join(
					'\n'
				)}`
			);
	}
}
