import { log } from 'src/Util';

export default {
	name: 'shardError',
	// eslint-disable-next-line @typescript-eslint/require-await
	async run(error: Error, shardID: number): Promise<void> {
		log(`Shard \`${shardID}\` has encountered a connection error:\n\n\`\`\`\n${error.stack}\n\`\`\``);
	}
};
