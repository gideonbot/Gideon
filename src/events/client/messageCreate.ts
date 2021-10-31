import Util from '../../Util.js';
import { Message } from 'discord.js';

export default {
    name: 'messageCreate',
    run(message: Message): void {
        Util.MsgHandler.Handle(message);
    }
};