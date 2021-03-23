import Util from '../../Util.js';

export default {
    name: 'messageDelete',
    async run(message) {
        Util.Checks.GPD(message, Util);
    }
};