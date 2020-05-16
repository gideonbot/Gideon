import Util from '../../Util.js';
import Akairo from 'discord-akairo';
const Command = Akairo.Command;

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */

class Slowmode extends Command {
    constructor() {
        super('sm', {
            aliases: ['sm', 'slowmode'],
            category: 'admin',
            channel: 'guild',
            args: [ { id: 'amount', type: 'number', prompt: true },
                { id: 'channel', type: 'textChannel', prompt: false} ],
            clientPermissions: ['MANAGE_CHANNELS'],
            userPermissions: ['MANAGE_CHANNELS'],
            description: 'Toggles slowmode'
        });
    }

    async exec(message, args) {
        console.log(args);
        try {
            if (args.channel) {
                await message.mentions.channels.first().setRateLimitPerUser(args.amount);
                await message.reply(`Set slowmode for ${message.mentions.channels.first()} to \`${args[1]}\` ${args[1] == 1 ? 'second' : 'seconds'}!`);
            }
        
            else {
                await message.channel.setRateLimitPerUser(args.amount);
                await message.reply(`Set slowmode for ${message.channel} to \`${args[0]}\` ${args[0] == 1 ? 'second' : 'seconds'}!`);
            }
        }
        
        catch (ex) {
            Util.log('Caught an exception while running slowmode.js: ' + ex.stack);
            return message.channel.send(Util.CreateEmbed('An error occured while executing this command!', null, message.member));
        }      
    }
}

export default Slowmode;