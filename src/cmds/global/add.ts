import { CommandInteraction, MessageActionRow, MessageButton } from 'discord.js';
import type { Command } from 'src/@types/Util';

export async function run(interaction: CommandInteraction): Promise<void> {
	const url = 'https://gideonbot.com/invite';
	const button = new MessageButton().setStyle('LINK').setURL(url).setLabel('Invite me');
	return interaction.reply({ content: 'Oauth2 Invite:', components: [new MessageActionRow().addComponents(button)] });
}

export const info: Command['info'] = {
	owner: false,
	nsfw: false,
	roles: [],
	user_perms: [],
	bot_perms: []
};

export const data: Command['data'] = {
	name: 'add',
	description: "Displays Gideon's oauth2 invite link",
	defaultPermission: true
};
