import Discord from 'discord.js';

/**
 * @param {Discord.Message} message
 */
export async function run(message) {   
    let eggs = process.gideon.getGuild.get(message.guild.id);
    if (!eggs.eastereggs) eggs.eastereggs = 0;

    if (eggs.eastereggs === 0) {
        eggs.eastereggs = 1;
        process.gideon.setGuild.run(eggs);
        message.reply('Easter eggs enabled! :white_check_mark:');
    }

    else {
        eggs.eastereggs = 0;
        process.gideon.setGuild.run(eggs);
        message.reply('Easter eggs disabled! :white_check_mark:');
    } 
}

export const help = {
    name: 'eggs',
    type: 'admin',
    help_text: 'eggs',
    help_desc: 'Toggles easter eggs',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: ['MANAGE_MESSAGES'],
    bot_perms: []
};