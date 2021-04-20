import { CommandInteraction, GuildMember } from 'discord.js';
import { Command } from 'src/@types/Util.js';
import Util from '../../Util.js';

/**
* @param {Discord.CommandInteraction} interaction
*/
export async function run(interaction: CommandInteraction): Promise<void> {
    const cmds = process.gideon.getStat.get('commands_ran').value + 1;
    const msgs = process.gideon.getStat.get('messages_sent').value + 1;
    const aimsgs =  process.gideon.getStat.get('ai_chat_messages_processed').value;
    const users = process.gideon.guilds.cache.reduce((r, d) => r + d.memberCount, 0);

    return interaction.reply(Util.Embed('Gideon\'s stats:', 
        {description: `Total guilds: \`${process.gideon.guilds.cache.size}\`\nTotal users: \`${users.toLocaleString('de-DE')}\`\nUsed commands: \`${cmds.toLocaleString('de-DE')}\`\nMessages sent: \`${msgs.toLocaleString('de-DE')}\`\nAI chat messages: \`${aimsgs.toLocaleString('de-DE')}\``
        }, interaction.member as GuildMember)
    );  
}

export const info: Command['info'] = {
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};

export const data: Command['data'] = {
    name: 'stats',
    description: 'Displays Gideon\'s stats',
    defaultPermission: true
};