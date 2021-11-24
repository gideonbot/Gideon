import { log } from 'src/Util';

export default {
	name: 'error',
	// eslint-disable-next-line @typescript-eslint/require-await
	async run(err: Error): Promise<void> {
		log(`Bot error: \`\`\`\n${err.stack}\n\`\`\``);
	}
};
