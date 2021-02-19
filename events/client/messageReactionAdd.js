import Util from '../../Util.js';

export default {
    name: 'messageReactionAdd',
    async run(messageReaction, user) {
        Util.Starboard(messageReaction, user);
    }
};