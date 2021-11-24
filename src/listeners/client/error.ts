import { Listener } from '@sapphire/framework';
import { log } from 'src/Util';

export class ErrorListener extends Listener {
	public run(err: Error): void {
		log(`Bot error: \`\`\`\n${err.stack}\n\`\`\``);
	}
}
