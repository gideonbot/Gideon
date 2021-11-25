import type { Message } from 'discord.js';
import { GPD } from '#utils/Checks';
import { Listener } from '@sapphire/framework';

export class MessageListener extends Listener {
	public run(message: Message): void {
		GPD(this.container.client, message);
	}
}
