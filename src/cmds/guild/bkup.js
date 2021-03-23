import Util from '../../Util.js';

/**
* @param {Discord.Interaction} interaction
*/
export async function run(interaction) {
    interaction.reply('Performing database backup, please wait...');
    await Util.SQLBkup();
    return interaction.reply('Database backup complete! Please check <#622415301144870932>! :white_check_mark:');
}

export let help = {
    id: '788811861428666408',
    owner: false,
    nsfw: false,
    roles: ['621399916283035658'],
    user_perms: [],
    bot_perms: []
};
