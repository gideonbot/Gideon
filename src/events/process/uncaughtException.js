import Util from '../../Util.js';

export default {
    name: 'uncaughtException',
    process: true,
    async run(err) {
        Util.log('Uncaught Exception: ' + `\`\`\`\n${err.stack}\n\`\`\``);

        if (process.env.CI) {
            console.log('Exception detected, marking as failed');
            process.exit(1);
        }
    }
};