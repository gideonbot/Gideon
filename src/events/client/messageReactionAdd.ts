import Util from '../../Util.js';
import { MessageReaction, User } from 'discord.js';

export default {
    name: 'messageReactionAdd',
    async run(messageReaction: MessageReaction, user: User): Promise<void> {
        if (process.env.CI) return;
        
        Util.Starboard(messageReaction, user);
        Util.GuildJoinReactions(messageReaction, user);
    }
};