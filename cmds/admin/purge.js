import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(message, args) {
    const msgamt = args[0];
    
    if (isNaN(msgamt)) return message.reply('You must supply a valid number!');
    if (msgamt > 100) return message.reply('Max value is `100`.');

    await message.delete({ timeout: 200 });
    return await message.channel.bulkDelete(msgamt, true);
}

export let help = {
    name: 'purge',
    type: 'admin',
    help_text: 'purge [amount]',
    help_desc: 'Deletes the specified amount of messages in the current channel',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {force: true},
    roles: [],
    user_perms: ['MANAGE_MESSAGES'],
    bot_perms: ['MANAGE_MESSAGES']
};
