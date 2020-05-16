import Akairo from 'discord-akairo';
const Command = Akairo.Command;

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */

class ChatChnl extends Command {
    constructor() {
        super('chatchnl', {
            aliases: ['chatchannel'],
            category: 'admin',
            channel: 'guild',
            clientPermissions: ['MANAGE_MESSAGES'],
            userPermissions: ['MANAGE_MESSAGES']
        });
    }

    async exec(message, args) {
        let chat = this.client.getGuild.get(message.guild.id);

        if (args[0].match(/(?:reset)/i)) {
            chat.chatchnl = '';
            this.client.setGuild.run(chat);
            message.channel.send(`Reset the AI chat channel for \`${message.guild.name}\`:white_check_mark:`);
        }

        else {
            let channel = message.mentions.channels.first();
            if (!channel) return message.reply('You must properly mention a channel!');
        
            chat.chatchnl = channel.id;
            this.client.setGuild.run(chat);
            message.channel.send(`Set AI chat channel for \`${message.guild.name}\` to \`#${channel.name}\`! :white_check_mark:\n\nAll messages in this channel will now be interpreted as AI chat and no commands will be usable!`);
        }
    }
}

export default ChatChnl;