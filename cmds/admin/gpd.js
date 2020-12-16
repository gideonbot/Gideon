/**
 * @param {Discord.Message} message
 */
export async function run(message) {   
    let gd = process.gideon.getGuild.get(message.guild.id);
    if (!gd.gpd) gd.gpd = 0;
    
    if (gd.gpd === 0) {
        gd.gpd = 1;
        process.gideon.setGuild.run(gd);
        return message.reply('Ghost Ping Detector enabled! :white_check_mark:');
    }

    else {
        gd.gpd = 0;
        process.gideon.setGuild.run(gd);
        return message.reply('Ghost Ping Detector disabled! :white_check_mark:');
    } 
}

export let help = {
    name: 'gpd',
    type: 'admin',
    help_text: 'gpd',
    help_desc: 'Toggles Ghost Ping Detector',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: ['MANAGE_MESSAGES'],
    bot_perms: ['MANAGE_MESSAGES']
};