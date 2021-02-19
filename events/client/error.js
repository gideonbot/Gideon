import Util from '../../Util.js';

export default {
    name: 'error',
    async run(err) {
        Util.log('Bot error: ' + `\`\`\`\n${err.stack}\n\`\`\``);
    }
};