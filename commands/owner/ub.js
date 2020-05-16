import Util from '../../Util.js';
import Akairo from 'discord-akairo';
const Command = Akairo.Command;

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */

class UserBlacklist extends Command {
    constructor() {
        super('ub', {
            aliases: ['ub', 'userblacklist'],
            category: 'owner',
            channel: 'guild',
            ownerOnly: true,
            args: [ { id: 'snowflake', type: /\d{17,19}/, prompt: true } ],
            description: 'Blacklists a user',
            usage: 'ub <userid>'
        });
    }

    async exec(message, args) {
        const id = args.snowflake.match[0];
        try {
            let ub = this.client.getUser.get(id);
            if (!ub) {
                ub = {
                    id: id,
                    trmodeval: 0,
                    blacklist: 0
                };
            }

            if (ub.blacklist === 0) {
                ub.blacklist = 1;
                this.client.setUser.run(ub);
                message.channel.send(`User \`${id}\` has been blacklisted!`);
            }

            else {
                ub.blacklist = 0;
                this.client.setUser.run(ub);
                message.channel.send(`User \`${id}\` has been un-blacklisted!`); 
            }
        }

        catch (ex) {
            console.log('Caught an exception while running ub.js: ' + ex.stack);
            Util.log('Caught an exception while running ub.js: ' + ex.stack);
            return message.channel.send(Util.CreateEmbed('An error occured while executing this command!', null, message.member));
        }
    }
}

export default UserBlacklist;
