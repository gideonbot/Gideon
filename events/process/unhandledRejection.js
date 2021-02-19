import Util from '../../Util.js';
import Discord from 'discord.js';

export default {
    name: 'unhandledRejection',
    process: true,
    async run(err) {
        const ignore = [
            Discord.Constants.APIErrors.MISSING_PERMISSIONS,
            Discord.Constants.APIErrors.UNKNOWN_MESSAGE,
            Discord.Constants.APIErrors.MISSING_ACCESS,
            Discord.Constants.APIErrors.CANNOT_MESSAGE_USER,
            Discord.Constants.APIErrors.UNKNOWN_CHANNEL
        ];
    
        if (ignore.includes(err.code)) return;
    
        Util.log('Unhandled Rejection: ' + `\`\`\`\n${err.stack + '\n\nJSON: ' + JSON.stringify(err, null, 2)}\n\`\`\``);
    
        if (process.env.CI) {
            console.log('Unhandled Rejection detected, marking as failed');
            process.exit(1);
        }
    }
};