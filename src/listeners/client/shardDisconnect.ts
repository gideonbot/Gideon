import { Listener } from '@sapphire/framework';
import { log } from '#utils/Util';

export class ShardListener extends Listener {
	public run(event: CloseEvent, id: string): void {
		log(`Shard \`${id}\` disconnected:\n\n\`\`\`\nCode: ${event.code}\nReason: ${event.reason}\n\`\`\``);
	}
}
