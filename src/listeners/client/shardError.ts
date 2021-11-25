import { Listener } from '@sapphire/framework';
import { log } from '#utils/Util';

export class ShardListener extends Listener {
	public run(error: Error, shardID: number): void {
		log(`Shard \`${shardID}\` has encountered a connection error:\n\n\`\`\`\n${error.stack}\n\`\`\``);
	}
}
