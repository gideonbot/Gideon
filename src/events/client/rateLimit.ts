import Util from '../../Util.js';
import { RateLimitData } from 'discord.js';

export default {
    name: 'rateLimit',
    async run(rateLimitInfo: RateLimitData) {
        Util.log('Hit a ratelimit: ' + `\`\`\`\nTimeout: ${rateLimitInfo.timeout} ms\nLimit: ${rateLimitInfo.limit}\nMethod: ${rateLimitInfo.method}\nPath: ${rateLimitInfo.path}\nRoute: ${rateLimitInfo.route}\n\`\`\``);
    }
};