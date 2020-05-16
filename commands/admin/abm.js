import Akairo from 'discord-akairo';
const Command = Akairo.Command;

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */

class ABM extends Command {
    constructor() {
        super('abm', {
            aliases: ['abm'],
            category: 'admin',
            channel: 'guild',
            clientPermissions: ['MANAGE_MESSAGES'],
            userPermissions: ['MANAGE_MESSAGES'],
            description: 'Toggles Anti-BS-Mode',
            usage: 'abm'
        });
    }

    async exec(message) {
        let abm = this.client.getGuild.get(message.guild.id);
        if (!abm.abmval) abm.abmval = 0;
        
        if (abm.abmval === 0) {
            abm.abmval = 1;
            this.client.setGuild.run(abm);
            message.reply('ABM enabled! :white_check_mark:');
        }

        else {
            abm.abmval = 0;
            this.client.setGuild.run(abm);
            message.reply('ABM disabled! :white_check_mark:');
        } 
    }
}

export default ABM;