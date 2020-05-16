import Akairo from 'discord-akairo';
const Command = Akairo.Command;

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */

class Purge extends Command {
    constructor() {
        super('purge', {
            aliases: ['purge', 'delete'],
            category: 'admin',
            channel: 'guild',
            args: [ { id: 'msgamt', type: 'number', prompt: true } ],
            clientPermissions: ['MANAGE_MESSAGES'],
            userPermissions: ['MANAGE_MESSAGES'],
            description: 'Purges Messages'
        });
    }

    async exec(message, args) {
        const msgamt = args.msgamt;
        
        if (msgamt > 100) return message.reply('Max value is `100`.');

        await message.delete({ timeout: 200 });
        await message.channel.bulkDelete(msgamt, true);
    }
}

export default Purge;