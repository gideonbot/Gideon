import type { CommandInteraction, TextChannel, User } from 'discord.js';
import { log } from '#utils/Util';
import { Listener } from '@sapphire/framework';

export class CommandListener extends Listener {
	public run(interaction: CommandInteraction, reason: string): void {
		if (process.env.CI) return;
		log(
			`Command Refused:\n\n\`${(interaction?.member?.user as User).tag}\` attempted to use \`${
				interaction?.commandName
			}\`\nCommand failed due to: \`${reason}\`\nOrigin: \`#${(interaction?.channel as TextChannel).name}\` at \`${interaction?.guild?.name}\``
		);
	}
}
