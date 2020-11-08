import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 */
export async function run(message) {
    const cmds = process.gideon.getStat.get('commands_ran').value + 1;
    const msgs = process.gideon.getStat.get('messages_sent').value + 1;
    const aimsgs =  process.gideon.getStat.get('ai_chat_messages_processed').value;
    let guilds = process.gideon.shard ? await process.gideon.shard.fetchClientValues('guilds.cache').catch(ex => console.log(ex)) : [process.gideon.guilds.cache];

    if (guilds) {
        guilds = [].concat.apply([], guilds);
    }
    
    const users = guilds.reduce((r, d) => r + d.memberCount, 0);

    return message.channel.send(Util.Embed('Gideon\'s stats:', 
        {description: `Total guilds: \`${guilds.length}\`\nTotal users: \`${users.toLocaleString('de-DE')}\`\nUsed commands: \`${cmds.toLocaleString('de-DE')}\`\nMessages sent: \`${msgs.toLocaleString('de-DE')}\`\nAI chat messages: \`${aimsgs.toLocaleString('de-DE')}\``
        }, message.member)
    );  
}

export const help = {
    name: 'stats',
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