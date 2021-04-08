import Util from '../../Util.js';
import { Message } from 'discord.js';

export default {
    name: 'messageDelete',
    async run(message: Message) {
        Util.Checks.GPD(message, Util);
    }
};