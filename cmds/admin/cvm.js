import Discord from 'discord.js';

/**
 * @param {Discord.Message} message
 */
export async function run(message) {   
    let cvm = process.gideon.getGuild.get(message.guild.id);
    if (!cvm.cvmval) cvm.cvmval = 0;
    
    if (cvm.cvmval === 0) {
        cvm.cvmval = 1;
        process.gideon.setGuild.run(cvm);
        message.reply('Crossover-Mode enabled! :white_check_mark:');
    }

    else {
        cvm.cvmval = 0;
        process.gideon.setGuild.run(cvm);
        message.reply('Crossover-Mode disabled! :white_check_mark:');
    } 
}

export const help = {
    name: 'cvm',
    type: 'admin',
    help_text: 'cvm',
    help_desc: 'Toggles crossover mode',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: ['MANAGE_MESSAGES'],
    bot_perms: ['MANAGE_MESSAGES']
};