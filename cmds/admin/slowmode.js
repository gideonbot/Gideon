import Discord from 'discord.js';
import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(message, args) {
    const as = Util.CreateEmbed('You must supply valid input!', null, message.member);
    
    try {
        if (isNaN(args[0])) {
            if (isNaN(args[1])) return message.channel.send(as);
            if (!message.mentions.channels.first()) return message.channel.send(as);
            await message.mentions.channels.first().setRateLimitPerUser(args[1]);
            await message.reply(`Set slowmode for ${message.mentions.channels.first()} to \`${args[1]}\` ${args[1] == 1 ? 'second' : 'seconds'}!`);
        }
    
        else {
            await message.channel.setRateLimitPerUser(args[0]);
            await message.reply(`Set slowmode for ${message.channel} to \`${args[0]}\` ${args[0] == 1 ? 'second' : 'seconds'}!`);
        }
    }
    
    catch (ex) {
        Util.log('Caught an exception while running slowmode.js: ' + ex.stack);
        return message.channel.send(Util.CreateEmbed('An error occurred while executing this command!', null, message.member));
    }      
}

export const help = {
    name: ['slowmode', 'slowmo', 'slow', 'sm'],
    type: 'admin',
    help_text: 'slowmode [channel] <seconds>',
    help_desc: 'Enables slowmode',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {force: true},
    roles: [],
    user_perms: ['MANAGE_CHANNELS'],
    bot_perms: ['MANAGE_CHANNELS']
};