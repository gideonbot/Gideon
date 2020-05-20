import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 */
export async function run(message) {
    const cmds = process.gideon.getStat.get('commands_ran').value;
    const msgs = process.gideon.getStat.get('messages_sent').value;
    const aimsgs =  process.gideon.getStat.get('ai_chat_messages_processed').value;
    let guilds = process.gideon.shard ? await process.gideon.shard.fetchClientValues('guilds.cache').catch(ex => console.log(ex)) : [process.gideon.guilds.cache];

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