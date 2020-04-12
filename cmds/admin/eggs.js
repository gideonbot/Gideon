import Discord from "discord.js";

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(gideon, message, args) {   
    let eggs = gideon.getGuild.get(message.guild.id);
    if (!eggs.eastereggs) eggs.eastereggs = 0;

    if (eggs.eastereggs === 0) {
        eggs.eastereggs = 1;
        gideon.setGuild.run(eggs);
        message.reply('Eastereggs enabled! :white_check_mark:');
    }

    else {
        eggs.eastereggs = 0;
        gideon.setGuild.run(eggs);
        message.reply('Eastereggs disabled! :white_check_mark:');
    } 
}

export const help = {
    name: "eggs",
    type: "admin",
    help_text: "eggs",
    help_desc: "Toggles eastereggs",
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: ['MANAGE_MESSAGES'],
    bot_perms: []
}