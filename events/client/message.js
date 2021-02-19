import Util from '../../Util.js';

export default {
    name: 'message',
    async run(message) {
        console.log('message lol');
        Util.MsgHandler.Handle(message, Util);
    }
};