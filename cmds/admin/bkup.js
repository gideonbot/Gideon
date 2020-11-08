import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 */
export async function run(message) {
    message.channel.send('Performing database backup, please wait...');
    await Util.SQLBkup();
    return message.channel.send('Database backup complete! Please check <#622415301144870932>! :white_check_mark:');
}

export const help = {
    name: 'bkup',
    type: 'admin',
    help_text: 'backup',
    help_desc: 'Performs a database backup',
    owner: false,
    voice: false,
    timevault: true,
    nsfw: false,
    args: {},
    roles: ['621399916283035658'],
    user_perms: [],
    bot_perms: []
};
