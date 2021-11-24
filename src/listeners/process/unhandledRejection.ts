import { DiscordAPIError, Constants } from 'discord.js';
import { log } from 'src/Util';
import { Listener } from '@sapphire/framework';

export class RejectionListener extends Listener {
	public run(err: DiscordAPIError): void {
		const ignore: number[] = [
			Constants.APIErrors.MISSING_PERMISSIONS,
			Constants.APIErrors.UNKNOWN_MESSAGE,
			Constants.APIErrors.MISSING_ACCESS,
			Constants.APIErrors.CANNOT_MESSAGE_USER,
			Constants.APIErrors.UNKNOWN_CHANNEL,
			Constants.APIErrors.INVALID_FORM_BODY
		];

		if (ignore.includes(err.code))
			return console.log(`Unhandled Rejection: \`\`\`\n${`${err.stack}\n\nJSON: ${JSON.stringify(err, null, 2)}`}\n\`\`\``);

		log(`Unhandled Rejection: \`\`\`\n${`${err.stack}\n\nJSON: ${JSON.stringify(err, null, 2)}`}\n\`\`\``);
	}
}
