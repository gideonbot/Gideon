import { log } from 'src/Util';

export default {
	name: 'uncaughtException',
	process: true,
	// eslint-disable-next-line @typescript-eslint/require-await
	async run(err: Error): Promise<void> {
		log(`Uncaught Exception: \`\`\`\n${err.stack}\n\`\`\``);
	}
};
