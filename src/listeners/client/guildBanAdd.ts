import type { Guild, User } from 'discord.js';
import { log } from '#utils/Util';
import { Listener } from '@sapphire/framework';

export class GuildListener extends Listener {
	public run(guild: Guild, user: User): void {
		if (guild.id !== '595318490240385037') return;
		const { id } = user;
		let ub = this.container.client.getUser.get(id);

		if (!ub) {
			ub = {
				id,
				trmodeval: 0,
				blacklist: 0
			};
		}

		if (ub.blacklist === 0) {
			ub.blacklist = 1;
			this.container.client.setUser.run(ub);
			log(`User \`${id}\` has been blacklisted due to a guild ban!`);
		}
	}
}
