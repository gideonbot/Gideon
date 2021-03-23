import Util from '../../Util.js';

export default {
    name: 'interactionCreate',
    async run(interaction) {
        Util.Interactions.Handle(interaction, Util);
    }
};