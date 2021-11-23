import { log } from 'src/Util';

export default {
    name: 'error',
    async run(err: Error): Promise<void> {
        log('Bot error: ' + `\`\`\`\n${err.stack}\n\`\`\``);
    }
};