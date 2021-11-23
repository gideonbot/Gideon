import { log } from 'src/Util';

export default {
    name: 'uncaughtException',
    process: true,
    async run(err: Error): Promise<void> {
        log('Uncaught Exception: ' + `\`\`\`\n${err.stack}\n\`\`\``);
    }
};