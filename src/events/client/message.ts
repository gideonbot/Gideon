import Util from '../../Util.js';
import { Message } from 'discord.js';

export default {
    name: 'message',
    async run(message: Message) {
        Util.MsgHandler.Handle(message, Util);
    }
};