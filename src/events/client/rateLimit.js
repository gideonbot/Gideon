import Util from '../../Util.js';

export default {
    name: 'rateLimit',
    async run(rateLimitInfo) {
        Util.log('Hit a ratelimit: ' + `\`\`\`\nTimeout: ${rateLimitInfo.timeout} ms\nLimit: ${rateLimitInfo.limit}\nMethod: ${rateLimitInfo.method}\nPath: ${rateLimitInfo.path}\nRoute: ${rateLimitInfo.route}\n\`\`\``);
    }
};