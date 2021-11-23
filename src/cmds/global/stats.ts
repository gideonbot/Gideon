import { CommandInteraction, MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';
import type { Command } from 'src/@types/Util.js';

export async function run(interaction: CommandInteraction): Promise<void> {
	const cmds = interaction.client.getStat.get('commands_ran').value + 1;
	const msgs = interaction.client.getStat.get('messages_sent').value + 1;
	const aimsgs = interaction.client.getStat.get('ai_chat_messages_processed').value;
	const users = interaction.client.guilds.cache.reduce((r, d) => r + d.memberCount, 0);

	const buttons = [
		new MessageButton().setStyle('LINK').setLabel('gideonbot.com').setURL('https://gideonbot.com'),
		new MessageButton().setStyle('LINK').setLabel('GitHub').setURL('https://github.com/gideonbot/Gideon')
	];

	return interaction.reply({
		embeds: [
			new MessageEmbed()
				.setTitle("Gideon's stats:")
				.setDescription(
					`Total guilds: \`${interaction.client.guilds.cache.size}\`\nTotal users: \`${users.toLocaleString(
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
