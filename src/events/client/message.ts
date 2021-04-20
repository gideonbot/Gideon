import Util from '../../Util.js';
import { Message } from 'discord.js';

export default {
    name: 'message',
    run(message: Message): void {
        Util.MsgHandler.Handle(message);
    }
};