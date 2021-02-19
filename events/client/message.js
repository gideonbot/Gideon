import Util from '../../Util.js';

export default {
    name: 'message',
    async run(message) {
        Util.MsgHandler.Handle(message, Util);
    }
};