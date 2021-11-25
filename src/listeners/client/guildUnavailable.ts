import type { Guild } from 'discord.js';
import { log } from '#utils/Util';
import { Listener } from '@sapphire/framework';

export class GuildListener extends Listener {
	public run(guild: Guild): void {
		log(`The following guild turned unavailable due to a server outage:\n${guild.id} - \`${guild.name}\``);
	}
}
