import Discord from 'discord.js';
import Util from '../../Util.js';
import Akairo from 'discord-akairo';
const Command = Akairo.Command;

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */

class Ping extends Command {
    constructor() {
        super('ping', {
            aliases: ['ping', 'latency'],
            category: 'stats'
        });
    }

    exec(message) {
        let start = process.hrtime.bigint();

        Util.fetchJSON('https://discord.com/api/v7/gateway').then(() => {
            let took = (process.hrtime.bigint() - start) / BigInt('1000000');
            message.channel.send(Util.CreateEmbed('The fastest bot alive!', {description: `WebSocket ping: ${this.client.ws.ping.toFixed(2)} ms\nREST ping: ${took} ms`}, message.member));
        }, failed => {
            console.log(failed);
            message.channel.send('Failed to measure ping!');
        });
    }
}

export default Ping;