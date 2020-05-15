import Discord from 'discord.js';
import Akairo from 'discord-akairo';
const Command = Akairo.Command;

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */

class Devmode extends Command {
    constructor() {
        super('devmode', {
            aliases: ['devmode', 'testmode'],
            category: 'owner',
            channel: 'guild',
            ownerOnly: true
        });
    }

    async exec(message) {
        if (this.client.user.tag !== 'gideon-dev#4623') return;

        const channel = this.client.guilds.cache.get('595318490240385037').channels.cache.get('669243069878501385');
        const role = this.client.guilds.cache.get('595318490240385037').roles.cache.get('595334594149220368');

        if (channel.permissionsFor(role).has('VIEW_CHANNEL')) {
            message.reply('Devmode enabled! :white_check_mark:');
            channel.permissionOverwrites.get(role.id).update({
                VIEW_CHANNEL: false
            }).catch(ex => console.log(ex));
        }

        else {
            message.reply('Devmode disabled! :white_check_mark:');
            channel.permissionOverwrites.get(role.id).update({
                VIEW_CHANNEL: true
            }).catch(ex => console.log(ex));
        }
    }
}

export default Devmode;