import Util from '../../Util.js';
import Akairo from 'discord-akairo';
const Command = Akairo.Command;

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */

class Prefix extends Command {
    constructor() {
        super('prefix', {
            aliases: ['prefix', 'customprefix'],
            category: 'admin',
            channel: 'guild',
            args: [ { id: 'text', match: 'content', prompt: true } ],
            userPermissions: ['MANAGE_GUILD'],
            description: 'Sets a custom prefix',
            usage: 'prefix [default] <prefix>'
        });
    }

    async exec(message, args) {
        let prefix = this.client.getGuild.get(message.guild.id);

        try {
            if (args.text.match(/(?:default)/i)) {
                prefix.prefix = '!';
                this.client.setGuild.run(prefix);
                message.channel.send(`Restored the default prefix (\`${prefix.prefix}\`) for \`${message.guild.name}\` :white_check_mark:`);
            }

            else {
                prefix.prefix = args.text;
                this.client.setGuild.run(prefix);
                message.channel.send(`Set custom prefix for \`${message.guild.name}\` to \`${prefix.prefix}\` :white_check_mark:`);
            }
        }
        
        catch (ex) {
            console.log('Caught an exception while running prefix.js: ' + ex.stack);
            Util.log('Caught an exception while running prefix.js: ' + ex.stack);
            return message.channel.send(Util.CreateEmbed('An error occured while executing this command!', null, message.member));
        }      
    }
}

export default Prefix;