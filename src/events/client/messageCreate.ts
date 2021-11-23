import type { Message } from 'discord.js';
import { Handle } from 'src/handlers/MessageHandler';

export default {
    name: 'messageCreate',
    run(message: Message): void {
        Handle(message);
    }
};