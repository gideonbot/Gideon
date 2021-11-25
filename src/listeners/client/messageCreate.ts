import type { Message } from 'discord.js';
import { Handle } from '#utils/MessageHandler';
import { Listener } from '@sapphire/framework';

export class MessageListener extends Listener {
	public async run(message: Message): Promise<void> {
		await Handle(message, this.container.client);
	}
}
