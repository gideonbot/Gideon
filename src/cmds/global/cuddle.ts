import { CommandInteraction, GuildMember, MessageEmbed, Snowflake } from 'discord.js';
import type { Command } from 'src/@types/Util.js';

export async function run(interaction: CommandInteraction): Promise<void> {
	const auth = interaction.user;
	const user = interaction.client.users.cache.get(interaction.options.data[0]?.value as Snowflake);

	if (user?.id === auth.id || user?.id === interaction.client.user?.id)
		return interaction.reply({ embeds: [new MessageEmbed().setTitle('My protocols forbid any kind of self-harm!')] });
	else if (user?.bot) return interaction.reply({ embeds: [new MessageEmbed().setTitle('Please mention a human!')] });

	return interaction.reply({
		embeds: [
			Util.Embed(
				undefined,
				{
					description: `**${auth} you have cuddled ${user}!**\n\nA Beebo-tastic cuddle always brightens the mood!`,
					image: 'https://i.imgur.com/IOpmt2j.gif'
				},
				interaction.member as GuildMember
			)
		]
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
	name: 'cuddle',
	description: 'Gives the selected user a Beebo-tastic cuddle',
	defaultPermission: true,
	options: [
		{
			type: 'USER',
			name: 'user',
			description: 'The user to cuddle',
			required: true
		}
	]
};
