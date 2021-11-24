import type { Guild, User } from 'discord.js';
import { log } from 'src/Util';

export default {
	name: 'guildBanAdd',
	// eslint-disable-next-line @typescript-eslint/require-await
	async run(guild: Guild, user: User): Promise<void> {
		if (guild.id !== '595318490240385037') return;
		const { id } = user;
		let ub = guild.client.getUser.get(id);

		if (!ub) {
			ub = {
				id,
				trmodeval: 0,
				blacklist: 0
			};
		}

		if (ub.blacklist === 0) {
			ub.blacklist = 1;
			guild.client.setUser.run(ub);
			log(`User \`${id}\` has been blacklisted due to a guild ban!`);
		}
	}
};
