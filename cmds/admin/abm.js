import Discord from 'discord.js';

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(gideon, message, args) {   
    let abm = gideon.getGuild.get(message.guild.id);
    if (!abm.abmval) abm.abmval = 0;
    
    if (abm.abmval === 0) {
        abm.abmval = 1;
        gideon.setGuild.run(abm);
        message.reply('ABM enabled! :white_check_mark:');
    }

    else {
        abm.abmval = 0;
        gideon.setGuild.run(abm);
        message.reply('ABM disabled! :white_check_mark:');
    } 
}

export const help = {
    name: 'abm',
    type: 'admin',
    help_text: 'abm',
    help_desc: 'Toggles Anti-BS-Mode',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: ['MANAGE_MESSAGES'],
    bot_perms: ['MANAGE_MESSAGES']
};