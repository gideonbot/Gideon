import type { Message } from 'discord.js';
import { GPD } from 'src/handlers/Checks';

export default {
    name: 'messageDelete',
    run(message: Message): void {
        GPD(message.client, message);
    }
};