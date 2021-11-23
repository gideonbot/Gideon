import type { CommandInteraction, TextChannel, User } from 'discord.js';
import { log } from 'src/Util';

export default {
	name: 'commandRefused',
	// eslint-disable-next-line @typescript-eslint/require-await
	async run(interaction: CommandInteraction, reason: string): Promise<void> {
		if (process.env.CI) return;
		log(
			`Command Refused:\n\n\`${(interaction?.member?.user as User).tag}\` attempted to use \`${
				interaction?.commandName
			}\`\nCommand failed due to: \`${reason}\`\nOrigin: \`#${(interaction?.channel as TextChannel).name}\` at \`${interaction?.guild?.name}\``
		);
	}
};
