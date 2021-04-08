import Util from '../../Util.js';
import { MessageReaction, User } from 'discord.js';

export default {
    name: 'messageReactionAdd',
    async run(messageReaction: MessageReaction, user: User): Promise<void> {
        Util.Starboard(messageReaction, user);
    }
};