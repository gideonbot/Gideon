import Discord from 'discord.js';
import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(message, args) {
    const msgamt = args[0];
    if (!msgamt) return await Util.delay(200), await message.channel.bulkDelete(2, true);
    
    if (isNaN(msgamt)) return message.reply('You must supply a valid number!');
    if (msgamt > 100) return message.reply('Max value is `100`.');

    await message.delete({ timeout: 200 });
    await message.channel.bulkDelete(msgamt, true);
}

export const help = {
    name: ['purge', 'delete', 'remove'],
    type: 'admin',
    help_text: 'purge [amount]',
    help_desc: 'Deletes the specified amount of messages in the current channel',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: ['MANAGE_MESSAGES'],
    bot_perms: ['MANAGE_MESSAGES']
};
