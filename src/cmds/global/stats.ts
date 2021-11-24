import type { SapphireClient } from '@sapphire/framework';
import { CommandInteraction, MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';
import type { Command } from 'src/@types/Util.js';

export async function run(interaction: CommandInteraction, gideon: SapphireClient): Promise<void> {
	const cmds = gideon.getStat.get('commands_ran').value + 1;
	const msgs = gideon.getStat.get('messages_sent').value + 1;
	const aimsgs = gideon.getStat.get('ai_chat_messages_processed').value;
	const users = gideon.guilds.cache.reduce((r, d) => r + d.memberCount, 0);

	const buttons = [
		new MessageButton().setStyle('LINK').setLabel('gideonbot.com').setURL('https://gideonbot.com'),
		new MessageButton().setStyle('LINK').setLabel('GitHub').setURL('https://github.com/gideonbot/Gideon')
	];

	return interaction.reply({
		embeds: [
			new MessageEmbed()
				.setTitle("Gideon's stats:")
				.setDescription(
					`Total guilds: \`${gideon.guilds.cache.size}\`\nTotal users: \`${users.toLocaleString(
						'de-DE'
					)}\`\nUsed commands: \`${cmds.toLocaleString('de-DE')}\`\nMessages sent: \`${msgs.toLocaleString(
						'de-DE'
					)}\`\nAI chat messages: \`${aimsgs.toLocaleString('de-DE')}\``
				)
		],
		components: [new MessageActionRow().addComponents(buttons)]
	});
}

export const info: Command['info'] = {
	owner: false,
	nsfw: false,
	roles: [],
	user_perms: [],
	bot_perms: []
};

export const data: Command['data'] = {
	name: 'stats',
	description: "Displays Gideon's stats",
	defaultPermission: true
};
