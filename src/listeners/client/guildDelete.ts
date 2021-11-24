import { Guild, MessageEmbed } from 'discord.js';
import { log } from 'src/Util';
import { Listener } from '@sapphire/framework';

export class GuildListener extends Listener {
	public run(guild: Guild): void {
		log(
			new MessageEmbed()
				.setTitle('Left guild:')
				.setDescription(
					`Guild: \`${guild.name}\` (${guild.id})\nMembers: \`${guild.members.cache.filter((x) => !x.user.bot).size}\` Bots: \`${
						guild.members.cache.filter((x) => x.user.bot).size
					}\`\nCreated at: \`${guild.createdAt.toDateString()}\`\nOwner: \`${guild.ownerId ?? 'Unknown'}\` (${guild.ownerId})`
				)
				.setThumbnail(guild.iconURL() ?? 'https://i.imgur.com/XqYQQ8l.png')
		);
	}
}
