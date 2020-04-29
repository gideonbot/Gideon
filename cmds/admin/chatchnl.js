import Discord from 'discord.js';

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(gideon, message, args) {   
    let chat = gideon.getGuild.get(message.guild.id);

    if (args[0].match(/(?:reset)/i)) {
        chat.chatchnl = '';
        gideon.setGuild.run(chat);
        message.channel.send(`Reset the AI chat channel for \`${message.guild.name}\`:white_check_mark:`);
    }

    else {
        let channel = message.mentions.channels.first();
        if (!channel) return message.reply('You must properly mention a channel!');
    
        chat.chatchnl = channel.id;
        gideon.setGuild.run(chat);
        message.channel.send(`Set AI chat channel for \`${message.guild.name}\` to \`#${channel.name}\`! :white_check_mark:\n\nAll messages in this channel will now be interpreted as AI chat and no commands will be usable!`);
    }
}

export const help = {
    name: 'chatchnl',
    type: 'admin',
    help_text: 'chatchnl [reset] <channel>',
    help_desc: 'Sets a chatchannel for the AI',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {force: true},
    roles: [],
    user_perms: ['MANAGE_MESSAGES'],
    bot_perms: ['MANAGE_MESSAGES']
};