import Util from '../../Util.js';
import { Message } from 'discord.js';

export default {
    name: 'messageDelete',
    run(message: Message): void {
        Util.Checks.GPD(message);
    }
};