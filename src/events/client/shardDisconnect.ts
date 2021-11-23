import { log } from 'src/Util';

export default {
	name: 'shardDisconnect',
	// eslint-disable-next-line @typescript-eslint/require-await
	async run(event: CloseEvent, id: string): Promise<void> {
		log(`Shard \`${id}\` disconnected:\n\n\`\`\`\nCode: ${event.code}\nReason: ${event.reason}\n\`\`\``);
	}
};
