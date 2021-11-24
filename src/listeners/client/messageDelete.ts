import type { Message } from 'discord.js';
import { GPD } from 'src/handlers/Checks';
import { Listener } from '@sapphire/framework';

export class MessageListener extends Listener {
	public run(message: Message): void {
		GPD(message.client, message);
	}
}
