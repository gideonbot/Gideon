import Discord from "discord.js";

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(gideon, message, args) {   
    let eggs = gideon.getEggs.get(message.guild.id);
    if (!eggs) {
        eggs = {
            guild: message.guild.id,
            eggsval: 1,
        }
    }

    if (eggs.eggsval === 0) {
        eggs.eggsval = 1;
        gideon.setEggs.run(eggs);
        message.reply('Eastereggs enabled! :white_check_mark:');
    }

    else {
        eggs.eggsval = 0;
        gideon.setEggs.run(eggs);
        message.reply('Eastereggs disabled! :white_check_mark:');
    } 
}

export const help = {
    name: "eggs",
    type: "admin",
    help_text: "eggs <:perms:686681300156940349>",
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