import Discord from 'discord.js';
import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 */
export async function run(message) {
    let start = process.hrtime.bigint();

    Util.fetchJSON('https://discord.com/api/v7/gateway').then(() => {
        let took = (process.hrtime.bigint() - start) / BigInt('1000000');
        message.channel.send(Util.CreateEmbed('The fastest bot alive!', {description: `WebSocket ping: ${process.gideon.ws.ping.toFixed(2)} ms\nREST ping: ${took} ms`}, message.member));
    }, failed => {
        console.log(failed);
        message.channel.send('Failed to measure ping!');
    });
}

export const help = {
    name: ['ping', 'latency'],
    type: 'stats',
    help_text: 'ping',
    help_desc: 'Displays the bot\'s ping',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};