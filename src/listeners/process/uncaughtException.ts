import { log } from '#utils/Util';
import { Listener } from '@sapphire/framework';

export class ExceptionListener extends Listener {
	public run(err: Error): void {
		log(`Uncaught Exception: \`\`\`\n${err.stack}\n\`\`\``);
	}
}
