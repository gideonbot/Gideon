import { CommandInteraction, GuildMember, MessageButton } from 'discord.js';
import { Command } from 'src/@types/Util.js';
import Util from '../../Util.js';

export async function run(interaction: CommandInteraction): Promise<void> {
    const cmds = process.gideon.getStat.get('commands_ran').value + 1;
    const msgs = process.gideon.getStat.get('messages_sent').value + 1;
    const aimsgs =  process.gideon.getStat.get('ai_chat_messages_processed').value;
    const users = process.gideon.guilds.cache.reduce((r, d) => r + d.memberCount, 0);

    const buttons = [
        new MessageButton().setStyle('LINK').setLabel('gideonbot.com').setURL('https://gideonbot.com'),
        new MessageButton().setStyle('LINK').setLabel('GitHub').setURL('https://github.com/gideonbot/Gideon'),
    ]
    
    return interaction.reply({embeds: [Util.Embed('Gideon\'s stats:', 
        {description: `Total guilds: \`${process.gideon.guilds.cache.size}\`\nTotal users: \`${users.toLocaleString('de-DE')}\`\nUsed commands: \`${cmds.toLocaleString('de-DE')}\`\nMessages sent: \`${msgs.toLocaleString('de-DE')}\`\nAI chat messages: \`${aimsgs.toLocaleString('de-DE')}\``
        }, interaction.member as GuildMember)], components: [buttons]}
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