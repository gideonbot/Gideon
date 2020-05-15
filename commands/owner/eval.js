import Discord from 'discord.js';
import Util from '../../Util.js';
import Akairo from 'discord-akairo';
const Command = Akairo.Command;

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */

class Eval extends Command {
    constructor() {
        super('eval', {
            aliases: ['eval', 'exec'],
            category: 'owner',
            channel: 'guild',
            ownerOnly: true,
            args: [ { id: 'code', match: 'content', prompt: true } ],
        });
    }

    async exec(message, args) {
        try {
            const code = args.code;
            // eslint-disable-next-line semi
            const returnedValue = await eval('(async () => { return ' + code + '})()').catch(e => message.channel.send(Util.CreateEmbed('An error occured while processing your request:', {description: '```\n' + Util.truncate(e.stack, 400, true) + '```'}, message.member)));
    
            if (typeof returnedValue === 'undefined') {
                message.channel.send('The evaluated code returned nothing.');
                return;
            }
    
            let printValue = '';
    
            if (typeof returnedValue === 'string') printValue = returnedValue;
            else if (typeof returnedValue === 'object') printValue = JSON.stringify(returnedValue, null, 2);
            else printValue = new String(returnedValue);
    
            if (printValue == '{}') return;
    
            message.channel.send(Util.truncate(printValue, 1900, true), {
                code: true
            });
        } catch (e) {
            return message.channel.send(Util.CreateEmbed('An error occured while processing your request:', {description: '```\n' + Util.truncate(e.stack, 400, true) + '```'}, message.member));
        }
    }
}

export default Eval;