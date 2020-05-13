import Discord from 'discord.js';
import Util from '../../Util.js';

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(gideon, message) {
    const cmds = gideon.getStat.get('commands_ran').value;
    const msgs = gideon.getStat.get('messages_sent').value;
    const aimsgs =  gideon.getStat.get('ai_chat_messages_processed').value;
    let guilds = await gideon.shard.fetchClientValues('guilds.cache').catch(ex => console.log(ex));

    if (guilds) {
        guilds = [].concat.apply([], guilds);
    }
    
    const users = guilds.reduce((r, d) => r + d.memberCount, 0);

    message.channel.send(Util.CreateEmbed('Gideon\'s stats:', 
        {description: `Total guilds: \`${guilds.length}\`\nTotal users: \`${users}\`\nUsed commands: \`${cmds + 1}\`\nMessages sent: \`${msgs + 1}\`\nAI chat messages: \`${aimsgs}\``
        }, message.member)
    );  
}

export const help = {
    name: ['stats', 'statistics'],
    type: 'stats',
    help_text: 'stats',
    help_desc: 'Displays the bot\'s stats',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};