/**
 * @param {Discord.Message} message
 */
export async function run(message) {   
    let abm = process.gideon.getGuild.get(message.guild.id);
    if (!abm.abmval) abm.abmval = 0;
    
    if (abm.abmval === 0) {
        abm.abmval = 1;
        process.gideon.setGuild.run(abm);
        message.reply('ABM enabled! :white_check_mark:');
    }

    else {
        abm.abmval = 0;
        process.gideon.setGuild.run(abm);
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