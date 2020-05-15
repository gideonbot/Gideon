import Discord from 'discord.js';
import Util from '../../Util.js';
import Akairo from 'discord-akairo';
const Command = Akairo.Command;

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */

class Stats extends Command {
    constructor() {
        super('stats', {
            aliases: ['stats', 'statistics'],
            category: 'stats'
        });
    }

    async exec(message) {
        const cmds = this.client.getStat.get('commands_ran').value;
        const msgs = this.client.getStat.get('messages_sent').value;
        const aimsgs =  this.client.getStat.get('ai_chat_messages_processed').value;
        let guilds = await this.client.shard.fetchClientValues('guilds.cache').catch(ex => console.log(ex));

        if (guilds) {
            guilds = [].concat.apply([], guilds);
        }
        
        const users = guilds.reduce((r, d) => r + d.memberCount, 0);

        message.channel.send(Util.CreateEmbed('Gideon\'s stats:', 
            {description: `Total guilds: \`${guilds.length}\`\nTotal users: \`${users}\`\nUsed commands: \`${cmds + 1}\`\nMessages sent: \`${msgs + 1}\`\nAI chat messages: \`${aimsgs}\``
            }, message.member)
        );  
    }
}

export default Stats;