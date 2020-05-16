import Akairo from 'discord-akairo';
const Command = Akairo.Command;

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */

class Eggs extends Command {
    constructor() {
        super('eggs', {
            aliases: ['eggs', 'eastereggs'],
            category: 'admin',
            channel: 'guild',
            clientPermissions: ['MANAGE_MESSAGES'],
            userPermissions: ['MANAGE_MESSAGES'],
            description: 'Toggles Easter-eggs'
        });
    }

    async exec(message) {
        let eggs = this.client.getGuild.get(message.guild.id);
        if (!eggs.eastereggs) eggs.eastereggs = 0;

        if (eggs.eastereggs === 0) {
            eggs.eastereggs = 1;
            this.client.setGuild.run(eggs);
            message.reply('Easter eggs enabled! :white_check_mark:');
        }

        else {
            eggs.eastereggs = 0;
            this.client.setGuild.run(eggs);
            message.reply('Easter eggs disabled! :white_check_mark:');
        } 
    }
}

export default Eggs;
