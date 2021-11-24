import { Guild, MessageEmbed } from 'discord.js';
import { BotCheck, LBG } from 'src/handlers/Checks';
import { log } from 'src/Util';
import { Listener } from '@sapphire/framework';

export class GuildListener extends Listener {
	public async run(guild: Guild): Promise<void> {
		await guild.members.fetch();
		log(
			new MessageEmbed()
				.setTitle('Joined a new guild:')
				.setDescription(
					`Guild: \`${guild.name}\` (${guild.id})\nMembers: \`${guild.members.cache.filter((x) => !x.user.bot).size}\` Bots: \`${
						guild.members.cache.filter((x) => x.user.bot).size
					}\`\nCreated at: \`${guild.createdAt.toDateString()}\`\nOwner: \`${guild.ownerId ?? 'Unknown'}\` (${guild.ownerId})`
				)
				.setThumbnail(guild.iconURL() ?? 'https://i.imgur.com/XqYQQ8l.png')
		);

		let currentguild = this.container.client.getGuild.get(guild.id);
		if (!currentguild) {
			currentguild = {
				guild: guild.id,
				cvmval: 0,
				abmval: 0,
				eastereggs: 0,
				blacklist: 0,
				chatchnl: '',
				gpd: 0
			};

			this.container.client.setGuild.run(currentguild);
		}

		const ub = this.container.client.getUser.get(guild.ownerId);
		if (ub) {
			if (ub.blacklist === 1) {
				currentguild.blacklist = 1;
				this.container.client.setGuild.run(currentguild);
			}
		}

		await LBG(guild.client, guild); // check if guild is blacklisted, if yes, leave
		await BotCheck(guild.client, guild); // check if guild collects bots, if yes, leave
	}
}
