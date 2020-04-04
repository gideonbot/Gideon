import Discord from "discord.js";

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(gideon, message, args) {   
    let cvm = gideon.getCVM.get(message.guild.id);
    if (!cvm) {
        cvm = {
            guild: message.guild.id,
            cvmval: 0,
        }
    }

    if (cvm.cvmval === 0) {
        cvm.cvmval = 1;
        gideon.setCVM.run(cvm);
        message.reply('Crossover-Mode enabled! :white_check_mark:');
    }

    else {
        cvm.cvmval = 0;
        gideon.setCVM.run(cvm);
        message.reply('Crossover-Mode disabled! :white_check_mark:');
    } 
}

export const help = {
    name: "cvm",
    type: "admin",
    help_text: "cvm",
    help_desc: "Toggles crossover mode",
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: ['MANAGE_MESSAGES'],
    bot_perms: ['MANAGE_MESSAGES']
}