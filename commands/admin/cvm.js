import Akairo from 'discord-akairo';
const Command = Akairo.Command;

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */

class CVM extends Command {
    constructor() {
        super('cvm', {
            aliases: ['cvm'],
            category: 'admin',
            channel: 'guild',
            clientPermissions: ['MANAGE_MESSAGES'],
            userPermissions: ['MANAGE_MESSAGES'],
            description: 'Toggles Crossover-Mode'
        });
    }

    async exec(message) {
        let cvm = this.client.getGuild.get(message.guild.id);
        if (!cvm.cvmval) cvm.cvmval = 0;
        
        if (cvm.cvmval === 0) {
            cvm.cvmval = 1;
            this.client.setGuild.run(cvm);
            message.reply('Crossover-Mode enabled! :white_check_mark:');
        }

        else {
            cvm.cvmval = 0;
            this.client.setGuild.run(cvm);
            message.reply('Crossover-Mode disabled! :white_check_mark:');
        } 
    }
}

export default CVM;