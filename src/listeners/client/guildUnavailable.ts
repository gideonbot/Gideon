import type { Guild } from 'discord.js';
import { log } from 'src/Util';

export default {
	name: 'guildUnavailable',
	// eslint-disable-next-line @typescript-eslint/require-await
	async run(guild: Guild): Promise<void> {
		log(`The following guild turned unavailable due to a server outage:\n${guild.id} - \`${guild.name}\``);
	}
};
