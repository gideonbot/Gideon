import type { Message } from 'discord.js';
import { Handle } from 'src/handlers/MessageHandler';

export default {
	name: 'messageCreate',
	async run(message: Message): Promise<void> {
		await Handle(message);
	}
};
