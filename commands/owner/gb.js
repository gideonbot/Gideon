import Util from '../../Util.js';
import Akairo from 'discord-akairo';
const Command = Akairo.Command;

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */

class GuildBlacklist extends Command {
    constructor() {
        super('gb', {
            aliases: ['gb', 'guildblacklist'],
            category: 'owner',
            channel: 'guild',
            ownerOnly: true,
            args: [ { id: 'snowflake', type: /\d{17,19}/, prompt: true } ],
            description: 'Blacklists a guild',
            usage: 'gb <guildid>'
        });
    }

    async exec(message, args) {
        const id = args.snowflake.match[0];
        try {
            let gb = this.client.getGuild.get(id);
            if (!gb) {
                gb = {
                    guild: id,
                    prefix: '!',
                    cvmval: 0,
                    abmval: 0,
                    eastereggs: 0,
                    blacklist: 0,
                    chatchnl: ''
                };
            }

            if (gb.blacklist === 0) {
                gb.blacklist = 1;
                this.client.setGuild.run(gb);
                message.channel.send(`Guild \`${id}\` has been blacklisted!`);
            }

            else if (gb.blacklist === 1) {
                gb.blacklist = 0;
                this.client.setGuild.run(gb);
                message.channel.send(`Guild \`${id}\` has been un-blacklisted!`); 
            }
        }

        catch (ex) {
            console.log('Caught an exception while running gb.js: ' + ex.stack);
            Util.log('Caught an exception while running gb.js: ' + ex.stack);
            return message.channel.send(Util.CreateEmbed('An error occured while executing this command!', null, message.member));
        }
    }
}

export default GuildBlacklist;